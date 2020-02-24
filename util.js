/** 全局工具函数  **/

/**
 * 设置和读取sessionStorage（localStorage同理）
 * 设置：session('token','abc123')
 * 读取：session('token')    //abc123
 * @param  {String} key    键
 * @param  {String | Object | Array} value  值
 */
export const session = function(key, value){
  if (value === void(0)) {
    var lsVal = sessionStorage.getItem(key);
    if(lsVal && lsVal.indexOf('autostringify-') === 0 ){
      return JSON.parse(lsVal.split('autostringify-')[1]);
    }else{
      return lsVal;
    }
  }else {
    if (typeof(value)==="object" || Array.isArray(value)) {
      value = 'autostringify-' + JSON.stringify(value);
    };
    return sessionStorage.setItem(key, value);
  }
}

/**
 * 生成随机数（数字加字母）
 * @param  {Number} len 长度
 * @return {String}     随机数
 */
export const getUUID = function (len) {
  len = len || 6;
  len = parseInt(len, 10);
  len = isNaN(len) ? 6 : len;
  var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
  var seedLen = seed.length - 1;
  var uuid = "";
  while (len--) {
    uuid += seed[Math.round(Math.random() * seedLen)];
  }
  return uuid;
};

/**
 * 深拷贝
 * @param  {Object | Array} source  源数据
 * @return {Object | Array}        拷贝数据
 */
export const deepcopy = function (source) {
  if (!source) {
    return source;
  }
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
  }
  return sourceCopy;
};

/**
 * 标准时间或时间戳格式化为日期
 * @param  {Date | Number} date  标准时间或时间戳
 * @param  {String} fmt   日期格式，eg:yyyy-MM-dd hh:mm:ss、yyyy/MM/dd hh:mm、yyyy-MM-dd等（注意月份M为大写其他为小写）
 * @return {String}       格式化之后的日期
 */
export const dateFtt = function (date,fmt){
  if(typeof date === 'number'){
    var date = new Date(date);
  }
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

/**
 * 中文根据拼音排序 （localeCompare 比较的是字符串）
 * @param { Array } arr - 数组
 * @param { String } key - 若数组元素是对象，对象的属性名
 */
const pySegSort = (arr,key) => {
  if (!String.prototype.localeCompare)
    return null;

  var letters = "*ABCDEFGHJKLMNOPQRSTWXYZ".split('');
  var zh = "阿八嚓哒妸发旮哈讥咔垃马拏噢妑七呥扨它穵夕丫匝".split('');

  var segs = [];
  var curr;
  letters.forEach(function (item, i) {
    curr = { letter: item, data: [] };
    arr.forEach(function (item2) {
      let target = key ? item2[key] : item2;
      if ((!zh[i - 1] || zh[i - 1].localeCompare(target, 'zh') <= 0) && target.localeCompare(zh[i], 'zh') == -1) {
        curr.data.push(item2);
      }
    });
    if (curr.data.length) {
      segs.push(curr);
    }
  });
  return segs;
}  
  
/**
 * 创建FormData
 * @param {Object} obj 对象
 * @return {Object}  formdata object
 */
function(obj){
  var bodyFormData = new FormData();
  if(obj && obj instanceof Object){
    Object.keys(obj).forEach((key) => {
        bodyFormData.append(key, obj[key]);
    })
   }
   return bodyFormData;
}

//获取url上?后参数
export const getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

// 对象转url qs参数(序列化)
export const obj2param = (obj) => {
  let val;
  const result = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      val = `${obj[key]}`;
      const frag = `${key}=${encodeURIComponent(val)}`;
      result.push(frag);
    }
  }

  return result.join('&');
}

//设置cookie
export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  if (exdays == -1) {
    document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=.laozihaojia.com; path=/;";
  } else {
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
}

//获取cookie
export function getCookie(cname) {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split("; ");
  for(var i = 0; i < arrCookie.length; i++){
      var arr = arrCookie[i].split("=");
      if(cookieName == arr[0]){
          return arr[1];
      }
  }
  return "";
}

//清除cookie
export function clearCookie(name) {
  setCookie(name, "", -1);
}

/**
 * 60s倒计时
 * @param  {string}   target   目标dom
 * @param  {Function} callback 回调
 * @return {Function}          倒计时
 */
export function countDown(target, callback) {
  let gapTime = 60;
  let counting = setInterval(function() {
    if (gapTime <= 0) {
      target.innerHTML = "重新发送";
      clearInterval(counting);
      if (callback) {
        callback();
      }
      return;
    } else {
      target.innerHTML = gapTime + "s";
      gapTime--;
    }
  }, 1000);
  return counting;
}

/**
 * 1-60分钟倒计时
 * @param  {string}   target   目标dom
 * @param  {Number}   tSec     总秒数
 * @param  {Function} callback 结束之后的回调
 * @return {[type]}            [description]
 */
export function minCountDown(target, tSec, callback) {
  let t = setInterval(() => {
    if (tSec <= 0) {
      clearInterval(t);
      target.innerHTML = '00:00:00';
      if (callback && typeof callback === 'function') {
        callback();
      }
      return;
    } else {
      let m = parseInt(tSec / 60);
      let s = tSec % 60;
      m < 10 ? m = '0' + m : '';
      s < 10 ? s = '0' + s : '';
      target.innerHTML = '00:' + m + ':' + s;
      tSec--;
    }
  }, 1000)
}

/**
 * 超过一千用k来表示，保留一位小数
 * @param  {Number} num  点赞数
 * @return {String}      处理后的点赞数
 */
export function processNumber(num) {
  if (num >= 1000) {
    let numberThousand = Math.round(Math.round(num / 10) / 10) / 10;
    return numberThousand + 'k';
  } else {
    return num;
  }
}
