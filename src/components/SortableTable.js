import React from 'react';
import PropTypes from 'prop-types';

const mapSortPropsToNames = {
  newCases: 'New cases',
};
const sortTypes = {
  up: {
    class: 'sort-up',
    fn: (propName, a, b) => { return a[propName] - b[propName]; },
  },
  down: {
    class: 'sort-down',
    fn: (propName, a, b) => b[propName] - a[propName],
  },
  default: {
    class: 'sort',
    fn: (a, b) => a,
  },
};

class SortableTable extends React.Component {
  state = {
    currentSort: 'default',
  };

  onSortChange = () => {
    const { currentSort } = this.state;
    let nextSort;

    if (currentSort === 'down') nextSort = 'up';
    else if (currentSort === 'up') nextSort = 'default';
    else if (currentSort === 'default') nextSort = 'down';

    this.setState({
      currentSort: nextSort,
    });
  };

  render() {
    const { data, firstColumnComp, firstColumnPropName, mainSortByProp } = this.props;
    const { currentSort } = this.state;

    return (
      data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>{firstColumnPropName}</th>
              <th>
                <span>
                  {mapSortPropsToNames[mainSortByProp]}
                </span>
                <button onClick={this.onSortChange} className="sort-button">
                  <i className={`fas fa-${sortTypes[currentSort].class}`} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...data].sort(sortTypes[currentSort].fn.bind(this, mainSortByProp)).map((p, key) => (
              <tr key={p.name}>
                <td>
                  {React.cloneElement(firstColumnComp, { ...p })}
                </td>
                <td>
                  {p[mainSortByProp]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    );
  }
}

SortableTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  firstColumnComp: PropTypes.object,
  firstColumnPropName: PropTypes.string,
  mainSortByProp: PropTypes.string,
};

export default SortableTable;
