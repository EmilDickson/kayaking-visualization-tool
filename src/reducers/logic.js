const INITIAL_STATE = {
    timelinePlayingPoint: false,
    timelinePlayingSpan: false,
    spanChartElement: { d3: "" },
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

const setSpanChartElement = (state, action) => {
    return {
        ...state,
        spanChartElement: {
            d3: action.element
        }
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
        case "SET_SPAN_CHART_ELEMENT": {
            return setSpanChartElement(state, action)
        }
        default:
            return state;
    }
}

export default logicReducer;