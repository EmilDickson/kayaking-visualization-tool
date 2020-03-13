import React, { Component } from "react";
import { connect } from "react-redux";

class Variables extends Component {
  renderVariables = () => {
    const vars = this.props.variables
    let variableList = []
    for (let i = 0; i < vars.length; i++) {
        variableList.push(
          <div
            className={vars[i].active ? "activeVariable" : "inactiveVariable"}
            onClick={e => this.props.changeActiveVariable(e.target)}
            id={vars[i].name}
            key={"variableNo" + i}
          >
            {vars[i].name}
          </div>
        );
    }
    return variableList;
  };

  render() {
    return (
      <div className="variables">
        {this.renderVariables()}
        <div>info</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  variables: state.variableState.variables
});

const mapDispatchToProps = dispatch => ({
  changeActiveVariable: variable => {
        const varName = variable.id;
        dispatch({ type: "CHANGE_ACTIVE_VARIABLE", varName })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Variables);
