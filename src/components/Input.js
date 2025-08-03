import style from "../css/Auth.module.css";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";

export const Input = ({
  label = "",
  type = "text",
  id = "",
  name = "",
  placeholder = "",
  icon = null,
  isAuthInput = false,
  options = [],
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);

  //Se selecciona un input, select o textarea según "type"
  const renderInput = () => {
    if (type === "select") {
      return (
        <select
          id={id}
          name={name}
          className="form-control"
          {...register(name)}
        >
          {options.map((optionValue, index) => (
            <option key={index} value={optionValue}>
              {optionValue}
            </option>
          ))}
        </select>
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          id={id}
          name={name}
          className="form-control"
          placeholder={placeholder}
          {...register(name)}
        />
      );
    }

    return (
      <input
        id={id}
        type={type}
        className="form-control"
        name={name}
        placeholder={placeholder}
        {...register(name)}
      />
    );
  };

  return (
    <>
      {/* Verificar si hay un label */}
      {label ? (
        isAuthInput ? (
          <label htmlFor={id}>
            <small className="text-secondary">{label}</small>
          </label>
        ) : (
          <label className="form-label required">{label}</label>
        )
      ) : (
        ""
      )}

      {/* Renderizar el input */}
      <div className="w-100 mb-3">
        <div className={isAuthInput ? style.inputGroup : ""}>
          {icon}
          {renderInput()}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Mostrar el mensaje de error abajo del input
const InputError = ({ message }) => (
  <motion.p
    className="d-flex align-items-center text-start gap-1 px-2 fw-semibold text-danger rounded-4 mt-2"
    {...framer_error}
  >
    <IconExclamationCircleFilled />
    {message}
  </motion.p>
);

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
