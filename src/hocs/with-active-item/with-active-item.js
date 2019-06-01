import React from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: -1
      };

      this._handleChangeActiveItem = this._handleChangeActiveItem.bind(this);
    }


    render() {
      const {activeItem} = this.state;

      return (<Component
        {...this.props}
        activeItem = {activeItem}
        onChangeActiveItem = {this._handleChangeActiveItem}
      />);
    }

    _handleChangeActiveItem(newActiveItem) {
      const {onChangeActiveItem} = this.props;
      this.setState({
        activeItem: newActiveItem
      });
      onChangeActiveItem(newActiveItem);
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.number,
    onChangeActiveItem: PropTypes.func
  };

  return WithActiveItem;
};

export default withActiveItem;
