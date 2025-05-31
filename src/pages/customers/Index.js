import React, { useEffect, useState } from "react";
import Show from "./Show";
import { CustomerModal } from "../../components/CustomerModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/DeleteModal";
import { apiServiceGet } from "../../apiService/apiService";

export const Index = () => {
  //LLAMAR LA API
  const [customers, setCustomers] = useState([]);
  const fetchData = async () => {
    const cust = await apiServiceGet("Clientes");
    setCustomers(cust); 
  };
  useEffect(() => {
    fetchData();
  }, []);
  // DATOS ESTATICOS
  // const customers = [
  //   {
  //     id: "1",
  //     nombre: "Mati",
  //     telefono: "+503 7364 6423",
  //     email: "example@example1.com",
  //     direccion: "Av. Bernal",
  //   },
  //   {
  //     id: "2",
  //     nombre: "Santi",
  //     telefono: "+503 6450 5134",
  //     email: "example@example2.com",
  //     direccion: "Av. Bernal",
  //   },
  //   {
  //     id: "3",
  //     nombre: "Milli",
  //     telefono: "+503 9784 2534",
  //     email: "example@example3.com",
  //     direccion: "Av. Bernal",
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
          <div className="page-header d-print-none">
            <div className="container-xl">
              <div className="row g-2 align-items-center">
                <div className="col">
                  <h2 className="page-title">Clientes</h2>
                  <div className="page-pretitle">
                    Agrega y administra clientes
                  </div>
                </div>

                <div className="col-auto ms-auto d-print-none">
                  <div className="btn-list">
                    <button
                      className="btn btn-primary d-none d-sm-inline-block"
                      onClick={() => setShowModal(true)}
                    >
                      <IconPlus className="me-3" />
                      Agregar cliente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                      <tr><td colSpan="4" className="text-center">
                          No hay clientes disponibles
                        </td></tr>
                    ) : (
                      customers.map((customer) => (
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
