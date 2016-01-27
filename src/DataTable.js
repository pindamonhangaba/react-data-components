var React = require('react');
var Table = require('./Table');
var Pagination = require('./Pagination');
var SelectField = require('./SelectField');
var SearchField = require('./SearchField');
import Grommet, {Box, Header} from 'grommet';
var DataMixin = require('./DataMixin');

var DataTable = React.createClass({

  mixins: [ DataMixin ],

  render() {
    var page = this.buildPage();

    return (
      <Box className={this.props.className}>
          <Header direction="row" justify="between">
            <SearchField
                id="search-field"
                label="Search:"
                value={this.state.filterValues.globalSearch}
                onChange={this.onFilter.bind(this, 'globalSearch')}
                />
            <SelectField
              id="page-menu"
              label="Page size:"
              value={this.state.pageLength}
              options={this.props.pageLengthOptions}
              onChange={this.onPageLengthChange}
            />
            <Pagination
                className="pagination pull-right"
                currentPage={page.currentPage}
                totalPages={page.totalPages}
                onChangePage={this.onChangePage}
                />
          </Header>
        <Table
          className="table table-bordered"
          dataArray={page.data}
          columns={this.props.columns}
          keys={this.props.keys}
          buildRowOptions={this.props.buildRowOptions}
          sortBy={this.state.sortBy}
          onSort={this.onSort}
        />
      </Box>
    );
  },
});

module.exports = DataTable;
