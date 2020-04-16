const INITIAL_STATE = {
  data: null,
  maxInDataSet: null,
  minInDataSet: null,
  dataSelection: null,
  maxInDataSelection: null,
  minInDataSelection: null,
  selectedPoint: null,
  dataItems: [],
  dataInitialized: false,
};

const getMaxMin = (dataIn) => {
    const variables = Object.keys(dataIn[0]);
    let max = {}
    let min = {}
    for (let i = 0; i < variables.length; i++) {
        max[variables[i]] = Math.max.apply(Math, dataIn.map(o => o[variables[i]]));
        min[variables[i]] = Math.min.apply(Math, dataIn.map(o => o[variables[i]]));
    }
    return {max: max, min: min}
}

const setData = (state, action) => {
    const maxMin = getMaxMin(action.data);
    return {
        ...state,
        data: action.data,
        maxInDataSet: maxMin.max,
        minInDataSet: maxMin.min,
    }
}

const setDataSelection = (state, action) => {
    const maxMin = getMaxMin(action.dataSelection);
    return {
        ...state,
        dataSelection: action.dataSelection,
        maxInDataSelection: maxMin.max,
        minInDataSelection: maxMin.min,
    }
}

const setSelectedPoint = (state, action) => {
    return {
        ...state,
        selectedPoint: action.selectedPoint
    }
}

const createDataItem = (state, action) => {
    return {
        ...state,
        dataItems: action.newDataItems
    }
}

const updateDataItem = (state, action) => {
    return {
        ...state,
        dataItems: action.newDataItems
    }
}

const deleteDataItem = (state, action) => {
    return {
        ...state,
        dataItems: action.newDataItems
    }
}

const getDataItem = (state, action) => {
    for (let i = 0; i < state.dataItems.length; i++) {
        if (state.dataItems[i].id === action.id) {
            return state.dataItems[i];
        }
    }
}

const setDataInitialized = (state) => {
    return {
        ...state,
        dataInitialized: !state.dataInitialized
    }
}

function dataReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case "SET_DATA": {
            return setData(state, action);
        }
        case "SET_DATA_SELECTION": {
            return setDataSelection(state, action);
        }
        case "SET_SELECTED_POINT": {
            return setSelectedPoint(state, action);
        }
        case "CREATE_DATA_ITEM": {
            return createDataItem(state, action);
        }
        case "UPDATE_DATA_ITEM": {
            return updateDataItem(state, action);
        }
        case "DELETE_DATA_ITEM": {
            return deleteDataItem(state, action);
        }
        case "GET_DATA_ITEM": {
            return getDataItem(state, action);
        }
        case "SET_DATA_INITIALIZED": {
            return setDataInitialized(state);
        }
        default:
            return state;
    }
}

export default dataReducer;