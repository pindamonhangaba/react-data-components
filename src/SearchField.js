import React, { Component } from 'react';
import Grommet, {Search} from 'grommet';
class SearchField extends Component {

  constructor(...props) {
    super(...props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.props.onChange(value);
  }

  render() {
    return (
        <Search id={this.props.id}
                inline={true}
                placeHolder="Search"
                value={this.props.value}
                onChange={this.onChange} />
    );
  }

}

module.exports = SearchField;
