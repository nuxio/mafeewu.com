import Head from "next/head";

const BAIDU_STAT_CODE = `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?9454a0952acfef0fa225f100c4e7b8b0";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`;

export default function BaiduStat() {
  return <script dangerouslySetInnerHTML={{__html: BAIDU_STAT_CODE}} />;
}
