import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { NavLink } from 'reactstrap';

const Logout = props => {
  return (
    <Fragment>
      <NavLink onClick={props.logout} href="#">
        LogOut
      </NavLink>
    </Fragment>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  undefined,
  { logout }
)(Logout);
