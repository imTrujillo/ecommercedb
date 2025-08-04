import React, { useEffect, useState } from "react";
import Show from "./Show";
import { OrderModal } from "../../components/modals/OrderModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { apiServiceGet } from "../../API/apiService";
import { ProductsOrderModal } from "../../components/modals/ProductsOrderModal";
import { Header } from "../../assets/Header";
import PaginationControl from "../../assets/PaginationControl";

export const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [orders, setOrders] = useState([]);
  const [ordersWithDetails, setOrdersWithDetails] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const ords = await apiServiceGet("pedidos");
    const cats = await apiServiceGet("clientes");
    const prods = await apiServiceGet("productos");

    setOrders(ords);
    setCustomers(cats);
    setProducts(prods);

    const ordersWithDetailsFetched = await Promise.all(
      ords.map(async (order) => {
        const orderDetails = await apiServiceGet(
          `pedidos/${order.id}/detalles`
        );
        return { ...order, orderDetails };
      })
    );
    setOrdersWithDetails(ordersWithDetailsFetched);
  };

  const totalPages = Math.ceil(ordersWithDetails.length / rowsPerPage);

  const visibleData = ordersWithDetails.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    fetchData();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [orderProducts, setOrderProducts] = useState([]);
  const [productsModal, setProductsModal] = useState(false);

  const openProductsModal = (products) => {
    setOrderProducts(products);
    setProductsModal(true);
  };
  const closeProductsModal = () => {
    setOrderProducts([]);
    setProductsModal(false);
  };

  const closeModal = () => {
    setOrder({
      id: 0,
      fecha: new Date(),
      estado: "Pendiente",
      metodoPago: "",
      direccionEnvio: "",
      clienteId: 0,
      detalles: [],
    });
    setEdit(false);
    setShowModal(false);
  };

  const [order, setOrder] = useState({
    id: 0,
    fecha: "",
    estado: "",
    metodoPago: "",
    direccionEnvio: "",
    clienteId: 0,
  });
  const [edit, setEdit] = useState(false);
  const onEdit = (orderEdit) => {
    setShowModal(true);
    setEdit(true);
    setOrder(orderEdit);
  };

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [orderDelete, setOrderDelete] = useState(0);
  const closeModalDelete = () => {
    setOrder({
      id: 0,
      fecha: "",
      estado: "",
      metodoPago: "",
      direccionEnvio: "",
      clienteId: 0,
      detalles: [],
    });
    setOrderDelete(0);
    setShowModalDelete(false);
  };
  const onDelete = (orderId) => {
    setOrderDelete(orderId);
    setShowModalDelete(true);
  };

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="row row-cards">
          {/* ENCABEZADO DE PEDIDO */}
          <Header title="Pedidos" subtitle="Edita estados y completa compras">
            <button
              className="btn btn-primary d-inline-block"
              onClick={() => setShowModal(true)}
            >
              <IconPlus className="me-3" />
              Agregar pedido
            </button>
          </Header>

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
                      <th>Productos</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersWithDetails.length === 0 ? (
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
                              No hay pedidos disponibles
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      visibleData.map((order) => (
                        <Show
                          key={order.id}
                          openProductsModal={openProductsModal}
                          order={order}
                          customers={customers}
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
      <OrderModal
        show={showModal}
        closeModal={closeModal}
        isEdit={edit}
        order={order}
        orderDetails={ordersWithDetails}
        products={products}
        customers={customers}
        fetchData={fetchData}
      />
      <DeleteModal
        show={showModalDelete}
        closeModal={closeModalDelete}
        id={orderDelete}
        endpoint="pedidos/delete/"
        fetchData={fetchData}
      />
      <ProductsOrderModal
        show={productsModal}
        closeProductsModal={closeProductsModal}
        orderDetails={orderProducts}
        products={products}
      />
    </div>
  );
};
