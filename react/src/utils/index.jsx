const convertArrayToObject = (array, key) => {
    return array.reduce((obj, item) => {
        return {
            [item[key]]: item,
            ...obj,
        };
    }, {});
};

export { convertArrayToObject };