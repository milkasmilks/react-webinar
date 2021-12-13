import React from 'react';
import propTypes from 'prop-types';
import './styles.css';

function Pagination({onChange, pagesArray, currentPage}) {
  return (
    <div className='Pagination'>
      {pagesArray.map(page => 
        <button key={page} onClick={() => onChange(page)} className={page === currentPage ? 'Pagination__button Pagination__button-current' : 'Pagination__button'}>{page}</button>
      )}
    </div>
  )
}

Pagination.propTypes = {
  onChange: propTypes.func.isRequired,
  pageCount: propTypes.number,
  currentPage: propTypes.number
}

Pagination.defaultProps = {
  onChange: () => {},
  pageCount: 0,
  currentPage: 0
}

export default React.memo(Pagination);
