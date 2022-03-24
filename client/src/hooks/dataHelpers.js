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
  return { convertArrayToObject };
}

export default dataHelpers;
