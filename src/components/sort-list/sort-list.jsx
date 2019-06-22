import React from "react";
import PropTypes from "prop-types";
import {SortField, SortOrder} from "../../data";

const sortToString = (sort) => `${sort.field}:${sort.order}`;
const compareSortOptions = (sort1, sort2) => sortToString(sort1) === sortToString(sort2);
const getOptionBySort = (options = [], activeSort = {}) => options.find((item) => compareSortOptions(item.sort, activeSort));

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
      activeSort = {
        field: SortField.ID,
        order: SortOrder.ASC
      },
    } = this.props;

    const activeSortOption = getOptionBySort(sortOptions, activeSort);
    const {title: activeSortTitle = ``} = activeSortOption;

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
            <li onClick={this._handleSortOptionClick} key={`sort-options-${index}`} className={`places__option${option === activeSortOption ? ` places__option--active` : ``}`} tabIndex="0" data-sort={option.sort.field} data-order={option.sort.order}>{option.title}</li>
          ))}
        </ul>
      </form>
    );
  }

  _handleSortClick() {
    this._invertOpenedState();
  }

  _handleSortOptionClick(event) {
    const {onSort} = this.props;
    this._invertOpenedState();
    onSort({
      field: event.target.dataset.sort,
      order: event.target.dataset.order,
    });
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
    title: PropTypes.string,
    sort: PropTypes.shape({
      field: PropTypes.string,
      order: PropTypes.string
    }),
  })),
  activeSort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string
  }),
  onSort: PropTypes.func
};


export default SortList;
