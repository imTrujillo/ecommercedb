import React from "react";
import { apiServiceDelete } from "../apiService/apiService";

export const DeleteModal = ({ show, closeModal, id, endpoint, fetchData }) => {
  const handleDelete = async () => {
    await apiServiceDelete(endpoint + id);

    closeModal();
    fetchData();
  };

  if (!show) return null;
  return (
    <div
      className="modal d-block show fade modal-blur"
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-sm modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-status bg-danger"></div>
          <div className="modal-body py-4 text-center">
            <i className="ti ti-alert-triangle text-danger display-2"></i>
            <h3>¿Estás seguro de eliminar el registro?</h3>
            <div className="text-secondary">
              Esta acción no se puede deshacer.
            </div>
          </div>
          <div className="modal-footer">
            <div className="w-100">
              <div className="row">
                <div className="col">
                  <button
                    onClick={closeModal}
                    className="btn btn-secondary w-100 d-flex items-center gap-2"
                  >
                    Cancelar
                  </button>
                </div>
                <div className="col">
                  <form className="delete-form" onSubmit={handleDelete}>
                    <input className="hidden" hidden value={id} />
                    <button
                      type="submit"
                      className="btn btn-danger w-100 flex items-center gap-2"
                    >
                      Sí, eliminar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
