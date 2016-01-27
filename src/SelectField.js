import React, { Component } from 'react';
import Grommet, {Box} from 'grommet';

class SelectField extends Component {

  constructor(...props) {
    super(...props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    var {id, options, label, value} = this.props;
    var mappedOpts =
      options.map((each) => <option key={each} value={each}>{each}</option>);

    return (
      <Box direction="row">
        <label htmlFor={id}>{label}</label>
        <select id={id} value={value} onChange={this.onChange}>
          {mappedOpts}
        </select>
      </Box>
    );
  }

}

module.exports = SelectField;
