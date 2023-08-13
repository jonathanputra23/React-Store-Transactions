import React from 'react';
import './CheckoutModal.css'; // Import your CSS styles for the modal
import {useNavigate} from 'react-router-dom';

const CheckoutModal = ({ isOpen, onClose, checkoutSuccess }) => {
  const navigate = useNavigate();
  const handleCloseModal = () => {
    onClose();
    if (checkoutSuccess) {
      navigate('/'); // Redirect to the desired page
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        {checkoutSuccess ? (
          <>
            <h2>Checkout Successful</h2>
            <p>Your transaction has been logged.</p>
            <button onClick={handleCloseModal}>Close</button>
          </>
        ) : (
          // Display a loading message or something else if checkout is not successful
          <p>Processing...</p>
        )}
      </div>
    </div>
  );
};


export default CheckoutModal;
