import React, { useEffect, useState } from "react";
import Show from "./Show";
import { ProductsModal } from "../../components/modals/ProductsModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { apiServiceGet } from "../../API/apiService";
import { Header } from "../../assets/Header";
import PaginationControl from "../../assets/PaginationControl";
import { EmptyState } from "../../components/EmptyState";

export const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  //LLAMAR LA API
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const fetchData = async () => {
    const prods = await apiServiceGet("product");
    const cat = await apiServiceGet("category");
    const sup = await apiServiceGet("provider");

    setProducts(prods.products);
    setSuppliers(sup);
    setCategories(cat);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(products.length / rowsPerPage);

  const visibleData = products.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  //CREAR/EDITAR UN PRODUCTO
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setProduct({
      productId: 0,
      productName: "",
      description: "",
      price: 0,
      stock: 0,
      providerName: "",
      categoryName: "",
      categoryId: 0,
      providerId: 0,
    });
    setShowModal(false);
  };
  const [product, setProduct] = useState({
    productId: 0,
    productName: "",
    description: "",
    price: 0,
    stock: 0,
    providerName: "",
    categoryName: "",
    categoryId: 0,
    providerId: 0,
  });
  const [edit, setEdit] = useState(false);
  const onEdit = (productEdit) => {
    setShowModal(true);
    setEdit(true);
    setProduct(productEdit);
  };
  const handleModal = () => {
    setShowModal(true);
    setEdit(false);
  };

  //ELIMINAR UN PRODUCTO
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [productDelete, setProductDelete] = useState(0);
  const closeModalDelete = () => {
    setProduct({
      productId: 0,
      productName: "",
      description: "",
      price: 0,
      stock: 0,
      providerName: "",
      categoryName: "",
      categoryId: 0,
      providerId: 0,
    });
    setShowModalDelete(false);
  };
  const onDelete = (productId) => {
    setProductDelete(productId);
    setShowModalDelete(true);
  };

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="row row-cards">
          {/* ENCABEZADO DE INVENTARIO */}
          <Header title="Inventario" subtitle="Registra y elimina productos">
            <button
              className="btn btn-primary d-inline-block"
              onClick={handleModal}
            >
              <IconPlus className="me-3" />
              Agregar producto
            </button>
          </Header>

          {/* TABLA DE PRODUCTOS */}
          <div className="col-12">
            <div className="card">
              <div className="table-responsive">
                <table
                  className="table table-vcenter card-table table-striped"
                  id="table-inventary"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Categoría</th>
                      <th>Proveedor</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleData.length <= 0 ? (
                      <tr>
                        <td colSpan="100%" className="text-center py-4">
                          <EmptyState text="No hay productos disponibles." />
                        </td>
                      </tr>
                    ) : (
                      visibleData.map((product) => (
                        <Show
                          key={product.productId}
                          product={product}
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
      <ProductsModal
        show={showModal}
        closeModal={closeModal}
        isEdit={edit}
        product={product}
        suppliers={suppliers}
        categories={categories}
        fetchData={fetchData}
      />
      <DeleteModal
        show={showModalDelete}
        closeModal={closeModalDelete}
        id={productDelete}
        endpoint="product/"
        fetchData={fetchData}
      />
    </div>
  );
};
