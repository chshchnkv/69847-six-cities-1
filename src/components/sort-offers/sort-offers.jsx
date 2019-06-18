import React from "react";
import PropTypes from "prop-types";

class SortOffers extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      activeSort: 0
    };

    this._handleSortClick = this._handleSortClick.bind(this);
    this._handleSortOptionClick = this._handleSortOptionClick.bind(this);

    this._sortOptions = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];
  }
  render() {
    const {
      opened,
      activeSort
    } = this.state;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex="0" onClick={this._handleSortClick}>
          {this._sortOptions[activeSort]}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"/>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${opened ? ` places__options--opened` : ``}`} onClick={this._handleSortOptionClick}>
          {this._sortOptions.map((option, index) => (
            <li key={`sort-options-${index}`} className={`places__option${activeSort === index ? ` places__option--active` : ``}`} tabIndex="0" data-sort={index}>{option}</li>
          ))}
        </ul>
      </form>
    );
  }

  _handleSortClick(event) {
    event.preventDefault();
    const {opened} = this.state;
    this.setState({
      opened: !opened
    });
  }

  _handleSortOptionClick(event) {
    const {onSort} = this.props;
    const sortTarget = event.target;
    if (sortTarget) {
      const sortOption = parseInt(sortTarget.dataset.sort, 10);
      this.setState({
        activeSort: sortOption,
        opened: false
      });
      onSort(sortOption);
    }
  }
}

SortOffers.propTypes = {
  onSort: PropTypes.func,
};

export default SortOffers;
