import React from 'react';
import PropTypes from 'prop-types';
import SortableTable from './SortableTable';
import Country from './Country';

const CountryList = ({ data }) => (
  <SortableTable
    data={data}
    firstColumnComp={<Country />}
    firstColumnPropName="Country"
    mainSortByProp="newCases"
  />
);

CountryList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CountryList;
