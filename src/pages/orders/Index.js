import React, { useState } from "react";
import Show from "./Show";
import { OrderModal } from "../../components/OrderModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/DeleteModal";

export const Index = () => {
  // DATOS ESTATICOS
  const orders = [
    {
      IDPedido: 1,
      Fecha: "23/05/2024",
      Estado: "Pendiente",
      MetodoPago: "Efectivo",
      DireccionEnvio: "Av. Bernal",
      PrecioTotal: 24.43,
      Cliente: "Pedro",
      Productos: [
        {
          NombreProducto: "Caja",
          ProductoID: 4,
          Cantidad: 21,
          PrecioUnitario: 23.23,
        },
        {
          NombreProducto: "Caja2",
          ProductoID: 5,
          Cantidad: 10,
          PrecioUnitario: 15.5,
        },
      ],
      ClienteID: 1,
    },
    {
      IDPedido: 2,
      Fecha: "23/05/2024",
      Estado: "Realizado",
      MetodoPago: "Bitcoin",
      DireccionEnvio: "Av. Bernal",
      PrecioTotal: 24.43,
      Cliente: "Mati",
      Productos: [
        {
          NombreProducto: "Caja",
          ProductoID: 1,
          Cantidad: 1,
          PrecioUnitario: 23.23,
        },
        {
          NombreProducto: "Caja2",
          ProductoID: 9,
          Cantidad: 1,
          PrecioUnitario: 15.5,
        },
      ],
      ClienteID: 2,
    },
    {
      IDPedido: 3,
      Fecha: "23/05/2024",
      Estado: "Pendiente",
      MetodoPago: "Bitcoin",
      DireccionEnvio: "Zona Rosa",
      PrecioTotal: 24.43,
      Cliente: "Duran",
      Productos: [
        {
          NombreProducto: "Pack",
          ProductoID: 3,
          Cantidad: 2,
          PrecioUnitario: 23.23,
        },
        {
          NombreProducto: "Pack2",
          ProductoID: 1,
          Cantidad: 10,
          PrecioUnitario: 15.5,
        },
      ],
      ClienteID: 3,
    },
  ];

  //CREAR/EDITAR UN PEDIDO
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setOrder({
      IDPedido: 0,
      Fecha: "",
      Estado: "",
      MetodoPago: "",
      DireccionEnvio: "",
      Cliente: "",
      PrecioTotal: 0.0,
      Productos: [],
      ClienteID: 0,
    });
    setShowModal(false);
  };
  const [order, setOrder] = useState({
    IDPedido: 0,
    Fecha: "",
    Estado: "",
    MetodoPago: "",
    DireccionEnvio: "",
    Cliente: "",
    PrecioTotal: 0.0,
    Productos: [],
    ClienteID: 0,
  });
  const [edit, setEdit] = useState(false);
  const onEdit = (orderEdit) => {
    setShowModal(true);
    setEdit(true);
    setOrder(orderEdit);
  };

  //ELIMINAR UN PEDIDO
  const [showModalDelete, setShowModalDelete] = useState(false);
  const closeModalDelete = () => {
    setOrder({
      IDPedido: 0,
      Fecha: "",
      Estado: "",
      MetodoPago: "",
      DireccionEnvio: "",
      Cliente: "",
      PrecioTotal: 0.0,
      Productos: [],
      ClienteID: 0,
    });
    setShowModalDelete(false);
  };
  const onDelete = (orderDelete) => {
    setOrder(orderDelete);
    setShowModalDelete(true);
  };

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="row row-cards">
          {/* ENCABEZADO DE PEDIDO */}
          <div className="page-header d-print-none">
            <div className="container-xl">
              <div className="row g-2 align-items-center">
                <div className="col">
                  <h2 className="page-title">Pedidos</h2>
                  <div className="page-pretitle">
                    Edita estados y completa compras
                  </div>
                </div>

                <div className="col-auto ms-auto d-print-none">
                  <div className="btn-list">
                    <button
                      className="btn btn-primary d-none d-sm-inline-block"
                      onClick={() => setShowModal(true)}
                    >
                      <IconPlus className="me-3" />
                      Agregar pedido
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABLA DE PEDIDOS */}
          <div className="col-12">
            <div className="card">
              <div className="table-responsive">
                <table
                  className="table table-vcenter card-table table-striped"
                  id="table-orders"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Método de Pago</th>
                      <th>Dirección de Envío</th>
                      <th>Cliente</th>
                      <th>Precio Total</th>
                      <th>Productos</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>No hay pedidos disponibles</tr>
                    ) : (
                      orders.map((order) => (
                        <Show
                          key={order.IDPedido}
                          order={order}
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
      <OrderModal
        show={showModal}
        closeModal={closeModal}
        isEdit={edit}
        order={order}
      />
      <DeleteModal
        show={showModalDelete}
        closeModal={closeModalDelete}
        id={order.IDPedido}
      />
    </div>
  );
};
