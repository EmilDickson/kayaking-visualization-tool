const getMaxMin = (dataIn) => {
    const variables = Object.keys(dataIn[0]);
    let max = {};
    let min = {};
    for (let i = 0; i < variables.length; i++) {
        max[variables[i]] = Math.max.apply(
            Math,
            dataIn.map((o) => o[variables[i]])
        );
        min[variables[i]] = Math.min.apply(
            Math,
            dataIn.map((o) => o[variables[i]])
        );
    }
    return { max: max, min: min };
};

export const createHelper = (dataItem, dataItems) => {
    const colors = [
        "#A6CEF6",
        "#7BA6DE",
        "#EBA476",
        "#FBE49C",
        "#89939A",
        "#BDC5C5",
        "#DE816E",
        "#7DADB5",
        "#90D3C5",
        "#F7C47F",
    ];
    const colorIndex = dataItems.length;
    const maxMin = getMaxMin(dataItem.data);
    dataItem["color"] = colors[colorIndex];
    dataItem["maxInDataSelection"] = maxMin.max;
    dataItem["minInDataSelection"] = maxMin.min;
    dataItem["graphOpen"] = false;
    return [...dataItems, dataItem];
};

export const updateHelper = (dataItem, dataItems) => {
    const dataItemIndex = dataItems.findIndex((d) => d.id === dataItem.id);
    const maxMin = getMaxMin(dataItem.data);
    dataItem["maxInDataSelection"] = maxMin.max;
    dataItem["minInDataSelection"] = maxMin.min;
    return [
        ...dataItems.slice(0, dataItemIndex),
        dataItem,
        ...dataItems.slice(dataItemIndex + 1),
    ];
};

export const deleteHelper = (dataItem, dataItems) => {
    const dataItemIndex = dataItems.findIndex((d) => d.id === dataItem.id);
    const newDataItems = [...dataItems];
    newDataItems.splice(dataItemIndex, 1);
    return newDataItems;
};
