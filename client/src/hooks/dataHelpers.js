function dataHelpers() {
  function convertArrayToObject(array, key) {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  }
  function convertObjectToArray(object) {
    return Object.keys(object).map(key => object[key])
  }
  return { convertArrayToObject, convertObjectToArray };
}

export default dataHelpers;