import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import Navigation from "../Navigation";
import Variables from "../Variables";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";

/* Visualization views */
import CompareAll from "../CompareAll";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

class App extends Component {
    componentDidMount() {
        this.props.firebase.allData().on("value", snapshot => {
            const data = snapshot.val();
            this.props.setData(data);
            const lowBound = Math.round(data.length / 8);
            const highBound = Math.round(data.length / 2);
            const point = Math.round(data.length / 4);
            this.props.setDataSelection(data.slice(lowBound, highBound));
            this.props.setSelectedPoint(data[point]);
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <div className="topMenu">
                        <Variables />
                        <Navigation />
                    </div>

                    <Route
                        exact
                        path={ROUTES.LANDING}
                        component={LandingPage}
                    />
                    <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route
                        path={ROUTES.PASSWORD_FORGET}
                        component={PasswordForgetPage}
                    />
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                    <Route path={ROUTES.ADMIN} component={AdminPage} />
                    <Route path={ROUTES.COMPARE_ALL} component={CompareAll} />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    data: state.dataState.data
});

const mapDispatchToProps = dispatch => ({
    setData: data => dispatch({ type: "SET_DATA", data }),
    setDataSelection: dataSelection =>
        dispatch({ type: "SET_DATA_SELECTION", dataSelection }),
    setSelectedPoint: selectedPoint =>
        dispatch({ type: "SET_SELECTED_POINT", selectedPoint })
});

export default compose(
    withFirebase,
    withAuthentication,
    connect(mapStateToProps, mapDispatchToProps)
)(App);
