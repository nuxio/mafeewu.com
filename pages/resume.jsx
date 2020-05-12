import React from "react";

const headerColor = "#254665";
const textColor = "#747474";

const Header = () => (
  <>
    <header className="header">
      <h1 className="header-title">邬强的简历</h1>
      <p className="header-sub-title">前端开发 · 5年经验 · 成都</p>
    </header>
    <style jsx>{`
      .header-title {
        text-align: center;
        margin: 0;
        color: ${headerColor};
      }
      .header-sub-title {
        text-align: center;
        color: ${textColor};
      }
    `}</style>
  </>
);

const Main = () => {
  const personalInfo = [
    {
      id: "tel",
      name: "电话",
      href: "tel:13266599783",
      content: "13266599783"
    },
    {
      id: "email",
      name: "邮箱",
      href: "mailto:nuxio2015@gmail.com",
      content: "nuxio2015@gmail.com"
    },
    {
      id: "home",
      name: "个人主页",
      href: "https://nuxio.github.io/",
      content: "https://nuxio.github.io/"
    },
    {
      id: "github",
      name: "Github",
      href: "https://github.com/nuxio/",
      content: "https://github.com/nuxio/"
    },
    {
      id: "edu",
      name: "学历",
      href: "http://www.cqupt.edu.cn/",
      content: "重庆邮电大学-电子商务专业（2011/09 - 2015/06）"
    }
  ];

  return (
    <main>
      <section className="section">
        <h2 className="section-title">个人信息</h2>
        <ul className="info-list">
          {personalInfo.map(info => (
            <li key={info.id} className="info-item">
              <label className="info-label" htmlFor={info.id}>
                {info.name}
              </label>
              <a id={info.id} href={info.href}>
                {info.content}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">项目经验</h2>
        <ul>
          <li>
            <h3 className="part-title">客如云扫码点餐</h3>
            <p className="info-item">
              <label className="info-label">项目时间</label>
              <span>2019.06 - 至今</span>
            </p>
            <div>
              <label className="info-label">项目技术栈</label>
              <ul>
                <li>React</li>
                <li>Redux</li>
                <li>Seamless-immutable</li>
                <li>SCSS</li>
                <li>JSP</li>
                <li>Webpack</li>
              </ul>
            </div>
            <p>
              <label className="info-label">项目角色</label>
              <span>主要开发和维护人员</span>
            </p>
            <p>
              <label className="info-label">项目结果</label>
              <span>
                <br />
                1、接手项目后从零逐渐完善技术、业务文档
                <br />
                2、微信、支付宝小程序功能开发
                <br />
                3、搭建并接入错误监控系统(Sentry)
                <br />
                4、新建了下个版本的项目(React/TypeScript)，为日后更新迭代打下基础
                <br />
                5、构建、发布流程搭建与维护
              </span>
            </p>
            <p>
              <label className="info-label">项目地址（测试）</label>
              <a
                target="_blank"
                href="https://weixin.keruyun.com/brand/index?shopId=810007772"
              >
                https://weixin.keruyun.com/brand/index?shopId=810007772
              </a>
            </p>
          </li>
          <li>
            <h3 className="part-title">Amumu - 基于Vue的UI组件库</h3>
            <p className="info-item">
              <label className="info-label">项目时间</label>
              <span>2018.03 - 2019.05</span>
            </p>
            <div>
              <label className="info-label">项目技术栈</label>
              <ul>
                <li>Vue</li>
                <li>Webpack</li>
                <li>Babel</li>
                <li>SCSS</li>
                <li>Jest</li>
                <li>Gulp</li>
              </ul>
            </div>
            <p>
              <label className="info-label">需求背景</label>
              <span>
                小满CRM系统缺少一个统一设计风格，以及灵活配置的组件库。导致在开发需求时重复开发功能大致
                相同，但样式又不同的组件，效率不高，用户体验也不好
              </span>
            </p>
            <p>
              <label className="info-label">需求方案</label>
              <span>
                基于项目现在的技术栈，选用Vue作为基础框架，开发一个设计风格统一、API友好、高可配置的组件库
              </span>
            </p>
            <p>
              <label className="info-label">项目角色</label>
              <span>主导设计和开发组件、组件库配套工具</span>
            </p>
            <p>
              <label className="info-label">项目结果</label>
              <span>
                2018年3月开始开发，
                2018年7月开始正式应用到项目中进行业务支撑，目前包含组件超过60个，覆盖
                了大部分业务场景，为后续快速开发需求提供支持
              </span>
            </p>
            <p>
              <label className="info-label">项目地址</label>
              <a target="_blank" href="https://fe.xiaoman.cn/amumu">
                https://fe.xiaoman.cn/amumu/
              </a>
            </p>
            <p>
              <label className="info-label">NPM</label>
              <a target="_blank" href="https://www.npmjs.com/package/amumu-ui">
                https://www.npmjs.com/package/amumu-ui
              </a>
            </p>
            <p>
              <label className="info-label">Vue-CLI</label>
              <a
                target="_blank"
                href="https://www.npmjs.com/package/vue-cli-plugin-amumu"
              >
                https://www.npmjs.com/package/vue-cli-plugin-amumu
              </a>
            </p>
          </li>
          <li>
            <h3 className="part-title">小满CRM系统</h3>
            <p className="info-item">
              <label className="info-label">项目时间</label>
              <span>2017.08 - 2019.05</span>
            </p>
            <div>
              <label className="info-label">项目技术栈</label>
              <ul>
                <li>Vue</li>
                <li>Vuex</li>
                <li>Vue-router</li>
                <li>Webpack</li>
                <li>Websocket</li>
                <li>ECharts</li>
              </ul>
            </div>
            <p>
              <label className="info-label">项目背景</label>
              <span>
                CRM系统是公司的主营产品，集合了邮件模块、客户管理模块、单据模块、销售管理模块、AI智能推
                荐模块等一系列企业服务内容
              </span>
            </p>
            <p>
              <label className="info-label">项目角色</label>
              <span>主要开发和维护人员</span>
            </p>
            <p>
              <label className="info-label">项目成果</label>
              <span>
                <br />
                1、使用Vue组件化的方式重构旧版邮件的jQuery+tmod
                template代码，并且用EsIint/Prettier/StyleLint工具规范 代码风格
                <br />
                2、进行系统内增加更多的操作反馈、列表动画优化、完善xss模块、推动后端将长轮询的消息机制改成WebSocket的
                实现方式、梳理项目依赖，减少不必要的依赖项等多项优化
              </span>
            </p>
            <p>
              <label className="info-label">项目地址</label>
              <a target="_blank" href="https://crm.xiaoman.cn/dashboard">
                https://crm.xiaoman.cn/dashboard
              </a>
            </p>
          </li>
          <li>
            <h3 className="part-title">小满CRM桌面端</h3>
            <p className="info-item">
              <label className="info-label">项目时间</label>
              <span>2018.05 - 2018.08</span>
            </p>
            <div>
              <label className="info-label">项目技术栈</label>
              <ul>
                <li>Electron</li>
                <li>React</li>
                <li>Mobx</li>
                <li>Mobx-state-tree</li>
                <li>Webpack</li>
                <li>TypeScript</li>
              </ul>
            </div>
            <p>
              <label className="info-label">项目背景</label>
              <span>为了覆盖客户更多的使用场景，增加公司产品多样化</span>
            </p>
            <p>
              <label className="info-label">项目角色</label>
              <span>协助前端开发</span>
            </p>
            <p>
              <label className="info-label">项目成果</label>
              <span>
                <br />
                1、开发了第一版的写信页面，支持网页端写信页面所支持的所有功能
                <br />
                2、编写了完善支持复制粘贴Word/Excel/PPT/Foxmail等客户端文本样式的插件，解决了用户粘贴内容后样式丟失的问题
              </span>
            </p>
            <p>
              <label className="info-label">项目地址</label>
              <a target="_blank" href="https://bestmail.xiaoman.cn/">
                https://bestmail.xiaoman.cn/
              </a>
            </p>
          </li>
        </ul>
      </section>
      <section className="section">
        <h2 className="section-title">工作经历</h2>
        <ul>
          <li>
            <h3 className="part-title">时时同云科技（北京）有限责任公司</h3>
            <p>
              <label className="info-label">在职日期</label>
              <span>2019.06 - 至今</span>
            </p>
            <p>
              <label className="info-label">职位</label>
              <span>前端开发工程师</span>
            </p>
            <p>
              <label className="info-label">工作内容</label>
              <br />
              <span>
                1、客如云移动门店C端、B端的需求评估、前端功能开发
                <br />
                2、优化前端代码，重构C端关键业务逻辑
                <br />
                3、总结业务流程，沉淀业务文档
                <br />
                4、新项目技术调研，搭建以及规范制定
                <br />
                5、搭建前端项目的构建、发布流程
                <br />
                6、带团队新人
              </span>
            </p>
          </li>
          <li>
            <h3 className="part-title">深圳市小满科技有限公司</h3>
            <p>
              <label className="info-label">在职日期</label>
              <span>2017.08 - 2019.05</span>
            </p>
            <p>
              <label className="info-label">职位</label>
              <span>前端开发工程师</span>
            </p>
            <p>
              <label className="info-label">工作内容</label>
              <br />
              <span>
                1、小满CRM的需求评估、前端功能开发
                <br />
                2、参与小满CRM前端代码重构
                <br />
                3、主导基础组件库的设计、开发
              </span>
            </p>
          </li>
          <li>
            <h3 className="part-title">深圳市乐信控股有限公司</h3>
            <p>
              <label className="info-label">在职日期</label>
              <span>2016.04 - 2017.08</span>
            </p>
            <p>
              <label className="info-label">职位</label>
              <span>前端开发工程师</span>
            </p>
            <p>
              <label className="info-label">工作内容</label>
              <span>
                独立负责分期乐开放平台、商家管理系统的前端开发工作，以及方舟系统的开发与维护工作
              </span>
            </p>
          </li>
          <li>
            <h3 className="part-title">深圳市彩讯科技有限公司</h3>
            <p>
              <label className="info-label">在职日期</label>
              <span>2015.03 - 2016.04</span>
            </p>
            <p>
              <label className="info-label">职位</label>
              <span>前端开发工程师</span>
            </p>
            <p>
              <label className="info-label">工作内容</label>
              <span>
                负责139邮箱网页版写信模块、设置模块、明信片模块、文件夹模块的前端开发和升级工作
              </span>
            </p>
          </li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">个人技能</h2>
        <ul>
          <li>
            <h3 className="part-title">Web开发</h3>
            <ul>
              <li>熟练使用JavaScript语言及新特性，熟悉Typescript</li>
              <li>熟练使用HTML/CSS进行页面布局</li>
              <li>熟悉Node.js开发，使用过一段时间PHP与后端对接，开发接口</li>
              <li>
                其它：熟练掌握Web调试和性能优化技巧，熟悉Http基础，熟悉Web安全策略
              </li>
            </ul>
          </li>
          <li>
            <h3 className="part-title">Web框架</h3>
            <ul>
              <li>
                熟练使用Vue,
                React以及相匹配的状态管理、路由管理框架、Echarts图表框架
              </li>
              <li>使用过Express, MongoDB搭建个人博客</li>
            </ul>
          </li>
          <li>
            <h3 className="part-title">开发工具、其它</h3>
            <ul>
              <li>熟练使用Webpack/Gulp以及配套工具对前端项目进行打包和构建</li>
              <li>熟练使用Git命令行操作</li>
              <li>使用过Jest/Mocha编写组件测试用例</li>
              <li>掌握基本Linux命令、Shell脚本编写</li>
              <li>熟悉Jenkins、Docker等DevOps工具</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">自我评价</h2>
        <ul>
          <li>热爱前端开发，自学能力强，为人随和，富有责任心</li>
          <li>遵从标准和规范，具有良好的代码编写习惯</li>
        </ul>
      </section>

      <style jsx>{`
        .section {
          color: ${textColor};
        }
        .section-title {
          color: ${headerColor};
          border-bottom: 1px solid #25466a;
        }
        .part-title,
        .info-label {
          color: #1d1a1a;
        }
        .info-item {
          list-style: none;
        }
        .info-label::after {
          content: "：";
        }
        .section a {
          word-break: break-word;
        }
        @media screen and (max-width: 750px) {
          .section ul {
            padding-inline-start: 20px;
          }
        }
      `}</style>
    </main>
  );
};

const Resume = () => {
  return (
    <>
      <div className="page">
        <Header />
        <Main />
      </div>
      <style jsx>{`
        .page {
          margin: 2vw auto;
          padding: 2vw;
          border: 1px solid #ddd;
          font-family: "PingFang SC", "Microsoft YaHei";
          max-width: 1024px;
        }
      `}</style>
    </>
  );
};

export default Resume;
