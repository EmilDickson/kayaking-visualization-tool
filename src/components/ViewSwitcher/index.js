import React, { Component } from 'react';

const renderViewSelector = (view, selected, handleViewSwitch) => (
    <div className={view === selected ? "selectedView" : ""} id={view}>
        <img src={process.env.PUBLIC_URL + "/ViewLogos/" + view + ".png"} alt={view} onClick={e => handleViewSwitch(e)}/>
    </div>
)

class ViewSwitcher extends Component {
    render () {
        const {view1, view2, selected, handleViewSwitch} = this.props;
        return (
            <div className="viewSwitcher">
                {renderViewSelector(view1, selected, handleViewSwitch)}
                {renderViewSelector(view2, selected, handleViewSwitch)}
            </div>
        )
    }
}

export default ViewSwitcher;