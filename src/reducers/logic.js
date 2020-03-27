const INITIAL_STATE = {
    timelinePlayingPoint: false,
    timelinePlayingSpan: false,
    timelinePoints: [],
    timelinePoint: [0],
    spanChartElement: { d3: "" },
    selectedView: "primary"
}

const setTimelinePlayingPoint = (state, action) => {
    return {
        ...state,
        timelinePlayingPoint: action.timelinePlayingPoint,
    }
}

const setTimelinePlayingSpan = (state, action) => {
    return {
        ...state,
        timelinePlayingSpan: action.timelinePlayingSpan
    }
}

const setTimelinePoints = (state, action) => {
    return {
        ...state,
        timelinePoints: action.timelinePoints
    }
}

const setTimelinePoint = (state, action) => {
    return {
        ...state,
        timelinePoint: action.timelinePoint
    }
}

const setSpanChartElement = (state, action) => {
    return {
        ...state,
        spanChartElement: {
            d3: action.element
        }
    }
}

const switchSelectedView = (state) => {
    const newView = state.selectedView === "primary" ? "secondary" : "primary";
    return {
        ...state,
        selectedView: newView
    }
}

function logicReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case "SET_TIMELINE_PLAYING_POINT": {
            return setTimelinePlayingPoint(state, action)
        }
        case "SET_TIMELINE_PLAYING_SPAN": {
            return setTimelinePlayingSpan(state, action)
        }
        case "SET_TIMELINE_POINTS": {
            return setTimelinePoints(state, action)
        }
        case "SET_TIMELINE_POINT": {
            return setTimelinePoint(state, action)
        }
        case "SET_SPAN_CHART_ELEMENT": {
            return setSpanChartElement(state, action)
        }
        case "SWITCH_SELECTED_VIEW": {
            return switchSelectedView(state)
        }
        default:
            return state;
    }
}

export default logicReducer;