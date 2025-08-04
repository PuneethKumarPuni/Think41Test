import React from 'react';

const CustomerCard = ({ customer }) => {
  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return first + last;
  };

  const getOrderBadgeClass = (count) => {
    if (count === 0) return 'bg-secondary';
    if (count <= 2) return 'bg-warning text-dark';
    if (count <= 5) return 'bg-info text-dark';
    return 'bg-success';
  };

  const getLocation = () => {
    const parts = [customer.city, customer.state, customer.country].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'Location not specified';
  };

  return (
    <div className="card h-100 shadow-sm customer-card">
      <div className="card-body">
        {/* Customer Header */}
        <div className="d-flex align-items-center mb-3">
          <div className="customer-avatar me-3">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                 style={{width: '50px', height: '50px', fontSize: '18px', fontWeight: 'bold'}}>
              {getInitials(customer.firstName, customer.lastName)}
            </div>
          </div>
          <div className="flex-grow-1">
            <h5 className="card-title mb-1">
              {customer.firstName} {customer.lastName}
            </h5>
            <small className="text-muted">Customer ID: {customer.id}</small>
          </div>
          <span className={`badge ${getOrderBadgeClass(customer.orderCount)}`}>
            {customer.orderCount} {customer.orderCount === 1 ? 'order' : 'orders'}
          </span>
        </div>

        {/* Customer Details */}
        <div className="customer-details">
          <div className="mb-2">
            <i className="fas fa-envelope text-primary me-2"></i>
            <span className="text-break">{customer.email}</span>
          </div>
          
          {customer.age && (
            <div className="mb-2">
              <i className="fas fa-birthday-cake text-success me-2"></i>
              <span>{customer.age} years old</span>
              {customer.gender && <span className="text-muted ms-2">({customer.gender})</span>}
            </div>
          )}
          
          <div className="mb-2">
            <i className="fas fa-map-marker-alt text-danger me-2"></i>
            <span>{getLocation()}</span>
          </div>
          
          <div className="mb-2">
            <i className="fas fa-calendar text-info me-2"></i>
            <span>Joined {formatDate(customer.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="card-footer bg-transparent border-top">
        <div className="d-grid gap-2 d-md-flex">
          <button className="btn btn-outline-primary btn-sm flex-fill">
            <i className="fas fa-eye me-1"></i>
            View Profile
          </button>
          <button className="btn btn-outline-success btn-sm flex-fill">
            <i className="fas fa-shopping-bag me-1"></i>
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;