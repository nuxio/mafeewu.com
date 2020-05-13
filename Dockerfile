# 精简 docker image 大小：https://medium.com/trendyol-tech/how-we-reduce-node-docker-image-size-in-3-steps-ff2762b51d5a
# Stage 1
# jessie-*, buster-* and stretch-* images are based on Debian, alpine-* images are based on Alpine Linux.
FROM node:11-alpine AS BUILD_IMAGE

# 解决 ERROR: http://dl-cdn.alpinelinux.org/alpine/v3.11/main: IO ERROR
# 解决build速度慢
RUN sed -i 's/dl-cdn/nl/' /etc/apk/repositories
RUN sed -i "s/archive.ubuntu./mirrors.aliyun./g" /etc/apt/sources.list
RUN sed -i "s/deb.debian.org/mirrors.aliyun.com/g" /etc/apt/sources.list
RUN sed -i "s/security.debian.org/mirrors.aliyun.com\/debian-security/g" /etc/apt/sources.list

# 安装必要的依赖
RUN apk update && apk add yarn curl bash && rm -rf /var/cache/apk/*

# 安装 node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# 工作目录，接下来的命令都是在这个目录进行，不存在的话会自动创建
WORKDIR /usr/src/mafee.tech

# 复制源码
COPY . .

# install
RUN yarn --forzen-lockfile

# build
RUN yarn build

# remove development dependencies
# https://docs.npmjs.com/cli/prune.html
RUN npm prune --production

# run node prune
# Most of the developers forget test files, markdown files, typing files and *.map files in Npm packages.
# By using node-prune we can safely delete them.
RUN /usr/local/bin/node-prune

# Stage 2
FROM node:11-alpine

WORKDIR /usr/src/mafee.tech

# pm2
RUN npm install pm2 -g

# 从 Stage 1 的镜像中复制出生产环境所需的资源
COPY --from=BUILD_IMAGE /usr/src/mafee.tech/package.json ./package.json
COPY --from=BUILD_IMAGE /usr/src/mafee.tech/.next ./.next
COPY --from=BUILD_IMAGE /usr/src/mafee.tech/public ./public
COPY --from=BUILD_IMAGE /usr/src/mafee.tech/node_modules ./node_modules

# 对外暴露端口，这里用的默认的 next 启动端口
EXPOSE 3000

# 运行容器后执行的命令
CMD ["pm2-runtime", "start", "npm", "--name", "next", "--", "start"]
