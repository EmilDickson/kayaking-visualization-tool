const INITIAL_STATE = {
  data: null
};

const setData = (state, action) => {
    return {
        ...state,
        data: action.data
    }
}

function dataReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case "SET_DATA": {
            return setData(state, action);
        }
        default:
            return state;
    }
}

export default dataReducer;