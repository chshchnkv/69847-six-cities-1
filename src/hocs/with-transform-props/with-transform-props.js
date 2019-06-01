import React from "react";

const withTransformProps = (transformFunc) => (Component) => {
  const WithTransformProps = (props) => {
    return (<Component {...transformFunc(props)}/>);
  };

  return WithTransformProps;
};

export default withTransformProps;
