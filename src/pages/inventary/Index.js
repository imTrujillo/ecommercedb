import React, { useState } from "react";
import Show from "./Show";
import { ProductsModal } from "../../components/ProductsModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/DeleteModal";

export const Index = () => {
  // DATOS ESTATICOS
  const products = [
    {
      IDProducto: "1",
      NombreProducto: "Prueba",
      Descripción: "Descripción de prueba",
      Precio: 24.23,
      Stock: 23,
      CategoriaID: 1,
      ProveedorID: 1,
      Categoria: "Prueba",
      Proveedor: "Universidad",
    },
    {
      IDProducto: "2",
      NombreProducto: "Prueba2",
      Descripción: "Descripción de prueba2",
      Precio: 123.12,
      Stock: 10,
      CategoriaID: 2,
      ProveedorID: 2,
      Categoria: "Prueba2",
      Proveedor: "Universidad2",
    },
    {
      IDProducto: "3",
      NombreProducto: "Prueba3",
      Descripción: "Descripción de prueba3",
      Precio: 99.99,
      Stock: 0,
      CategoriaID: 3,
      ProveedorID: 3,
      Categoria: "Prueba3",
      Proveedor: "Universidad3",
    },
  ];

  //CREAR/EDITAR UN PRODUCTO
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setProduct({
      IDProducto: 0,
      NombreProducto: "",
      Descripción: "",
      Precio: 0,
      Stock: 0,
      CategoriaID: "",
      Categoria: "",
      IDProveedor: "",
      Proveedor: "",
    });
    setShowModal(false);
  };
  const [product, setProduct] = useState({
    IDProducto: 0,
    NombreProducto: "",
    Descripción: "",
    Precio: 0,
    Stock: 0,
    CategoriaID: "",
    Categoria: "",
    IDProveedor: "",
    Proveedor: "",
  });
  const [edit, setEdit] = useState(false);
  const onEdit = (productEdit) => {
    setShowModal(true);
    setEdit(true);
    setProduct(productEdit);
  };

  //ELIMINAR UN PRODUCTO
  const [showModalDelete, setShowModalDelete] = useState(false);
  const closeModalDelete = () => {
    setProduct({
      IDProducto: 0,
      NombreProducto: "",
      Descripción: "",
      Precio: 0,
      Stock: 0,
      CategoriaID: "",
      Categoria: "",
      IDProveedor: "",
      Proveedor: "",
    });
    setShowModalDelete(false);
  };
  const onDelete = (productDelete) => {
    setProduct(productDelete);
    setShowModalDelete(true);
  };

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="row row-cards">
          {/* ENCABEZADO DE INVENTARIO */}
          <div className="page-header d-print-none">
            <div className="container-xl">
              <div className="row g-2 align-items-center">
                <div className="col">
                  <h2 className="page-title">Inventario</h2>
                  <div className="page-pretitle">
                    Registra y elimina productos
                  </div>
                </div>

                <div className="col-auto ms-auto d-print-none">
                  <div className="btn-list">
                    <button
                      className="btn btn-primary d-none d-sm-inline-block"
                      onClick={() => setShowModal(true)}
                    >
                      <IconPlus className="me-3" />
                      Agregar producto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                    {products.length === 0 ? (
                      <div>No hay productos disponibles</div>
                    ) : (
                      products.map((product) => (
                        <Show
                          key={product.IDProducto}
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
          </div>
        </div>
      </div>
      <ProductsModal
        show={showModal}
        closeModal={closeModal}
        isEdit={edit}
        product={product}
      />
      <DeleteModal
        show={showModalDelete}
        closeModal={closeModalDelete}
        id={product.IDProducto}
      />
    </div>
  );
};
