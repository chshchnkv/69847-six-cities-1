import React from "react";
import {Redirect, Route} from "react-router-dom";

export const PrivateRoute = ({component: Component, user, ...rest}) => {
  return (<Route {...rest} render = {(props) => {
      const {id = -1} = user;

      if (id < 0) {
        return (<Redirect to={{
          pathname: `/login`,
          state: {
            from: props.location
          }
        }}/>)
      } else {
        return (<Component {...props}/>)
      }
    }
  }
  />)
};
