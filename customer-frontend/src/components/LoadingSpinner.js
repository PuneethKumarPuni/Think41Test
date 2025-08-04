import React from 'react';

const LoadingSpinner = ({ message = "Loading customers..." }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div className="spinner-border text-primary mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <h4 className="text-muted">{message}</h4>
      <p className="text-muted">Please wait while we fetch the data...</p>
    </div>
  );
};

export default LoadingSpinner;