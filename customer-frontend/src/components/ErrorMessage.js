import React from 'react';

const ErrorMessage = ({ error, onRetry }) => {
  const getErrorDetails = () => {
    switch (error?.type) {
      case 'network_error':
        return {
          icon: 'fas fa-wifi',
          title: 'Connection Error',
          color: 'danger',
          suggestions: [
            'Make sure your Spring Boot backend is running on port 8080',
            'Check the API endpoint: http://localhost:8080/api/customers',
            'Verify your internet connection'
          ]
        };
      case 'server_error':
        return {
          icon: 'fas fa-server',
          title: 'Server Error',
          color: 'warning',
          suggestions: [
            'The server encountered an error',
            'Try again in a few moments',
            'Contact support if the problem persists'
          ]
        };
      default:
        return {
          icon: 'fas fa-exclamation-triangle',
          title: 'Something Went Wrong',
          color: 'danger',
          suggestions: ['Please try refreshing the page']
        };
    }
  };

  const errorDetails = getErrorDetails();

  return (
    <div className="text-center py-5">
      <div className="mb-4">
        <i className={`${errorDetails.icon} fa-3x text-${errorDetails.color}`}></i>
      </div>
      
      <h3 className={`text-${errorDetails.color} mb-3`}>{errorDetails.title}</h3>
      
      <div className="alert alert-light border" role="alert">
        <p className="mb-2"><strong>Error Details:</strong></p>
        <p className="text-muted">{error?.message || 'An unexpected error occurred'}</p>
      </div>
      
      <div className="mb-4">
        <h6>Troubleshooting:</h6>
        <ul className="list-unstyled text-muted">
          {errorDetails.suggestions.map((suggestion, index) => (
            <li key={index}>• {suggestion}</li>
          ))}
        </ul>
      </div>
      
      <div className="d-flex gap-2 justify-content-center">
        <button className="btn btn-primary" onClick={onRetry}>
          <i className="fas fa-redo me-2"></i>
          Try Again
        </button>
        <button className="btn btn-outline-secondary" onClick={() => window.location.reload()}>
          <i className="fas fa-refresh me-2"></i>
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;