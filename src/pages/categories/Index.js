import React, { useEffect, useState } from "react";
import Show from "./Show";
import { CategoryModal } from "../../components/CategoryModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/DeleteModal";
import { apiServiceGet } from "../../apiService/apiService";

export const Index = () => {
  //LLAMAR LA API
  const [categories, setCategories] = useState([]);
  const fetchData = async () => {
    const cat = await apiServiceGet("categorias", "");
    setCategories(cat);
  };
  useEffect(() => {
    fetchData();
  }, []);

  //     IDCategoria: "1",
  //     NombreCategoria: "Prueba1",
  //     Descripción: "Descripción de prueba",
  //   },
  //   {
  //     IDCategoria: "2",
  //     NombreCategoria: "Prueba2",
  //     Descripción: "Descripción de prueba",
  //   },
  //   {
  //     IDCategoria: "3",
  //     NombreCategoria: "Prueba3",
  //     Descripción: "Descripción de prueba",
  //   },
  // ];

  //CREAR/EDITAR UNA CATEGORIA
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setCategory({
      id: 0,
      nombre: "",
      descripcion: "",
    });
    setShowModal(false);
  };
  const [category, setCategory] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
  });
  const [edit, setEdit] = useState(false);
  const onEdit = (categoryEdit) => {
    setShowModal(true);
    setEdit(true);
    setCategory(categoryEdit);
  };
  const handleModal = () => {
    setShowModal(true);
    setEdit(false);
  };
  //ELIMINAR UNA CATEGORIA
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [categoryDelete, setCategoryDelete] = useState(0);
  const closeModalDelete = () => {
    setShowModalDelete(false);
    setCategoryDelete(0);
  };
  const onDelete = (categoryId) => {
    setShowModalDelete(true);
    setCategoryDelete(categoryId);
  };

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="row row-cards">
          {/* ENCABEZADO DE CATEOGRIAS */}
          <div className="page-header d-print-none">
            <div className="container-xl">
              <div className="row g-2 align-items-center">
                <div className="col">
                  <h2 className="page-title">Categorías</h2>
                  <div className="page-pretitle">Clasifica tus productos</div>
                </div>

                <div className="col-auto ms-auto d-print-none">
                  <div className="btn-list">
                    <button
                      className="btn btn-primary d-none d-sm-inline-block"
                      onClick={handleModal}
                    >
                      <IconPlus className="me-3" />
                      Agregar categoría
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABLA DE CATEGORIAS */}
          <div className="col-12">
            <div className="card">
              <div className="table-responsive">
                <table
                  className="table table-vcenter card-table table-striped"
                  id="table-categories"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length <= 0 ? (
                      <div>No hay categorías disponibles</div>
                    ) : (
                      categories.map((category) => (
                        <Show
                          key={category.id}
                          category={category}
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
      <CategoryModal
        show={showModal}
        closeModal={closeModal}
        isEdit={edit}
        category={category}
        fetchData={fetchData}
      />
      <DeleteModal
        show={showModalDelete}
        closeModal={closeModalDelete}
        id={categoryDelete}
        endpoint="categorias/categoria/delete/"
        fetchData={fetchData}
      />
    </div>
  );
};
