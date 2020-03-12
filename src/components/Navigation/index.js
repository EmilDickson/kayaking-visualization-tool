import React from "react";
import { connect } from "react-redux";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const Navigation = ({ authUser }) => (
  authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
);

const NavigationAuth = ({ authUser }) => (
  <DropdownButton alignRight title="menu" id="dropdown-menu-align-right" className="navigation">
    <Dropdown.Item href={ROUTES.LANDING}>
      Landing
    </Dropdown.Item>
    <Dropdown.Item href={ROUTES.HOME}>
      Home
    </Dropdown.Item>
    <Dropdown.Item href={ROUTES.ACCOUNT}>
      Account
    </Dropdown.Item>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <Dropdown.Item href={ROUTES.ADMIN}>
        Admin
      </Dropdown.Item>
    )}
    {authUser.roles.includes(ROLES.ADMIN) && (
      <Dropdown.Item href={ROUTES.SIGN_UP}>
        Create users
      </Dropdown.Item>
    )}
    <div className="menuBottom">
      <Dropdown.Item className="aboutButton">
        ABOUT
      </Dropdown.Item>
      <Dropdown.Item className="exportButton">
        EXPORT
      </Dropdown.Item>
      <SignOutButton />
    </div>
    </DropdownButton>
);

const NavigationNonAuth = () => (
  <DropdownButton alignRight title="menu" id="dropdown-menu-align-right" className="navigation">
    <Dropdown.Item href={ROUTES.LANDING}>
      Landing
    </Dropdown.Item>
    <Dropdown.Item href={ROUTES.SIGN_IN}>
      Sign In
    </Dropdown.Item>
  </DropdownButton>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Navigation);
