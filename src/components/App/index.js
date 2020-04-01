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
import SpeedComparison from "../SpeedComparison";
import StartAnalysis from "../StartAnalysis";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

class App extends Component {
    componentDidMount() {
        this.props.firebase.allData().on("value", snapshot => {
            const data = snapshot.val();
            this.props.setData(data);
            const lowBound = Math.round(data.length / 8);
            const highBound = Math.round(data.length / 4);
            const point = Math.round(data.length / 6);
            this.props.setDataSelection(data.slice(lowBound, highBound));
            this.props.setSelectedPoint(data[point]);
            const rawVariables = Object.keys(data[0]);
            let variables = [];
            for (let i = 0; i < rawVariables.length; i++) {
                if (rawVariables[i] !== "lat" && rawVariables[i] !== "long") {
                    variables.push({
                        name: rawVariables[i],
                        active: true
                    });
                }
            }
            this.props.setVariables(variables);
            const timelinePoints = [
                Math.round(data.length / 8),
                Math.round(data.length / 6),
                Math.round(data.length / 4)
            ];
            this.props.setTimelinePoints(timelinePoints);
            this.props.setTimelinePoint(Math.round(data.length / 8));
            const initialDataItem = {
                id: 1,
                data: data.slice(lowBound, highBound),
                selectedPoint: data[point],
                timelinePoints: timelinePoints,
                active: true,
                open: false,
            }
            this.props.createDataItem(initialDataItem);
            // All data initialization done, set "data initialized"
            this.props.setDataInitialized();
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <div className='topMenu'>
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
                    <Route
                        path={ROUTES.SPEED_COMPARISON}
                        component={SpeedComparison}
                    />
                    <Route
                        path={ROUTES.START_ANALYSIS}
                        component={StartAnalysis}
                    />
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
        dispatch({ type: "SET_SELECTED_POINT", selectedPoint }),
    setVariables: variables => dispatch({ type: "SET_VARIABLES", variables }),
    setTimelinePoints: timelinePoints =>
        dispatch({ type: "SET_TIMELINE_POINTS", timelinePoints }),
    setTimelinePoint: timelinePoint =>
        dispatch({ type: "SET_TIMELINE_POINT", timelinePoint }),
    createDataItem: dataItem =>
        dispatch({ type: "CREATE_DATA_ITEM", dataItem }),
    setDataInitialized: () =>
        dispatch({ type: "SET_DATA_INITIALIZED" }),
});

export default compose(
    withFirebase,
    withAuthentication,
    connect(mapStateToProps, mapDispatchToProps)
)(App);
