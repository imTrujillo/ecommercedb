import React, { useEffect, useState } from "react";
import Show from "./Show";
import { CategoryModal } from "../../components/modals/CategoryModal";
import { IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { apiServiceGet } from "../../API/apiService";
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
                              No hay categorías disponibles
                            </span>
                          </div>
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
