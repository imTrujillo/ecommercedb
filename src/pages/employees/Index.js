import React, { useEffect, useState } from "react";
import Show from "./Show";
import { EmployeeModal } from "../../components/modals/EmployeeModal";
import { IconCactus, IconPlus } from "@tabler/icons-react";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { apiServiceGet } from "../../API/apiService";
import { Header } from "../../assets/Header";
import PaginationControl from "../../assets/PaginationControl";

// NOTA: LA PAGINA DE EMPLEADOS POR AHORITA ES UNA COPIA DE employees,
// CUANDO SE AGREGUE EL CRUD DE EMPLEADOS, SE MODIFICARÁ EL INDEX Y EL SHOW

export const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  //LLAMAR LA API
  const [employees, setEmployees] = useState([]);
  const fetchData = async () => {
    // const cust = await apiServiceGet("employees");
    // setEmployees(cust);
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  //DATOS ESTATICOS
  useEffect(
    () =>
      setEmployees([
        {
          id: 1,
          nombreCompleto: "Juan Pérez",
          nombreUsuario: "juanp",
          email: "juan.perez@example.com",
          fechaNacimiento: "1990-05-15",
          fechaContratacion: "2018-03-20",
          nit: "0614-250395-102-3",
          direccion: "Calle 123, San Salvador",
          salario: 500.0,
        },
        {
          id: 2,
          nombreCompleto: "María López",
          nombreUsuario: "marial",
          email: "maria.lopez@example.com",
          fechaNacimiento: "1985-11-08",
          fechaContratacion: "2015-07-10",
          nit: "0614-080985-203-9",
          direccion: "Avenida Central 456, San Miguel",
          salario: 650.5,
        },
        {
          id: 3,
          nombreCompleto: "Carlos Ramírez",
          nombreUsuario: "carlosr",
          email: "carlos.ramirez@example.com",
          fechaNacimiento: "1992-01-22",
          fechaContratacion: "2019-12-01",
          nit: "0614-220192-309-7",
          direccion: "Boulevard Los Héroes, Santa Ana",
          salario: 480.75,
        },
      ]),

    []
  );

  const totalPages = Math.ceil(employees.length / rowsPerPage);

  const visibleData = employees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  //CREAR/EDITAR UN CLIENTE
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setEmployee({
      id: 0,
      nombreCompleto: "",
      nombreUsuario: "",
      email: "",
      fechaNacimiento: "",
      fechaContratacion: "",
      nit: "",
      direccion: "",
      salario: 0,
    });
    setShowModal(false);
  };
  const [employee, setEmployee] = useState({
    id: 0,
    nombreCompleto: "",
    nombreUsuario: "",
    email: "",
    fechaNacimiento: "",
    fechaContratacion: "",
    nit: "",
    direccion: "",
    salario: 0,
  });
  const [edit, setEdit] = useState(false);
  const onEdit = (employeeEdit) => {
    setShowModal(true);
    setEdit(true);
    setEmployee(employeeEdit);
  };

  //ELIMINAR UN CLIENTE
  const [showModalDelete, setShowModalDelete] = useState(false);
  const closeModalDelete = () => {
    setEmployee({
      id: 0,
      nombreCompleto: "",
      nombreUsuario: "",
      email: "",
      fechaNacimiento: "",
      fechaContratacion: "",
      nit: "",
      direccion: "",
      salario: 0,
    });
    setShowModalDelete(false);
  };
  const onDelete = (employeeDelete) => {
    setEmployee(employeeDelete);
    setShowModalDelete(true);
  };

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="row row-cards">
          {/* ENCABEZADO DE CLIENTES*/}
          <Header title="Empleados" subtitle="Agrega y administra empleados">
            <button
              className="btn btn-primary d-inline-block"
              onClick={() => setShowModal(true)}
            >
              <IconPlus className="me-3" />
              Agregar empleado
            </button>
          </Header>

          {/* TABLA DE CLIENTES */}
          <div className="col-12">
            <div className="card">
              <div className="table-responsive">
                <table
                  className="table table-vcenter card-table table-striped"
                  id="table-employees"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>nombre completo</th>
                      <th>nombre de usuario</th>
                      <th>email</th>
                      <th>fecha de nacimiento</th>
                      <th>fecha de contratación</th>
                      <th>nit</th>
                      <th>dirección</th>
                      <th>salario</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length <= 0 ? (
                      <tr>
                        <td colSpan="100%" className="text-center py-4">
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <IconCactus />
                            <span className="fw-semibold">
                              Aquí aparecerán los empleados (en proceso...)
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      visibleData.map((employee) => (
                        <Show
                          key={employee.id}
                          employee={employee}
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
      <EmployeeModal
        show={showModal}
        closeModal={closeModal}
        isEdit={edit}
        employee={employee}
        fetchData={fetchData}
      />
      <DeleteModal
        show={showModalDelete}
        closeModal={closeModalDelete}
        id={employee.id}
        endpoint="Clientes/cliente/delete/"
        fetchData={fetchData}
      />
    </div>
  );
};
