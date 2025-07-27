import React, { useEffect, useState } from "react";
import Show from "./Show";
import { CustomerModal } from "../../components/modals/CustomerModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { apiServiceGet } from "../../API/apiService";
import { Header } from "../../assets/Header";
import PaginationControl from "../../assets/PaginationControl";

export const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  //LLAMAR LA API
  const [customers, setCustomers] = useState([]);
  const fetchData = async () => {
    const cust = await apiServiceGet("Clientes");
    setCustomers(cust);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(customers.length / rowsPerPage);

  const visibleData = customers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  //CREAR/EDITAR UN CLIENTE
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setCustomer({
      id: "",
      nombre: "",
      telefono: "",
      email: "",
      direccion: "",
    });
    setShowModal(false);
  };
  const [customer, setCustomer] = useState({
    id: "",
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
  });
  const [edit, setEdit] = useState(false);
  const onEdit = (customerEdit) => {
    setShowModal(true);
    setEdit(true);
    setCustomer(customerEdit);
  };

  //ELIMINAR UN CLIENTE
  const [showModalDelete, setShowModalDelete] = useState(false);
  const closeModalDelete = () => {
    setCustomer({
      id: "",
      nombre: "",
      telefono: "",
      email: "",
      direccion: "",
    });
    setShowModalDelete(false);
  };
  const onDelete = (customerDelete) => {
    setCustomer(customerDelete);
    setShowModalDelete(true);
  };

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="row row-cards">
          {/* ENCABEZADO DE CLIENTES*/}
          <Header title="Clientes" subtitle="Agrega y administra clientes">
            <button
              className="btn btn-primary d-inline-block"
              onClick={() => setShowModal(true)}
            >
              <IconPlus className="me-3" />
              Agregar cliente
            </button>
          </Header>

          {/* TABLA DE CLIENTES */}
          <div className="col-12">
            <div className="card">
              <div className="table-responsive">
                <table
                  className="table table-vcenter card-table table-striped"
                  id="table-customers"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>nombre</th>
                      <th>telefono</th>
                      <th>email</th>
                      <th>direccion</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleData.length === 0 ? (
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
                              No hay clientes disponibles
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      visibleData.map((customer) => (
                        <Show
                          key={customer.id}
                          customer={customer}
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
      <CustomerModal
        show={showModal}
        closeModal={closeModal}
        isEdit={edit}
        customer={customer}
        fetchData={fetchData}
      />
      <DeleteModal
        show={showModalDelete}
        closeModal={closeModalDelete}
        id={customer.id}
        endpoint="Clientes/cliente/delete/"
        fetchData={fetchData}
      />
    </div>
  );
};
