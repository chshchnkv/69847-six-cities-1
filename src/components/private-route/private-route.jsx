import React from "react";
import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoute = ({component: Component, user, exact, strict, path, ...rest}) => {
  return (<Route exact={exact} strict={strict} path={path} render = {(props) => {
    const {id = -1} = user;

    if (id < 0) {
      return (<Redirect to={{
        pathname: `/login`,
        state: {
          from: props.location
        }
      }}/>);
    } else {
      return (<Component {...rest} {...props}/>);
    }
  }}
  />);
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  user: PropTypes.shape(),
  exact: PropTypes.any,
  strict: PropTypes.any,
  path: PropTypes.any,
  location: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    zoom: PropTypes.number
  })
};
