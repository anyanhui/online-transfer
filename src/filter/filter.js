/**
 * 去除空格
 * type：1-所有空格， 2-前后空格， 3-前空格， 4-后空格
 * 使用格式：
 * {{" sss " | trim(1)}}
 */
function trim(value,type) {
    switch(type) {
        case 1:
            return value.replace('/\s+/g', "");
            break;
        case 2:
            return value.replace('/(^\s*)|(\s*$)/g', "");
            break;
        case 3:
            return value.replace('/^\s*/g', "");
            break;
        case 4:
            return value.replace('/\s*$/g', "");
            break;
        default:
            return value;
            break;
    }
}

/**
 * 任意格式日期处理
 * 使用格式：
 * {{'2018-12-22 11:47' | formaDate(yyyy-MM-dd hh:mm:ss)}}
 * {{'2018-12-22 11:47' | formaDate(yyyy-MM-dd)}}
 * {{'2018-12-22 11:47' | formaDate(MM/dd)}}等
 */
function formaDate(value, fmt) {
    var date = new  Date(value);
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'W+': date.getDay(),
        'q+': Math.floor((date.getMonth() + 3)/3),
        'S': date.getMilliseconds()
    };

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o) {
        if (k == 'W+') {
            if (o[k] === 0) {
                fmt = fmt.replace('W', '周日')
            } else if (o[k] === 1) {
                fmt = fmt.replace('W', '周一')
            } else if (o[k] === 2) {
                fmt = fmt.replace('W', '周二')
            } else if (o[k] === 3) {
                fmt = fmt.replace('W', '周三')
            } else if (o[k] === 4) {
                fmt = fmt.replace('W', '周四')
            } else if (o[k] === 5) {
                fmt = fmt.replace('W', '周五')
            } else if (o[k] === 6) {
                fmt = fmt.replace('W', '周六')
            }
        } else if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    }
}

/**
 * 字母大小写切换
 * type:1-首字母大写， 2-首字母小写 3-大小写切换 4-全部大写 5-全部小写
 */
function chageCase(value, type) {
    function ToggleCase(str) {
        var itemText = ""
        str.split("").forEach((item)=> {
            if (/^(a-Z)+/.test(item)) {
                itemText += item.toUpperCase();
            } else if (/^([A-Z]+)/.test(item)) {
                itemText += item.toLowerCase();
            } else {
                itemText += item;
            }
        })
        return itemText;
    }

    switch(type) {
        case 1: 
            return str.replace(/\b\w+\b/g, function(word) {
                return word.substring(0,1).toUpperCase() + word.substring(1).toLowerCase();
            });
            break;
        case 2:
            return str.replace(/\b\w+\b/g, function(word) {
                return word.substring(0,1).toLowerCase() + word.substring(1).toUpperCase();
            });
            break;
        case 3:
            return ToggleCase(str);
            break;
        case 4:
            return str.toUpperCase();
            break;
        case 5:
            return str.toLowerCase();
            break;
        default:
            return str;
            break;
    }
}

/**
 * 字符串循环复制
 * counts： 次数
 */
function repeatStr(str, counts) {
    var text = "";
    for (var i = 0; i < counts; i++) {
        text += str;
    }
    return text;
}

/**
 * 字符串替换
 */
function replaceAll(str, AFindText, ARepText) {
    let raRegExp = new RegExp(AFindText, "g");
    return str.replace(raRegExp, ARepText);
}

/**
 * 字符替换* 隐藏手机号或身份证号等
 * replaceStr(字符串，字符格式，替换为的字符（默认为*）)
 * replaceStr('17619322663', [3, 5, 3], 0)  => "176******663"
 * replaceStr('asdasdasdaa', [3, 5, 3], 1)  => "***asdas***"
 * replaceStr('17619322663', [3], 0)  => "***19322663"
 * replaceStr('17619322663', [3], 1, '-')  => "17619322---"
 */
function replaceStr(str, regArr, type, ARepText) {
    var regtext = '',
        Reg = null,
        replaceText = ARepText || '*';
    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 && type === 0) {
        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1' + replaceCount + '$2')
    }
    else if (regArr.length === 3 && type === 1) {
        regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
        Reg = new RegExp(regtext);
        var replaceCount1 = this.repeatStr(replaceText, regArr[0]);
        var replaceCount2 = this.repeatStr(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    }
    else if (regArr.length === 1 && type === 0) {
        regtext = '(^\\w{' + regArr[0] + '})'
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
    else if (regArr.length === 1 && type === 1) {
        regtext = '(\\w{' + regArr[0] + '}$)'
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
}

/**
 * 格式化处理字符串
 * formatText('1234asda567asd890') = > "12,34a,sda,567,asd,890"
 * formatText('1234asda567asd890', 4, '  ') = > "1  234a  sda5  67as  d890"
 */
function formatText(str, size, delimiter) {
    var _size = size || 3, _delimiter = delimiter || ',';
    var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
    var reg = new RegExp(regText, 'g');
    return str.replace(reg, _delimiter);
}

/**
 * 现金额大写转换
 * upDigit(1600) => 人民币壹仟陆佰元整
 */
function upDigit(n) {
    var fraction = ['角', '分', '厘'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠人民币' : '人民币';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        //s = p + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
} 

/**
 *保留2位小数
 */
function toDecimal2(x){
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

export{
    trim,
    changeCase,
    repeatStr,
    replaceAll,
    replaceStr,
    checkPwd,
    formatText,
    upDigit,
    toDecimal2,
    formaDate
}
