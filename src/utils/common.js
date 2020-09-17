// 去除空格
/* type值
  1: 所有空格
  2：前后空格
  3：前空格
  4：后空格
*/
const trim = (value, trim) => {
  switch (trim) {
    case 1:
      return value.replace(/\s+/g, "");
    case 2:
      return value.replace(/(^\s*)|(\s*$)/g, "");
    case 3:
      return value.replace(/(^\s*)/g, "");
    case 4:
      return value.replace(/(\s*$)/g, "");
    default:
      return value;
  }
};

// 根据字符串获取时间，兼容ie
const getDate = value => {
  let date = new Date(value);
  if (isNaN(date.getFullYear())) {
    let t = value.split(" ");
    let ds = t[0] ? t[0].split("-") : [];
    if (ds.length === 0) {
      return "未知";
    }
    let ts = t[1] ? t[1].split(":") : ["00", "00", "00"];
    let r = new Date();
    r.setFullYear(ds[0], ds[1] - 1, ds[2]);
    r.setHours(ts[0], ts[1], ts[2], 0);
    date = r;
  }
  return date;
};

// 任意格式日期处理
/* 使用格式：
 * {{ formaDate('2018-09-14 01:05', yyyy-MM-dd hh:mm:ss) }}
 * {{ formaDate('2018-09-14 01:05', yyyy-MM-dd) }}
 * {{ formaDate('2018-09-14 01:05', MM/dd) }}
 * 还有w（周几）、S（毫秒）、q（季度）等等
 */
const formaDate = (value, fmt) => {
  let date = getDate(value);
  if (date === "未知") {
    return date;
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "w+": date.getDay(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o) {
    if (k === "w+") {
      switch (o[k]) {
        case 0:
          fmt = fmt.replace("w", "周日");
          break;
        case 1:
          fmt = fmt.replace("w", "周一");
          break;
        case 2:
          fmt = fmt.replace("w", "周二");
          break;
        case 3:
          fmt = fmt.replace("w", "周三");
          break;
        case 4:
          fmt = fmt.replace("w", "周四");
          break;
        case 5:
          fmt = fmt.replace("w", "周五");
          break;
        default:
          fmt = fmt.replace("w", "周六");
      }
    } else if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

//字母大小写切换
/* type值
  1: 首字母大写
  2：首页母小写
  3：大小写转换
  4：全部大写
  5：全部小写
*/
const changeCase = (str, type) => {
  const ToggleCase = str => {
    let itemText = "";
    str.split("").forEach(function(item) {
      if (/^([a-z]+)/.test(item)) {
        itemText += item.toUpperCase();
      } else if (/^([A-Z]+)/.test(item)) {
        itemText += item.toLowerCase();
      } else {
        itemText += item;
      }
    });
    return itemText;
  };
  switch (type) {
    case 1:
      return str.replace(/\b\w+\b/g, function(word) {
        return (
          word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
        );
      });
    case 2:
      return str.replace(/\b\w+\b/g, function(word) {
        return (
          word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
        );
      });
    case 3:
      return ToggleCase(str);
    case 4:
      return str.toUpperCase();
    case 5:
      return str.toLowerCase();
    default:
      return str;
  }
};

// 字符串循环复制,count对应次数
const repeatStr = (str, count) => {
  let text = "";
  for (let i = 0; i < count; i++) {
    text += str;
  }
  return text;
};

// 字符串替换
const replaceAll = (str, AFindText, ARepText) => {
  let raRegExp = new RegExp(AFindText, "g");
  return str.replace(raRegExp, ARepText);
};

// 字符替换*，隐藏手机号或者身份证号等
/* replaceStr(字符串, 字符格式, 替换方式, 替换的字符（默认*）)
 * replaceStr('15812310700', [3,5,3], 0)
 * result：158*****700
 * replaceStr('qweasdzxvbn', [3,5,3], 1)
 * result：***asdzx***
 * replaceStr('asdasdasdasd', [5], 0)
 * result：*****dasdasd
 * replaceStr('asdadsasdasdasd', [5], 1, '+')
 * result："asdadsasda+++++"
 */
const replaceStr = (str, regArr, type, replaceText = "*") => {
  let regtext = "",
    Reg = null;
  //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
  if (regArr.length === 3 && type === 0) {
    regtext =
      "(\\w{" + regArr[0] + "})\\w{" + regArr[1] + "}(\\w{" + regArr[2] + "})";
    Reg = new RegExp(regtext);
    let replaceCount = this.repeatStr(replaceText, regArr[1]);
    return str.replace(Reg, "$1" + replaceCount + "$2");
  } else if (regArr.length === 3 && type === 1) {
    regtext =
      "\\w{" + regArr[0] + "}(\\w{" + regArr[1] + "})\\w{" + regArr[2] + "}";
    Reg = new RegExp(regtext);
    let replaceCount1 = this.repeatStr(replaceText, regArr[0]);
    let replaceCount2 = this.repeatStr(replaceText, regArr[2]);
    return str.replace(Reg, replaceCount1 + "$1" + replaceCount2);
  } else if (regArr.length === 1 && type === 0) {
    regtext = "(^\\w{" + regArr[0] + "})";
    Reg = new RegExp(regtext);
    let replaceCount = this.repeatStr(replaceText, regArr[0]);
    return str.replace(Reg, replaceCount);
  } else if (regArr.length === 1 && type === 1) {
    regtext = "(\\w{" + regArr[0] + "}$)";
    Reg = new RegExp(regtext);
    let replaceCount = this.repeatStr(replaceText, regArr[0]);
    return str.replace(Reg, replaceCount);
  }
};

// 格式化处理字符串
/* formatText('0123123123123')
 * result："0,123,123,123,123"
 * formatText('0123123123123', 4, ' ')
 * result："0 1231 2312 3123"
 * formatText('0123123123123', 4, '-')
 * result："0-1231-2312-3123"
 */
const formatText = (str, size = 3, delimiter = ",") => {
  let regText = "\\B(?=(\\w{" + size + "})+(?!\\w))";
  let reg = new RegExp(regText, "g");
  return str.replace(reg, delimiter);
};

// 现金额大写转换
const upDigit = n => {
  let fraction = ["角", "分", "厘"];
  let digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  let unit = [
    ["元", "万", "亿"],
    ["", "拾", "佰", "仟"]
  ];
  let head = n < 0 ? "欠人民币" : "人民币";
  n = Math.abs(n);
  let s = "";
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, "");
  }
  s = s || "整";
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = "";
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, "元")
      .replace(/(零.)+/g, "零")
      .replace(/^整$/, "零元整")
  );
};

// 保留2位小数
const toDecimal2 = x => {
  let f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  f = Math.round(x * 100) / 100;
  let s = f.toString();
  let rs = s.indexOf(".");
  if (rs < 0) {
    rs = s.length;
    s += ".";
  }
  while (s.length <= rs + 2) {
    s += "0";
  }
  return s;
};

export {
  trim,
  changeCase,
  repeatStr,
  replaceAll,
  replaceStr,
  formatText,
  upDigit,
  toDecimal2,
  formaDate
};
