/**
 * 首字母大写
 * @param str
 */
export const capitalize = (str: string) => {
  str = str || '';
  if (str.length > 0) {
    const first = str.substr(0, 1).toUpperCase();
    const spare = str.substr(1, str.length);
    return first + spare;
  }
};

/**
 * 格式化参数
 * @param formatter
 * @param val
 */
export const formatWrapper = (
  val: number | string,
  formatter?: (value: number | string) => string,
) => {
  if (formatter) {
    return formatter(val);
  }
  return val;
};

/**
 * 获取随机id
 */
export const randomUuid = () => `uuid_${Math.random().toString(36).substr(2)}`;

export const dataURLtoBlob = (dataurl: string, onlyData?: boolean) => {
  try {
    const arr = dataurl.split(',');
    const mime = (arr[0].match(/:(.*?);/) || [])[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return onlyData ? u8arr : new Blob([u8arr], { type: mime });
  } catch (e) {
    console.error(e);
  }
};

export const getStringFromHtml = (htmlStr: string) => {
  const con = htmlStr.replace(/\s*/g, ''); //去掉空格
  const res = con.replace(/<[^>]+>/g, ''); //去掉所有的html标记
  const res1 = res.replace(/↵/g, ''); //去掉所有的↵符号
  const res2 = res1.replace(/[\r\n]/g, '');
  return res2;
};

/**
 * 获取字符串有效数值
 * @param value string
 */
export const getNumber = (value: string) => {
  return value
    .replace(/[^\d.]/g, '')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.');
};

/**
 * 得到微信vcode
 */
export const getWxVcode = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LENGTH = 64;
  let result = '';
  for (let i = LENGTH; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

/**
 * 驼峰转下划线
 * @param exp 名称
 */
export const humpToUnderLine = (exp: string) => {
  return exp.replace(/([A-Z])/g, '_$1').toLowerCase();
};

/**
 * 下划线转驼峰
 * @param exp 名称
 */
export const underLineToHump = (exp: string) => {
  return exp.replace(/_(\w)/g, (_, letter) => {
    return letter.toUpperCase();
  });
};
