import React, { useEffect, useState } from "react";
import Show from "./Show";
import { SuppliersModal } from "../../components/modals/SuppliersModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { apiServiceGet } from "../../API/apiService";
import { Header } from "../../assets/Header";
import PaginationControl from "../../assets/PaginationControl";

export const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

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

  const totalPages = Math.ceil(Proveedores.length / rowsPerPage);

  const visibleData = Proveedores.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
          <Header
            title="Proveedores"
            subtitle="Anota detalles sobre proveedores"
          >
            <button
              className="btn btn-primary d-inline-block"
              onClick={() => {
                setEdit(false);
                closeModal();
                setShowModal(true);
              }}
            >
              <IconPlus className="me-3" />
              Agregar proveedor
            </button>
          </Header>

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
                        <td colSpan="100%" className="text-center py-4">
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="48" // más grande
                              height="48" // más grande
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="mb-2"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-2 10.66h-6l-.117 .007a1 1 0 0 0 0 1.986l.117 .007h6l.117 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-5.99 -5l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm6 0l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" />
                            </svg>
                            <span className="fw-semibold">
                              No hay proveedores disponibles
                            </span>
                          </div>
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
            <PaginationControl
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
            />
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
