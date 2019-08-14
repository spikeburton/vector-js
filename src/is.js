function is(dataObj, dataTypeStr) {
  var returnValue = false;
  let a = function(val) {
    return val;
  };

  try {
    let d = dataTypeStr.toLowerCase();
    let typeString = d.substring(0, 3);
    switch (typeString) {
      case 'str':
        returnValue = typeof dataObj === 'string' || dataObj instanceof String;
        break;
      case 'num':
        returnValue = typeof dataObj === 'number' && isFinite(dataObj);
        break;
      case 'arr':
        returnValue =
          dataObj &&
          typeof dataObj === 'object' &&
          dataObj.constructor === Array;
        break;
      case 'fun':
        returnValue = typeof dataObj === 'function';
        break;
      case 'obj':
        returnValue =
          dataObj &&
          typeof dataObj === 'object' &&
          dataObj.constructor === Object;
        break;
      case 'nul':
        returnValue = dataObj === null;
        break;
      case 'und':
        returnValue = typeof dataObj === 'undefined';
        break;
      case 'boo':
        returnValue = typeof dataObj === 'boolean';
        break;
      case 'reg':
        returnValue =
          dataObj &&
          typeof dataObj === 'object' &&
          dataObj.constructor === RegExp;
        break;
      case 'err':
        returnValue =
          dataObj instanceof Error && typeof dataObj.message !== 'undefined';
        break;
      case 'dat':
        returnValue = dataObj instanceof Date;
        break;
      case 'sym':
        returnValue = typeof dataObj === 'symbol';
        break;
      default:
        let c = dataObj.constructor.name.toLowerCase();
        returnValue = c.indexOf(d) !== -1;
    }
  } catch (e) {
    console.log(`ERROR: ${e}`);
  } finally {
    // Not permitted by StandardJS / ESLint
  }
  return a(returnValue);
}

module.exports = is;
