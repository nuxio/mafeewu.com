import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

export const name = "Mafee";
export const siteTitle = "Mafee's Blog";

const BAIDU_STAT_CODE = `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?9454a0952acfef0fa225f100c4e7b8b0";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`;

export default function Layout({ children, home }) {
  return (
    <div className="max-w-sm sm:max-w-screen-sm md:max-w-screen-md mx-auto mt-12">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <script dangerouslySetInnerHTML={{ __html: BAIDU_STAT_CODE }}></script>
      </Head>
      <header className="flex flex-col items-center">
        {home ? (
          <>
            <img
              src="/images/profile.jpeg"
              className="w-32 h-32 rounded-full"
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpeg"
                  className="w-24 h-24 rounded-full"
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className="mt-12">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}

      <footer className="text-center text-gray-500 text-xs mt-20">
        Made by Next.js
      </footer>
    </div>
  );
}
