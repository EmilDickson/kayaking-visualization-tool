import React, { Component } from 'react';

const renderViewSelector = (view, selected, handleViewSwitch) => (
    <div className={selected ? "selectedView" : ""} id={view}>
        <img src={process.env.PUBLIC_URL + "/ViewLogos/" + view + ".png"} alt={view} onClick={handleViewSwitch}/>
    </div>
)

class ViewSwitcher extends Component {
    render () {
        const {primary, secondary, selected, handleViewSwitch} = this.props;
        return (
            <div className="viewSwitcher">
                {renderViewSelector(primary, selected === "primary" ? true : false, handleViewSwitch)}
                {renderViewSelector(secondary, selected === "primary" ? false : true, handleViewSwitch)}
            </div>
        )
    }
}

export default ViewSwitcher;