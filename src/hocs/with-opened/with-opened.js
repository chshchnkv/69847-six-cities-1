import React from "react";

const withOpened = (Component) => {
  class WithOpened extends React.PureComponent {
    constructor(props) {
      super(props);

      this._handleClickOpen = this._handleClickOpen.bind(this);

      this.state = {
        isOpened: false
      };
    }

    render() {
      const {isOpened} = this.state;
      return (<Component
        {...this.props}
        isOpened = {isOpened}
        onClickOpen = {this._handleClickOpen}
      />);
    }

    _handleClickOpen() {
      const {isOpened} = this.state;
      this.setState({
        isOpened: !isOpened
      });
    }
  }

  return WithOpened;
};

export default withOpened;
