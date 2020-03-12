import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <Dropdown.Item className="signOutButton" onClick={firebase.doSignOut}>
    SIGN OUT
  </Dropdown.Item>
);

export default withFirebase(SignOutButton);
