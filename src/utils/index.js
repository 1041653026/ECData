
/** 
* 将数值格式化成金额形式 
* 
* @param num 数值(Number或者String) 
* @param precision 精度，默认为2
* @param separator 分隔符，默认为逗号
* @return 金额格式的字符串,如'1,234,567'，默认返回NaN
* @type String 
*/
export function formatMoney(num, precision, separator) {
    var parts;
    // 判断是否为数字
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
        // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
        // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
        // 的值变成了 12312312.123456713
        num = Number(num);
        // 处理小数点位数
        num = (typeof precision !== 'undefined' ? (Math.round(num * Math.pow(10,precision)) / Math.pow(10,precision)).toFixed(precision) : (Math.round(num * Math.pow(10,2)) / Math.pow(10,2)).toFixed(2)).toString();
        // 分离数字的小数部分和整数部分
        parts = num.split('.');
        // 整数部分加[separator]分隔, 借用一个著名的正则表达式
        // parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator));
 
        return parts.join('.');
    }
    return NaN;
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  }

  export function formatTime(time, option) {
    time = +time
    const d = new Date(time)
    const now = Date.now()
  
    const diff = (now - d) / 1000;
  
    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      let dy = d.getFullYear();
      let ny = new Date().getFullYear();
      if (dy == ny) {
        option = '{m}-{d}'
      }
      return parseTime(time, option)
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      )
    }
  }