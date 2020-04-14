import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class Variables extends Component {
    renderVariables = () => {
        const vars = this.props.variables;
        let variableList = [];
        for (let i = 0; i < vars.length; i++) {
            variableList.push(
                <div
                    className={
                        vars[i].active ? "activeVariable" : "inactiveVariable"
                    }
                    onClick={(e) => this.handleClick(e.target)}
                    id={vars[i].name}
                    key={"variableNo" + i}
                >
                    {vars[i].name}
                </div>
            );
        }
        return variableList;
    };

    handleClick = (variable) => {
        const newVariables = this.props.variables.map((v) =>
            v.name === variable.id ? { name: v.name, active: !v.active } : v
        );
        this.props.changeActiveVariable(variable);
        this.props.firebase.setVariables(newVariables);
    };

    render() {
        const { authUser } = this.props;
        return (
            <div className='variables'>
                {authUser
                    ? this.renderVariables()
                    : "Hi, please login to use the tool!"}
                <div>
                    <a href={ROUTES.INFO}>info</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    variables: state.variableState.variables,
});

const mapDispatchToProps = (dispatch) => ({
    changeActiveVariable: (variable) => {
        const varName = variable.id;
        dispatch({ type: "CHANGE_ACTIVE_VARIABLE", varName });
    },
});

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(Variables);
