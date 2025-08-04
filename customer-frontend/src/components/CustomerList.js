import React, { useState, useEffect, useCallback } from 'react';
import CustomerCard from './CustomerCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import customerService from '../services/customerService';

const CustomerList = () => {
  // State management
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 20;

  // Fetch customers from API
  const fetchCustomers = useCallback(async (page = 0) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching customers - Page: ${page}, Size: ${pageSize}`);
      const response = await customerService.getCustomers(page, pageSize);
      
      console.log('Customers fetched:', response);
      
      setCustomers(response.customers || []);
      setFilteredCustomers(response.customers || []);
      setCurrentPage(response.currentPage || 0);
      setTotalPages(response.totalPages || 1);
      setTotalItems(response.totalItems || 0);
      
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err);
      setCustomers([]);
      setFilteredCustomers([]);
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  // Load customers on component mount
  useEffect(() => {
    fetchCustomers(0);
  }, [fetchCustomers]);

  // Handle search functionality
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredCustomers(customers);
      return;
    }

    const searchLower = term.toLowerCase();
    const filtered = customers.filter(customer => {
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      const email = customer.email.toLowerCase();
      
      return fullName.includes(searchLower) || email.includes(searchLower);
    });
    
    setFilteredCustomers(filtered);
  }, [customers]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages && newPage !== currentPage) {
      fetchCustomers(newPage);
      setSearchTerm(''); // Clear search when changing pages
    }
  };

  // Retry function
  const handleRetry = () => {
    fetchCustomers(currentPage);
  };

  // Render loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Render error state
  if (error) {
    return <ErrorMessage error={error} onRetry={handleRetry} />;
  }

  return (
    <div className="customer-list-container">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="mb-2">
            <i className="fas fa-users text-primary me-2"></i>
            Customer Directory
          </h2>
          <p className="text-muted mb-0">
            {searchTerm ? (
              <>Showing {filteredCustomers.length} results for "{searchTerm}"</>
            ) : (
              <>Showing {filteredCustomers.length} of {totalItems} customers</>
            )}
          </p>
        </div>
        <div className="col-md-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Customer Cards or Empty State */}
      {filteredCustomers.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="fas fa-search fa-4x text-muted"></i>
          </div>
          <h3 className="text-muted">No customers found</h3>
          <p className="text-muted mb-4">
            {searchTerm 
              ? `No customers match "${searchTerm}". Try adjusting your search terms.`
              : 'No customers available in the database.'
            }
          </p>
          {searchTerm && (
            <button 
              className="btn btn-primary"
              onClick={() => handleSearch('')}
            >
              <i className="fas fa-times me-2"></i>
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Customer Grid */}
          <div className="row">
            {filteredCustomers.map(customer => (
              <div key={customer.id} className="col-lg-6 col-xl-4 mb-4">
                <CustomerCard customer={customer} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {!searchTerm && totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <nav aria-label="Customer pagination">
                <ul className="pagination pagination-lg">
                  {/* Previous Button */}
                  <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                    >
                      <i className="fas fa-chevron-left me-1"></i>
                      Previous
                    </button>
                  </li>
                  
                  {/* Page Numbers */}
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = index;
                    } else if (currentPage < 3) {
                      pageNum = index;
                    } else if (currentPage > totalPages - 3) {
                      pageNum = totalPages - 5 + index;
                    } else {
                      pageNum = currentPage - 2 + index;
                    }
                    
                    if (pageNum >= totalPages || pageNum < 0) return null;
                    
                    return (
                      <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum + 1}
                        </button>
                      </li>
                    );
                  })}
                  
                  {/* Next Button */}
                  <li className={`page-item ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages - 1}
                    >
                      Next
                      <i className="fas fa-chevron-right ms-1"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerList;