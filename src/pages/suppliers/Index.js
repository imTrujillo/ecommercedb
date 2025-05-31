import React, { useEffect, useState } from "react";
import Show from "./Show";
import { SuppliersModal } from "../../components/SuppliersModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/DeleteModal";
import { apiServiceGet } from "../../apiService/apiService";

export const Index = () => {
  //LLAMAR LA API
  const [Proveedores, setProveedores] = useState([]);

  const fetchData = async () => {
  try {
    const sups = await apiServiceGet("Proveedores");
    setProveedores(sups);
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
  }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // DATOS ESTATICOS
  // const Proveedores = [
  //   {
  //     id: "1",
  //     nombre: "Universidad1",
  //     telefono: "+503 1234 5678",
  //     email: "example@example.com",
  //   },
  //   {
  //     id: "2",
  //     nombre: "Universidad2",
  //     telefono: "+503 1234 5678",
  //     email: "example@example.com",
  //   },
  //   {
  //     id: "3",
  //     nombre: "Universidad3",
  //     telefono: "+503 1234 5678",
  //     email: "example@example.com",
  //   },
  // ];

  //CREAR/EDITAR UN PROVEEDOR
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setSupplier({
      id: 0,
      nombre: "",
      telefono: "",
      email: "",
    });
    setShowModal(false);
  };
  const [supplier, setSupplier] = useState({
    id: 0,
    nombre: "",
    telefono: "",
    email: "",
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
      id: 0,
      nombre: "",
      telefono: "",
      email: "",
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
                      onClick={() => {
                        setEdit(false); 
                        closeModal();
                        setShowModal(true)}}
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
                  id="table-Proveedores"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>nombre</th>
                      <th>telefono</th>
                      <th>email</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Proveedores.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center"> {/* Ajusta colSpan según tus columnas */}
                          No hay clientes disponibles
                        </td>
                      </tr>
                    ) : (
                      Proveedores.map((supplier) => (
                        <Show
                          key={supplier.id}
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
        fetchData={fetchData}
      />
      <DeleteModal
        show={showModalDelete}
        closeModal={closeModalDelete}
        id={supplier.id}
        endpoint="Proveedores/proveedor/delete/"
        fetchData={fetchData}
      />
    </div>
  );
};
