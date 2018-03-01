import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import PrivateComponent from '../Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} component={PrivateComponent(Component)} />
);

PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(Function).isRequired,
};

export default PrivateRoute;
