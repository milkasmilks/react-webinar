import React from 'react';
import propTypes from 'prop-types';
import getPagesArray from "../../utils/get-pages-array";
import './styles.css';

function Pagination({onChange, limit, totalCount, currentPage}) {
  const pagesArray = getPagesArray(totalCount, limit);
  
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
  limit: propTypes.number,
  totalCount: propTypes.number,
  currentPage: propTypes.number
}

Pagination.defaultProps = {
  onChange: () => {},
  limit: 0,
  totalCount: 0,
  currentPage: 0
}

export default React.memo(Pagination);
