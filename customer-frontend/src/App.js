import React from 'react';
import CustomerList from './components/CustomerList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header className="bg-gradient-primary text-white py-4 mb-4 shadow">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="mb-1">
                <i className="fas fa-building me-3"></i>
                Customer Management System
              </h1>
              <p className="mb-0 opacity-75">
                Manage and view customer information with ease
              </p>
            </div>
            <div className="col-auto">
              <div className="text-end">
                <small className="opacity-75">
                  <i className="fas fa-clock me-1"></i>
                  Last updated: {new Date().toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container flex-grow-1">
        <CustomerList />
      </main>

      {/* Footer */}
      <footer className="bg-light border-top py-4 mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-muted mb-0">
                <i className="fas fa-copyright me-1"></i>
                2024 Customer Management System
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <small className="text-muted">
                Built with React & Spring Boot
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;