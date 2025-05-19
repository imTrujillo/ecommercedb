import React, { useState } from "react";
import Show from "./Show";
import { SuppliersModal } from "../../components/SuppliersModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/DeleteModal";

export const Index = () => {
  // DATOS ESTATICOS
  const suppliers = [
    {
      IDProveedor: "1",
      NombreProveedor: "Universidad1",
      Teléfono: "+503 1234 5678",
      Email: "example@example.com",
    },
    {
      IDProveedor: "2",
      NombreProveedor: "Universidad2",
      Teléfono: "+503 1234 5678",
      Email: "example@example.com",
    },
    {
      IDProveedor: "3",
      NombreProveedor: "Universidad3",
      Teléfono: "+503 1234 5678",
      Email: "example@example.com",
    },
  ];

  //CREAR/EDITAR UN PROVEEDOR
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setSupplier({
      IDProveedor: 0,
      NombreProveedor: "",
      Teléfono: "",
      Email: "",
    });
    setShowModal(false);
  };
  const [supplier, setSupplier] = useState({
    IDProveedor: 0,
    NombreProveedor: "",
    Teléfono: "",
    Email: "",
  });
  const [edit, setEdit] = useState(false);
  const onEdit = (supplierEdit) => {
    setShowModal(true);
    setEdit(true);
    setSupplier(supplierEdit);
  };

  //ELIMINAR UN PROVEEDOR
  const [showModalDelete, setShowModalDelete] = useState(false);
  const closeModalDelete = () => {
    setSupplier({
      IDProveedor: 0,
      NombreProveedor: "",
      Teléfono: "",
      Email: "",
    });
    setShowModalDelete(false);
  };
  const onDelete = (supplierDelete) => {
    setSupplier(supplierDelete);
    setShowModalDelete(true);
  };

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="row row-cards">
          {/* ENCABEZADO DE PROVEEDOR */}
          <div className="page-header d-print-none">
            <div className="container-xl">
              <div className="row g-2 align-items-center">
                <div className="col">
                  <h2 className="page-title">Proveedores</h2>
                  <div className="page-pretitle">
                    Anota detalles sobre proveedores
                  </div>
                </div>

                <div className="col-auto ms-auto d-print-none">
                  <div className="btn-list">
                    <button
                      className="btn btn-primary d-none d-sm-inline-block"
                      onClick={() => setShowModal(true)}
                    >
                      <IconPlus className="me-3" />
                      Agregar proveedor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABLA DE PROVEEDORES */}
          <div className="col-12">
            <div className="card">
              <div className="table-responsive">
                <table
                  className="table table-vcenter card-table table-striped"
                  id="table-suppliers"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Nombre</th>
                      <th>Teléfono</th>
                      <th>Email</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.length === 0 ? (
                      <div>No hay proveedores disponibles</div>
                    ) : (
                      suppliers.map((supplier) => (
                        <Show
                          key={supplier.IDProveedor}
                          supplier={supplier}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuppliersModal
        show={showModal}
        closeModal={closeModal}
        isEdit={edit}
        supplier={supplier}
      />
      <DeleteModal
        show={showModalDelete}
        closeModal={closeModalDelete}
        id={supplier.IDProveedor}
      />
    </div>
  );
};
