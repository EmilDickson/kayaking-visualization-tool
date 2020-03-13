import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";

class CompareAll extends Component {
    componentDidMount() {
        this.props.firebase.allData().on("value", snapshot => {
            const data = snapshot.val();
            this.props.setData(data);
        })
    }

    render() {
        console.log(this.props.data)
        return(
            <div className="compareAllContainer">
                Compare it all!
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
