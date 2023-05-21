import { Modal } from '@mui/material';
import * as React from 'react';

function ModalCustom({
  data = { title: '', children: null, labelPrimary: '', labelSecond: '' },
  handleClose,
  handlePrimary,
}) {
  return (
    <Modal open={open} onClose={handleClose} className="center">
      <div className="card w-75">
        <div className="between border-bottom border-muted p-3">
          <h5 className="modal-title" id="staticBackdropLabel">
            {data.title}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          />
        </div>
        <div className="modal-body p-3">{data.children}</div>
        {(handleClose || handlePrimary) && (
          <div className="modal-footer p-3 border-top border-muted ">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}>
              {data.labelSecond}
            </button>
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={handlePrimary}>
              {data.labelPrimary}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ModalCustom;
