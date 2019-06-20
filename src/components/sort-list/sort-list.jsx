import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const getOptionById = (options = [], id = -1) => options.find((item) => item.id === id);

class SortList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {opened: false};

    this._handleSortClick = this._handleSortClick.bind(this);
    this._handleSortOptionClick = this._handleSortOptionClick.bind(this);
  }
  render() {
    const {opened} = this.state;

    const {
      sortOptions = [],
      activeSortOptionId = -1
    } = this.props;

    const {title: activeSortTitle = ``} = getOptionById(sortOptions, activeSortOptionId);

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex="0" onClick={this._handleSortClick}>
          {activeSortTitle}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"/>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${opened ? ` places__options--opened` : ``}`}>
          {sortOptions.map((option, index) => (
            <Link to={option.id > 0 ? `?sort=${option.id}` : `/`} onClick={this._handleSortOptionClick} key={`sort-options-${index}`} className={`places__option${option.id === activeSortOptionId ? ` places__option--active` : ``}`} tabIndex="0">{option.title}</Link>
          ))}
        </ul>
      </form>
    );
  }

  _handleSortClick(event) {
    event.preventDefault();
    this._invertOpenedState();
  }

  _handleSortOptionClick() {
    this._invertOpenedState();
  }

  _invertOpenedState() {
    const {opened} = this.state;
    this.setState({
      opened: !opened
    });
  }
}

SortList.propTypes = {
  sortOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string
  })),
  activeSortOptionId: PropTypes.number
};


export default SortList;
