import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'uikit';

import './Paginator.styl';

class Paginator extends React.Component {
  static propTypes = {
    pageN: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    maxVisible: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    maxVisible: 5,
  };

  onClickNext = (ev) => {
    const { pageN, max, onChange } = this.props;
    ev.preventDefault();
    if (pageN < max) {
      onChange(pageN + 1);
    }
  };

  onClickPrev = (ev) => {
    const { pageN, onChange } = this.props;
    ev.preventDefault();
    if (pageN > 1) {
      onChange(pageN - 1);
    }
  };

  render() {
    const { pageN, onChange, max, maxVisible: maxVisibleProps } = this.props;
    let skip = 0;
    let pageCount = 4;
    let desktopVersion = true;
    let maxVisible = (maxVisibleProps > max) ? max : maxVisibleProps;

    if ($(window).width() <= 768) {
      if (pageN > 1) maxVisible = 2;
      desktopVersion = false;
      pageCount = 1;
    }
    if (pageN > maxVisible - 1 && pageN < max) {
      pageCount = (pageN >= max - pageCount) ? max - pageN : pageCount;
      skip = pageN - maxVisible + pageCount;
    } else if (pageN === max) {
      skip = pageN - maxVisible;
    }
    skip = Math.max(0, skip);
    const iterator = Array(...Array(maxVisible)).map((v, i) => skip + i + 1);
    if (iterator.length > 0) {
      if (iterator[0] > 2) {
        iterator.unshift(1, '...');
      } else if (iterator[0] === 2) {
        iterator.unshift(1);
      }
      if (desktopVersion) {
        if (pageN < (max - pageCount - 1)) {
          if (iterator[iterator.length - 1] !== max - 2) {
            iterator.push('...');
          }
          iterator.push(max - 1, max);
        }
      }
    }
    if (max > 1) {
      return (
        <ul className={
          pageN > 1 ? 'pagination gpagination__area gpagination-type--first' : 'pagination gpagination__area'}
        >
          <li className={pageN === 1 ? 'page-item page-item--prev page-item--hide' : 'page-item page-item--prev'}>
            <a onClick={this.onClickPrev} href="#" aria-label="Previous" className="page-link">
              <span aria-hidden="true">
                <Icon name="arrow-compact-left" />
              </span>
              <span className="page-item__text">Prev</span>
            </a>
          </li>
          {iterator.map((page, index) => {
            if (page === '...') {
              return (
                <li className="page-item page-item--elipsis" key={page + index}>
                  <span>{page}</span>
                </li>
              );
            }
            return (
              <li
                className={
                  `page-item${page === 1 ? ' page-item--first' : ''}${pageN === page ? ' page-item--active' : ''}`
                }
                key={page + index}
              >
                <a
                  className={pageN === page ? 'page-link sbtn--active' : 'page-link'}
                  data-page={page}
                  onClick={() => onChange(page)}
                >
                  {page}
                </a>
              </li>
            );
          }, this)}
          <li className={pageN === max ? 'page-item page-item--next page-item--hide' : 'page-item page-item--next'}>
            <a onClick={this.onClickNext} href="#" aria-label="Next" className="page-link">
              <span aria-hidden="true"><Icon name="arrow-compact-right" /></span>
              <span className={pageN >= 9 ? 'page-item__text hide--mobile' : 'page-item__text'}>Next</span>
            </a>
          </li>
        </ul>
      );
    }
    return false;
  }
}

export default Paginator;
