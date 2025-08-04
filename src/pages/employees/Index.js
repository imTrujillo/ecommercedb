import React, { useEffect, useState } from "react";
import Show from "./Show";
import { EmployeeModal } from "../../components/modals/EmployeeModal";
import { IconCactus, IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { apiServiceGet } from "../../API/apiService";
import { Header } from "../../assets/Header";
import PaginationControl from "../../assets/PaginationControl";

// NOTA: LA PAGINA DE EMPLEADOS POR AHORITA ES UNA COPIA DE CUSTOMERS,
// CUANDO SE AGREGUE EL CRUD DE EMPLEADOS, SE MODIFICARÁ EL INDEX Y EL SHOW

export const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  //LLAMAR LA API
  const [customers, setCustomers] = useState([]);
  const fetchData = async () => {
    const cust = await apiServiceGet("customers");
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
          <Header title="Empleados" subtitle="Agrega y administra empleados">
            <button
              className="btn btn-primary d-inline-block"
              onClick={() => setShowModal(true)}
            >
              <IconPlus className="me-3" />
              Agregar empleado
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
                      <th>nombre completo</th>
                      <th>nombre de usuario</th>
                      <th>email</th>
                      <th>fecha de nacimiento</th>
                      <th>fecha de contratación</th>
                      <th>nit</th>
                      <th>dirección</th>
                      <th>salario</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.length <= 0 ? (
                      <tr>
                        <td colSpan="100%" className="text-center py-4">
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <IconCactus />
                            <span className="fw-semibold">
                              Aquí aparecerán los empleados (en proceso...)
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
      <EmployeeModal
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
