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
    const cust = apiServiceGet("customers");
    setCustomers(cust);
  };
  useEffect(() => {
    fetchData();
  }, []);
  // DATOS ESTATICOS
  // const customers = [
  //   {
  //     IDCliente: "1",
  //     NombreCliente: "Mati",
  //     Teléfono: "+503 7364 6423",
  //     Email: "example@example1.com",
  //     Dirección: "Av. Bernal",
  //   },
  //   {
  //     IDCliente: "2",
  //     NombreCliente: "Santi",
  //     Teléfono: "+503 6450 5134",
  //     Email: "example@example2.com",
  //     Dirección: "Av. Bernal",
  //   },
  //   {
  //     IDCliente: "3",
  //     NombreCliente: "Milli",
  //     Teléfono: "+503 9784 2534",
  //     Email: "example@example3.com",
  //     Dirección: "Av. Bernal",
  //   },
  // ];

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
                    {customers.length === 0 ? (
                      <tr>No hay clientes disponibles</tr>
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
