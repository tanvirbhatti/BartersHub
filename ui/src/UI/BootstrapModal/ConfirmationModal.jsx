import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <>
      {isOpen && (
        <div>
          <div className="modal-backdrop show"></div>
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title col-md-11">Confirmation</h5>
                  <button type="button" className="close btn btn-danger col-md-1" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{message}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={onConfirm}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
