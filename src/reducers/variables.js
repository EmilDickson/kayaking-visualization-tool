const INITIAL_STATE = {
    variables: [
        {
            'name': 'xAcc',
            'active': true
        },
        {
            'name': 'yAcc', 
            'active': true
        },
        {
            'name': 'zAcc',
            'active': true
        },
        {
            'name': 'speed',
            'active': true
        },
        {
            'name': 'fpaddling',
            'active': true
        },
        {
            'name': 'xGyro',
            'active': true
        },
        {
            'name': 'yGyro',
            'active': true
        },
        {
            'name': 'zGyro',
            'active': true
        },
        {
            'name': 'time',
            'active': true
        },
        {
            'name': 'deltaVPos',
            'active': true
        },
        {
            'name': 'deltaVNeg',
            'active': true
        },
        {
            'name': 'pulse',
            'active': true
        },
    ]
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
        case "CHANGE_ACTIVE_VARIABLE": {
            return changeActiveVariable(state, action);
        }
        default:
            return state;
    }
}

export default variableReducer;