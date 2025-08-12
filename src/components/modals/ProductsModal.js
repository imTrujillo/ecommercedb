import React, { useEffect, useState } from "react";
import {
  apiServiceGet,
  apiServicePost,
  apiServiceUpdate,
} from "../../API/apiService";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input";

export const ProductsModal = ({
  show,
  closeModal,
  isEdit,
  product,
  fetchData,
  suppliers,
  categories,
}) => {
  // VALIDACIONES CON YUP
  const productSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "min 3 caracteres")
      .required("requerido")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "sin caracteres especiales"
      ),
    descripcion: Yup.string()
      .min(10, "min 10 caracteres")
      .required("requerido")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "sin caracteres especiales"
      ),
    precio: Yup.number()
      .typeError("debe ser número")
      .positive("min $0.01")
      .required("requerido"),
    stock: Yup.number()
      .typeError("debe ser número")
      .integer("debe ser número entero")
      .min(0, "min 0")
      .required("requerido"),
    categoriaId: Yup.string().required("requerido"),
    proveedorId: Yup.string().required("requerido"),
  });

  //Utilizar yup para validar formulario
  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      id: 0,
      nombre: "",
      descripcion: "",
      precio: 0.0,
      stock: 0,
      categoriaId: "",
      proveedorId: "",
    },
  });

  useEffect(() => {
    if (product) {
      methods.reset({
        id: product.id || 0,
        nombre: product.nombre || "",
        descripcion: product.descripcion || "",
        precio: product.precio || 0,
        stock: product.stock || 0,
        categoriaId: product.categoriaId.toString() || "",
        proveedorId: product.proveedorId.toString() || "",
      });
    }
  }, [product]);

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (isEdit) {
        await apiServiceUpdate(`Productos/update/${product.id}`, {
          ...data,
          id: product.id,
        });
      } else {
        await apiServicePost("Productos", data);
      }
      closeModal();
      fetchData();
      toast.success(isEdit ? "¡Producto actualizado!" : "¡Producto agregado!");
      console.log(data);
    } catch (err) {
      console.error("Error al guardar el producto:", err);
      toast.error("Error al guardar el producto. Intenta de nuevo.");
    }
  });

  //Datos de cada input
  const nombreValidation = {
    id: "nombre",
    label: "Nombre",
    type: "text",
    name: "nombre",
    placeholder: "Producto 01",
  };

  const descripcionValidation = {
    id: "descripcion",
    label: "Descripción",
    type: "textarea",
    name: "descripcion",
    placeholder: "Descripcion de Producto 01",
  };

  const precioValidation = {
    id: "precio",
    label: "Precio",
    type: "number",
    name: "precio",
    placeholder: "99.99",
    step: 0.01,
  };

  const stockValidation = {
    id: "stock",
    label: "Cantidad",
    type: "number",
    name: "stock",
    placeholder: "99",
    setp: 1,
  };

  const categoriaValidation = (categories) => ({
    id: "categoriaId",
    label: "Categoría",
    type: "select",
    name: "categoriaId",
    options: categories,
  });

  const proveedorValidation = (suppliers) => ({
    id: "proveedorId",
    label: "Proveedor",
    type: "select",
    name: "proveedorId",
    options: suppliers,
  });

  if (!show) return null;

  return (
    <div
      className="modal d-block show fade modal-blur"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg">
        <FormProvider {...methods}>
          <form noValidate onSubmit={onSubmit}>
            {isEdit && <input type="hidden" name="id" value={product.id} />}

            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEdit ? "Editar Producto" : "Agregar Producto"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-5">
                    <Input {...nombreValidation} />
                  </div>
                  <div className="col-7">
                    <Input {...descripcionValidation} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <Input {...precioValidation} />
                  </div>
                  <div className="col-6">
                    <Input {...stockValidation} />
                  </div>

                  <div className="row mb-3">
                    <div className="col-5">
                      <Input {...categoriaValidation(categories)} />
                    </div>
                    <div className="col-7">
                      <Input {...proveedorValidation(suppliers)} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEdit ? "Editar" : "Guardar"}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
