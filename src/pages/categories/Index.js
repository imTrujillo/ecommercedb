import React, { useEffect, useState } from "react";
import Show from "./Show";
import { CategoryModal } from "../../components/CategoryModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/DeleteModal";
import { apiServiceGet } from "../../apiService/apiService";
import { Header } from "../../assets/Header";
import PaginationControl from "../../assets/PaginationControl";

export const Index = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const fetchData = async () => {
    const cat = await apiServiceGet("categorias", "");
    setCategories(cat);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(categories.length / rowsPerPage);

  const visibleData = categories.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Modal y lógica
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
  });
  const [edit, setEdit] = useState(false);
  const closeModal = () => {
    setCategory({ id: 0, nombre: "", descripcion: "" });
    setShowModal(false);
  };
  const onEdit = (categoryEdit) => {
    setShowModal(true);
    setEdit(true);
    setCategory(categoryEdit);
  };
  const handleModal = () => {
    setShowModal(true);
    setEdit(false);
  };

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
          <Header title="Categorías" subtitle="Clasifica tus productos">
            <button
              className="btn btn-primary d-inline-block"
              onClick={handleModal}
            >
              <IconPlus className="me-3" />
              Agregar categoría
            </button>
          </Header>

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
                    {visibleData.length <= 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No hay categorías disponibles
                        </td>
                      </tr>
                    ) : (
                      visibleData.map((category, index) => (
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

            <PaginationControl
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
            />
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
