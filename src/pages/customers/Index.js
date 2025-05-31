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
      IDCliente: "",
      NombreCliente: "",
      Teléfono: "",
      Email: "",
      Dirección: "",
    });
    setShowModal(false);
  };
  const [customer, setCustomer] = useState({
    IDCliente: "",
    NombreCliente: "",
    Teléfono: "",
    Email: "",
    Dirección: "",
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
      IDCliente: "",
      NombreCliente: "",
      Teléfono: "",
      Email: "",
      Dirección: "",
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
                      <th>Nombre</th>
                      <th>Teléfono</th>
                      <th>Email</th>
                      <th>Dirección</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.length === 0 ? (
                      <tr>No hay clientes disponibles</tr>
                    ) : (
                      customers.map((customer) => (
                        <Show
                          key={customer.IDCliente}
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
        id={customer.IDCliente}
        endpoint="customers/"
        fetchData={fetchData}
      />
    </div>
  );
};
