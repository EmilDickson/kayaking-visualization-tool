import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

class HomePage extends Component {
    componentDidMount() {
        this.props.firebase.users().on("value", (snapshot) => {
            this.props.onSetUsers(snapshot.val());
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        return (
            <div className='simpleContainer'>
                <h1>Kayaking Visualization Tool</h1>
                <p>
                    Welcome! Choose one of the visualization views from the menu
                    in the top right. If you want to switch variables on and
                    off, just click on them in the menu bar above. For more
                    information, click the info button next to the variables at
                    any time.
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.userState.users,
});

const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: "USERS_SET", users }),
});

const condition = (authUser) => !!authUser;

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps),
    withAuthorization(condition)
)(HomePage);
