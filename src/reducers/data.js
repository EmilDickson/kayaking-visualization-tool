const INITIAL_STATE = {
  data: null,
  maxInDataSet: null,
  minInDataSet: null,
  dataSelection: null,
  maxInDataSelection: null,
  minInDataSelection: null,
  selectedPoint: null,
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
        default:
            return state;
    }
}

export default dataReducer;