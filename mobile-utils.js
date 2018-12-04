/* 移动端的一些工具函数 */

//手机系统
export const mSystem = () => {
    let u = navigator.userAgent;
    if(u.includes('iPhone')){
        return 'ios';
    }else if(u.includes('Android') || u.includes('Linux')){
        return 'android';
    }else{
        return 'other';
    }
}

/**
 * [判断手机联网状态]
 *
 * @return {Boolean} [有网络：true，无网络：false]
 */
export function isOnline() {
  return navigator.onLine;
}

/**
 * 微信登录
 */
export function weixinLogin() {
  location.href = "https://open.weixin.qq.com/connect/oauth2/authorize" +
    "?appid=" + process.env.appid +
    "&redirect_uri=" + encodeURIComponent(window.location.href) +
    "&response_type=code&scope=snsapi_userinfo" +
    "&state=" + new Date().getTime() + "#wechat_redirect"
}

/**
 * 判断是否为微信
 * @return {Boolean} [true: 微信环境, false: 非微信]
 */
export function isWeixin() {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

/**
 * 判断是否为qq
 * @return {Boolean} [true: qq环境, false: 非qq]
 */
export function isQQ() {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/QQ/i) == "qq") {
    return true;
  } else {
    return false;
  }
}

/**
 * 判断环境是pc端还是mobile端
 */
export function isMobile() {
  let userAgentInfo = navigator.userAgent;
  let Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  let flag = false;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = true;
      break;
    }
  }
  return flag;
}

/**
 * 页面环境model
 * @return {Number} 1:iPhone,2:android,3:H5
 */
export function isModel() {
  let isModelNumber;
  let u = navigator.userAgent;
  if (u.indexOf('iPhone') > -1 && getParameter("isApp")) {
    //苹果手机  app内
    isModelNumber = 1;
  } else if ((u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) && getParameter("isApp")) {
    //安卓手机  app内
    isModelNumber = 2;
  } else {
    //h5页面  app外
    isModelNumber = 3;
  }
  return isModelNumber;
}

/**
 * 下载App
 * @param  {Boolean} isWeChat [true: 微信环境, false: 非微信]
 */
export function downloadApp() {
  if (isWeixin()) {
    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.lzhplus.lzh";
  } else {
    let u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
      window.location.href = "http://pkg.lzhplus.com/app-android_lzh_sign.apk";
    } else if (u.indexOf('iPhone') > -1) { //苹果手机
      location.href = "https://itunes.apple.com/us/app/lao-zi-haobeta/id1069755552?l=zh&ls=1&mt=8";
    }
  }
}

/**
 * 打开app(深度链接)
 * @param  {String} linkId   商品id，定制id，活动id等
 * @param  {Number} linkType 链接类型
 */
export function openApp(linkId, linkType) {
  let flagWeixin = isWeixin(),
    flagQQ = isQQ(),
    from = getParameter("from");
  if (flagWeixin || flagQQ) {
    // weixinTip();
    // window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.lzhplus.lzh";
  } else {
    let u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
      window.location.href = 'Laozh://?linkId=' + linkId + '&linkType=' + linkType;
      window.setTimeout(function() {
        if (from == "toutiao") {
          window.location.href = "http://hzlzh.oss-cn-hangzhou.aliyuncs.com/app-android_112_UMENG_CHANNEL_jinritoutiao_jinritoutiao_android_sign.apk";
        } else if (from == "yidian") {
          window.location.href = "http://hzlzh.oss-cn-hangzhou.aliyuncs.com/app-android_112_UMENG_CHANNEL_yidianzixun_android_yidianzixun_sign.apk";
        } else if (from == "zhihui") {
          window.location.href = "http://hzlzh.oss-cn-hangzhou.aliyuncs.com/app-android_112_UMENG_CHANNEL_zhihuitui_android_zhihuitui_sign.apk";
        } else {
          window.location.href = "https://pkg.laozihaojia.com/app-android_lzh_sign.apk";
        }
      }, 2000);
    } else if (u.indexOf('iPhone') > -1) { //苹果手机
      window.location.href = 'Laozh://?linkId=' + linkId + '&linkType=' + linkType;
      window.setTimeout(function() {
        location.href = "https://itunes.apple.com/us/app/lao-zi-haobeta/id1069755552?l=zh&ls=1&mt=8";
      }, 2000);
    }
  }
}
