const INITIAL_STATE = {
    variables: [
        {
            'name': 'Loading variables...',
            'active': true
        },
    ]
}

const setVariables = (state, action) => {
    return {
        ...state,
        variables: action.variables
    }
}

const changeActiveVariable = (state, action) => {
    const variableIndex = state.variables.findIndex(variable => variable.name === action.varName);
    const variableActive = state.variables[variableIndex].active
    const newVariables = [
        ...state.variables.slice(0, variableIndex),
        { 'name': action.varName, 'active': !variableActive},
        ...state.variables.slice(variableIndex + 1)
    ]
    return {
        ...state,
        variables: newVariables
    }
}

function variableReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_VARIABLES": {
            return setVariables(state, action);
        }
        case "CHANGE_ACTIVE_VARIABLE": {
            return changeActiveVariable(state, action);
        }
        default:
            return state;
    }
}

export default variableReducer;