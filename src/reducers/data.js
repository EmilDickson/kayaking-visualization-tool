const INITIAL_STATE = {
  data: null,
  dataSelection: null,
  selectedPoint: null,
};

const setData = (state, action) => {
    return {
        ...state,
        data: action.data
    }
}

const setDataSelection = (state, action) => {
    return {
        ...state,
        dataSelection: action.dataSelection
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