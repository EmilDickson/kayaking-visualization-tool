import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import BoatRoute from '../BoatRoute';

class CompareAll extends Component {
    componentDidMount() {
        this.props.firebase.allData().on("value", snapshot => {
            this.props.setData(snapshot.val());
        })
    }

    render() {
        return(
            <div className="compareAllContainer">
                <div className="mainVisualization"></div>   
                <BoatRoute/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = dispatch => ({
    setData: data => dispatch({ type: "SET_DATA", data })
})

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(CompareAll)
