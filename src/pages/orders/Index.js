import React, { useEffect, useState } from "react";
import Show from "./Show";
import { OrderModal } from "../../components/OrderModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/DeleteModal";
import { apiServiceGet } from "../../apiService/apiService";
import { ProductsOrderModal } from "../../components/ProductsOrderModal";
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
    const ords = await apiServiceGet("pedidos", "");
    const cats = await apiServiceGet("clientes", "");
    const prods = await apiServiceGet("productos", "");

    setOrders(ords);
    setCustomers(cats);
    setProducts(prods);

    const ordersWithDetailsFetched = await Promise.all(
      ords.map(async (order) => {
        const orderDetails = await apiServiceGet(
          `pedidos/${order.id}/detalles`,
          ""
        );
        return { ...order, orderDetails };
      })
    );
    setOrdersWithDetails(ordersWithDetailsFetched);
  };

  const totalPages = Math.ceil(orders.length / rowsPerPage);

  const visibleData = orders.slice(
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
                        <td colSpan="8">No hay pedidos disponibles</td>
                      </tr>
                    ) : (
                      ordersWithDetails.map((order) => (
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
