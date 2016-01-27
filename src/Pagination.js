import React, { PropTypes, Component } from 'react';
import Grommet, {Button, Box} from 'grommet';
// Used to cancel events.
var preventDefault = e => e.preventDefault();

export default class Pagination extends Component {

  static defaultProps = {
    showPages: 5,
  };

  static propTypes = {
    onChangePage: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    showPages: PropTypes.number,
  };

  shouldComponentUpdate(nextProps) {
    var props = this.props;

    return props.totalPages !== nextProps.totalPages ||
      props.currentPage !== nextProps.currentPage ||
      props.showPages !== nextProps.showPages;
  }

  onChangePage(pageNumber, event) {
    event.preventDefault();
    this.props.onChangePage(pageNumber);
  }

  render() {
    var { totalPages, showPages, currentPage } = this.props;

    if (totalPages === 0) {
      return null;
    }

    var diff = Math.floor(showPages / 2),
        start = Math.max(currentPage - diff, 0),
        end = Math.min(start + showPages, totalPages);

    if (totalPages >= showPages && end >= totalPages) {
      start = totalPages - showPages;
    }

    var buttons = [], btnEvent, isCurrent;
    for (var i = start; i < end; i++) {
      isCurrent = currentPage === i;
      // If the button is for the current page then disable the event.
      if (isCurrent) {
        btnEvent = preventDefault;
      } else {
        btnEvent = this.onChangePage.bind(this, i);
      }
      buttons.push(
        <Box key={i} className={isCurrent ? 'active' : null} align="center">
          <Button type="icon" onClick={isCurrent ? null : btnEvent} className={isCurrent ? " current " : ""}>
            <span className="button__icon">{i + 1}</span>
          </Button>
        </Box>
      );
    }

    // First and Prev button handlers and class.
    var firstHandler = preventDefault;
    var prevHandler = preventDefault;
    var isNotFirst = currentPage > 0;
    if (isNotFirst) {
      firstHandler = this.onChangePage.bind(this, 0);
      prevHandler = this.onChangePage.bind(this, currentPage - 1);
    }

    // Next and Last button handlers and class.
    var nextHandler = preventDefault;
    var lastHandler = preventDefault;
    var isNotLast = currentPage < totalPages - 1;
    if (isNotLast) {
      nextHandler = this.onChangePage.bind(this, currentPage + 1);
      lastHandler = this.onChangePage.bind(this, totalPages - 1);
    }

    buttons = [
      <Box key="first" className={!isNotFirst ? 'disabled' : null}>
        <Button type="icon" onClick={isNotFirst ? firstHandler : null}>
          <Grommet.Icons.Base.Rewind colorIndex="brand" />
        </Button>
      </Box>,
      <Box key="prev" className={!isNotFirst ? 'disabled' : null}>
        <Button type="icon" onClick={isNotFirst ? prevHandler : null}>
          <Grommet.Icons.Base.CaretPrevious colorIndex="brand" />
        </Button>
      </Box>,
    ].concat(buttons);

    buttons = buttons.concat([
      <Box key="next" className={!isNotLast ? 'disabled' : null}>
        <Button type="icon" onClick={isNotLast ? nextHandler : null}>
          <Grommet.Icons.Base.CaretNext colorIndex="brand" />
        </Button>
      </Box>,
      <Box key="last" className={!isNotLast ? 'disabled' : null}>
        <Button type="icon"
          onClick={isNotLast ? lastHandler : null}>
          <Grommet.Icons.Base.FastForward colorIndex="brand" />
        </Button>
      </Box>,
    ]);

    return (
      <Box className={this.props.className} aria-label="Pagination" full="horizontal" justify="end" align="end" direction="row">
        <Box full={false} direction="row">{buttons}</Box>
      </Box>
    );
  }
}
