"use client";
import {
  faMagnifyingGlass,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { residenteSchema } from "./validacioneYUP";

export default function form() {
  const selectOptions = [
    "Ingeniería en Sistemas Computacionales",
    "Ingeniería en Tecnologías de la Información",
    "Ingeniería en Informática",
    "Ingeniería en Gestión Empresarial",
  ];
  const [dataResidentes, setDataResidentes] = useState([]);
  const [errores, setErrores] = useState({});
  const [formData, setFormData] = useState({
    id: null,
    Name: "asasas",
    LastName: "asasas asa",
    Email: "asasas@sadsd.co",
    Gender: "Masculino",
    Birthdate: "2006-02-04",
    Tel: "1234567890",
    Foto: {},
    InstitutoProcedencia: "asas asas",
    Carrera: "Ingeniería en Tecnologías de la Información",
    LenguajesDeProgramacion: [],
    Notas: "asasas",
  });
  /* 
    
          id: null,
            Name: "",
            LastName: "",
            Email: "",
            Gender: "",
            Birthdate: "",
            Tel: "",
            Foto: "",
            InstitutoProcedencia: "",
            Carrera: selectOptions[0],
            LenguajesDeProgramacion: [],
            Notas: "" */
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const toggleVisible = (user) => {
    setSelectedUser(user);
    setModalVisible(!modalVisible);
  };

  const [modalUpdate, setModalUpdate] = useState(false);
  const [selectedUserUpdate, setSelectedUserUpdate] = useState(null);
  const toggleUpdate = (user) => {
    setSelectedUserUpdate({
      ...user,
      LenguajesDeProgramacion: Array.isArray(user.LenguajesDeProgramacion)
        ? user.LenguajesDeProgramacion
        : user.LenguajesDeProgramacion.split(", "),
    });
    setModalUpdate(!modalUpdate);
  };

  const deleteData = async (id) => {
    if (!id) return;
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });
    if (!confirmDelete.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:3001/residentes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar el usuario: ${response.statusText}`);
      }

      setDataResidentes((prevData) =>
        prevData.filter((user) => user.id !== id)
      );

      /*        Swal.fire({
                       title: "¡Éxito!",
                       text: "Usuario eliminado correctamente.",
                       icon: "success",
                       confirmButtonText: "OK",
                   }); */

      toast.success("Usuario eliminado correctamente.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      Swal.fire({
        title: "Error",
        text: "Error al eliminar usuario:",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };

  const updateData = async () => {
    if (!selectedUserUpdate) return;

    console.log("Datos antes de actualizar:", selectedUserUpdate);

    const updatedUserData = {
      ...selectedUserUpdate,
      Tel: selectedUserUpdate.Tel.replace(/\D/g, ""),
      LenguajesDeProgramacion: Array.isArray(
        selectedUserUpdate.LenguajesDeProgramacion
      )
        ? selectedUserUpdate.LenguajesDeProgramacion
        : selectedUserUpdate.LenguajesDeProgramacion.split(","),
    };

    const confirmUpdate = await Swal.fire({
      title: "¿Actualizar usuario?",
      text: "¿Estás seguro de que deseas actualizar estos datos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (!confirmUpdate.isConfirmed) return;

    Swal.fire({
      title: "Actualizando...",
      text: "Por favor, espera mientras se actualizan los datos.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(
        `http://localhost:3001/residentes/${selectedUserUpdate.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUserData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error al actualizar el usuario: ${response.statusText}`
        );
      }

      const updatedUser = await response.json();

      setDataResidentes((prevData) =>
        prevData.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );

      Swal.fire({
        title: "¡Éxito!",
        text: "Los datos han sido actualizados correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setModalUpdate(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      Swal.fire({
        title: "Error",
        text: "Error al actualizar usuario",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const Change = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        return {
          ...prevData,
          LenguajesDeProgramacion: checked
            ? [...prevData.LenguajesDeProgramacion, value]
            : prevData.LenguajesDeProgramacion.filter((lang) => lang !== value),
        };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };

  const Submit = async (event) => {
    event.preventDefault();
    /*   console.log(formData);
    return; */
    try {
      await residenteSchema.validate(formData, { abortEarly: false });
      setErrores({});

      const formattedFormData = {
        ...formData,
        LenguajesDeProgramacion: Array.isArray(formData.LenguajesDeProgramacion)
          ? formData.LenguajesDeProgramacion
          : formData.LenguajesDeProgramacion.split(",").map((lang) =>
              lang.trim()
            ),
      };

      const formDataToSend = new FormData();
      formDataToSend.append("Name", formData.Name);
      formDataToSend.append("LastName", formData.LastName);
      formDataToSend.append("Email", formData.Email);
      formDataToSend.append("Gender", formData.Gender);
      formDataToSend.append("Birthdate", formData.Birthdate);
      formDataToSend.append("Tel", formData.Tel.replace(/\D/g, ""));
      formDataToSend.append(
        "InstitutoProcedencia",
        formData.InstitutoProcedencia
      );
      formDataToSend.append("Carrera", formData.Carrera);
      formDataToSend.append(
        "LenguajesDeProgramacion",
        JSON.stringify(formattedFormData.LenguajesDeProgramacion)
      );
      formDataToSend.append("Notas", formData.Notas);

      if (formData.Foto) {
        formDataToSend.append("Foto", formData.Foto);
      }

      Swal.fire({
        title: "Enviando...",
        text: "Por favor, espera mientras se procesa la información.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch("http://localhost:3001/residentes", {
        method: "POST",
        body: formDataToSend,
      });

      console.log("respose aqui :", response); // checar esto

      if (!response.ok) {
        if (response.status === 400) {
          let nuevosErrores = {};

          await response.json().detalles.forEach((err) => {
            nuevosErrores[err.path[0]] = err.message;
          });
          setErrores(nuevosErrores);

          Swal.fire({
            title: "Error en validación",
            text: "Corrige los errores antes de enviar el formulario.",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        } else {
          throw new Error("Error desconocido en el servidor.");
        }
      }

      Swal.fire({
        title: "¡Éxito!",
        text: "Datos enviados correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
      getAPIRecidentes();
      defailtForm();
      setErrores({});
    } catch (error) {
      if (error.inner) {
        let nuevosErrores = {};
        error.inner.forEach((err) => {
          nuevosErrores[err.path] = err.message;
        });
        setErrores(nuevosErrores);
      }
      Swal.fire({
        title: "Error!",
        text: "Hubo un error al procesar.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const defailtForm = () => {
    setFormData({
      id: null,
      Name: "",
      LastName: "",
      Email: "",
      Gender: "",
      Birthdate: "",
      Tel: "",
      Foto: null,
      InstitutoProcedencia: "",
      Carrera: selectOptions[0],
      LenguajesDeProgramacion: [],
      Notas: "",
    });
    document.getElementById("picture").value = "";
    document.getElementById("JavaScript").checked = false;
    document.getElementById("HTML+CSS").checked = false;
    document.getElementById("PHP").checked = false;
    document.getElementById("Python").checked = false;
    document.getElementById("C++").checked = false;
    document.getElementById("C#").checked = false;
    document.getElementById("TypeScript").checked = false;
  };

  useEffect(() => {
    getAPIRecidentes();
  }, []);

  function getAPIRecidentes() {
    fetch("http://localhost:3001/residentes")
      .then((response) => response.json())
      .then((data) => setDataResidentes(data))
      .catch((error) => console.log(error));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-3 p-3">
      <Form
        onSubmit={Submit}
        className="shadow-lg rounded-lg bg-slate-400 w-[750px] max-h-[800px] overflow-hidden p-4 mx-auto"
      >
        <h1 className="text-2xl font-bold text-black text-center mb-4">
          Formulario
        </h1>

        <Row>
          <Col md={6}>
            <FormGroup className="mb-3">
              <Label for="name">Nombre </Label>
              <Input
                id="name"
                name="Name"
                type="text"
                placeholder="Juan"
                value={formData.Name}
                onChange={Change}
                className={errores.Name ? "border-red-500" : ""}
              />
              {errores.Name && (
                <p className="text-red-500 text-sm">{errores.Name}</p>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label>Género </Label>
              <div>
                <Input
                  name="Gender"
                  type="radio"
                  value="Masculino"
                  checked={formData.Gender === "Masculino"}
                  onChange={Change}
                  className={errores.Gender ? "border-red-500" : ""}
                />{" "}
                <Label check>Masculino</Label>
              </div>
              <div>
                <Input
                  name="Gender"
                  type="radio"
                  value="Femenino"
                  checked={formData.Gender === "Femenino"}
                  onChange={Change}
                  className={errores.Gender ? "border-red-500" : ""}
                />{" "}
                <Label check>Femenino</Label>
              </div>
              {errores.Gender && (
                <p className="text-red-500 text-sm">{errores.Gender}</p>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="tel">Teléfono </Label>
              <Input
                id="tel"
                name="Tel"
                type="tel"
                placeholder="1234567890"
                value={formData.Tel}
                onChange={Change}
                className={errores.Tel ? "border-red-500" : ""}
              />
              {errores.Tel && (
                <p className="text-red-500 text-sm">{errores.Tel}</p>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="picture">Foto </Label>
              <Input
                id="picture"
                name="Foto"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  // console.log("📸 Archivo seleccionado en el frontend:", file);
                  setFormData({ ...formData, Foto: file });
                }}
                className={errores.Foto ? "border-red-500" : ""}
              />
              <FormText>Esta es una foto de perfil para el residente</FormText>
              {errores.Foto && (
                <p className="text-red-500 text-sm">{errores.Foto}</p>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="Carrera">Carrera </Label>
              <Input
                id="Carrera"
                name="Carrera"
                type="select"
                value={formData.Carrera}
                onChange={Change}
                className={errores.Carrera ? "border-red-500" : ""}
              >
                {selectOptions.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </Input>
              {errores.Carrera && (
                <p className="text-red-500 text-sm">{errores.Carrera}</p>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="notas">Notas </Label>
              <Input
                id="notas"
                name="Notas"
                type="textarea"
                value={formData.Notas}
                onChange={Change}
              />
            </FormGroup>
          </Col>

          {/* Segunda Columna */}
          <Col md={6}>
            <FormGroup className="mb-3">
              <Label for="lastName">Apellidos </Label>
              <Input
                id="lastName"
                name="LastName"
                type="text"
                placeholder="García López"
                value={formData.LastName}
                onChange={Change}
                className={errores.LastName ? "border-red-500" : ""}
              />
              {errores.LastName && (
                <p className="text-red-500 text-sm">{errores.LastName}</p>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="date">Fecha de nacimiento </Label>
              <Input
                id="date"
                name="Birthdate"
                type="date"
                value={formData.Birthdate}
                onChange={Change}
                className={errores.Birthdate ? "border-red-500" : ""}
              />
              {errores.Birthdate && (
                <p className="text-red-500 text-sm">{errores.Birthdate}</p>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="email">Correo electrónico </Label>
              <Input
                id="email"
                name="Email"
                type="email"
                placeholder="prueba123@gmail.com"
                value={formData.Email}
                onChange={Change}
                className={errores.Email ? "border-red-500" : ""}
              />
              {errores.Email && (
                <p className="text-red-500 text-sm">{errores.Email}</p>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="instituto">Instituto de procedencia </Label>
              <Input
                id="instituto"
                name="InstitutoProcedencia"
                type="text"
                placeholder="Instituto Tecnológico del Sur"
                value={formData.InstitutoProcedencia}
                onChange={Change}
                className={errores.InstitutoProcedencia ? "border-red-500" : ""}
              />
              {errores.InstitutoProcedencia && (
                <p className="text-red-500 text-sm">
                  {errores.InstitutoProcedencia}
                </p>
              )}
            </FormGroup>

            <FormGroup check>
              <Label className="block text-gray-700 font-medium">
                Lenguajes de programacion
              </Label>
              <br />
              <Row>
                <Col md={6}>
                  <Input
                    name="JavaScript"
                    id="JavaScript"
                    type="checkbox"
                    value="JavaScript"
                    onChange={Change}
                    className={
                      errores.LenguajesDeProgramacion ? "border-red-500" : ""
                    }
                  />{" "}
                  <Label check for="JavaScript">
                    JavaScript
                  </Label>
                  <Col md={6}>
                    <Input
                      name="HTML+CSS"
                      id="HTML+CSS"
                      type="checkbox"
                      value={"HTML+CSS"}
                      onChange={Change}
                      className={
                        errores.LenguajesDeProgramacion ? "border-red-500" : ""
                      }
                    />{" "}
                    <Label check for="HTML+CSS">
                      HTML+CSS
                    </Label>
                  </Col>
                  <Col md={6}>
                    <Input
                      name="PHP"
                      id="PHP"
                      type="checkbox"
                      value={"PHP"}
                      onChange={Change}
                      className={
                        errores.LenguajesDeProgramacion ? "border-red-500" : ""
                      }
                    />{" "}
                    <Label check for="PHP">
                      PHP
                    </Label>
                  </Col>
                  <Col md={5}>
                    <Input
                      name="C#"
                      id="C#"
                      type="checkbox"
                      value={"C#"}
                      onChange={Change}
                      className={
                        errores.LenguajesDeProgramacion ? "border-red-500" : ""
                      }
                    />{" "}
                    <Label check for="C#">
                      C#
                    </Label>
                  </Col>
                </Col>

                <Col md={5}>
                  <Input
                    name="TypeScript"
                    id="TypeScript"
                    type="checkbox"
                    value={"TypeScript"}
                    onChange={Change}
                    className={
                      errores.LenguajesDeProgramacion ? "border-red-500" : ""
                    }
                  />{" "}
                  <Label check for="TypeScript">
                    TypeScript
                  </Label>
                  <Col md={5}>
                    <Input
                      name="Python"
                      id="Python"
                      type="checkbox"
                      value={"Python"}
                      onChange={Change}
                      className={
                        errores.LenguajesDeProgramacion ? "border-red-500" : ""
                      }
                    />{" "}
                    <Label check for="Python">
                      Python
                    </Label>
                  </Col>
                  <Col md={5}>
                    <Input
                      name="C++"
                      id="C++"
                      type="checkbox"
                      value={"C++"}
                      onChange={Change}
                      className={
                        errores.LenguajesDeProgramacion ? "border-red-500" : ""
                      }
                    />{" "}
                    <Label check for="C++">
                      C++
                    </Label>
                  </Col>
                </Col>
              </Row>
              {errores.LenguajesDeProgramacion && (
                <p className="text-red-500 text-sm">
                  {errores.LenguajesDeProgramacion}
                </p>
              )}
            </FormGroup>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button type="submit" color="primary" className="me-3">
            Enviar
          </Button>
          <Button onClick={defailtForm} color="danger">
            Reiniciar formulario
          </Button>
          <p id="mensaje-exito" className="bg-green-500"></p>
        </div>
      </Form>

      {/******************************************************** TABLA ********************************************************/}
      <div className="w-3/4 shadow-lg p-3 rounded-lg  mt-2  bg-slate-400 ">
        <h2 className="text-2xl font-bold mb-4 text-center ">
          Tabla de residentes
        </h2>

        <Table bordered hover responsive striped size="">
          <thead>
            <tr>
              <th className="even:bg-pink-100 odd:bg-blue-50 text-gray-800">
                #
              </th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo electronico</th>
              <th>Genero</th>
              <th>Fecha de nacimiento</th>
              <th>Telefono</th>
              <th>Foto</th>
              <th>Carrera</th>
              <th>Instituto de procedencia</th>
              <th>Lenguajes de programacion</th>
              <th>Notas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataResidentes &&
              dataResidentes.map((residentes, index) => {
                return (
                  <tr key={index}>
                    {/* <td>{residentes.id}</td> */}
                    <td className="even:bg-pink-100 odd:bg-blue-50 text-gray-800">
                      {index + 1}
                    </td>
                    <td>{residentes.Name}</td>
                    <td>{residentes.LastName}</td>
                    <td>{residentes.Email}</td>
                    <td>{residentes.Gender}</td>
                    <td>{residentes.Birthdate}</td>
                    <td>{residentes.Tel}</td>
                    <td>{residentes.Foto}</td>
                    <td>{residentes.Carrera}</td>
                    <td>{residentes.InstitutoProcedencia}</td>
                    <td>{residentes.LenguajesDeProgramacion.join(", ")}</td>
                    <td>{residentes.Notas}</td>
                    <td>
                      <Button
                        className=""
                        onClick={() => toggleVisible(residentes)}
                        color="primary"
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </Button>
                      <Button
                        className=""
                        onClick={() => toggleUpdate(residentes)}
                        color="primary"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => deleteData(residentes.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      {/********************************** Modal de VIEW **************************************************************/}

      <Modal isOpen={modalVisible} toggle={() => setModalVisible(false)}>
        <ModalHeader toggle={() => setModalVisible(false)}>
          Visualizar Datos
        </ModalHeader>
        <ModalBody>
          {selectedUser ? (
            <>
              <p>
                <strong>Nombre:</strong> {selectedUser.Name}
              </p>
              <p>
                <strong>Apellidos:</strong> {selectedUser.LastName}
              </p>
              <p>
                <strong>Género:</strong> {selectedUser.Gender}
              </p>
              <p>
                <strong>Teléfono:</strong> {selectedUser.Tel}
              </p>
              <p>
                <strong>Foto:</strong> {selectedUser.Foto}
              </p>
              <p>
                <strong>Carrera:</strong> {selectedUser.Carrera}
              </p>
              <p>
                <strong>Fecha de nacimiento:</strong> {selectedUser.Birthdate}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.Email}
              </p>
              <p>
                <strong>Instituto de procedencia:</strong>{" "}
                {selectedUser.InstitutoProcedencia}
              </p>
              <p>
                <strong>Lenguajes de programación:</strong>{" "}
                {selectedUser.LenguajesDeProgramacion.join(", ")}
              </p>
              <p>
                <strong>Foto:</strong>
                <img
                  src={
                    selectedUser?.Foto && selectedUser.Foto !== "Sin Foto"
                      ? `http://localhost:3001/public/${selectedUser.Foto}`
                      : "https://img.freepik.com/psd-gratis/ilustracion-icono-contacto-aislada_23-2151903337.jpg"
                  }
                  alt="Foto"
                  width="450"
                  height="450"
                />
              </p>
            </>
          ) : (
            <p>No hay datos disponibles</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalVisible(false)}>
            Regresar
          </Button>
        </ModalFooter>
      </Modal>

      {/********************************** Modal de UPDATE **************************************************************/}

      <Modal isOpen={modalUpdate} toggle={() => setModalUpdate(false)}>
        <ModalHeader toggle={() => setModalUpdate(false)}>
          Editar Datos
        </ModalHeader>
        <ModalBody>
          {selectedUserUpdate ? (
            <Row>
              {/* Primera columna */}
              <Col md={6}>
                <FormGroup>
                  <Label for="Name">Nombre</Label>
                  <Input
                    id="Name"
                    name="Name"
                    type="text"
                    value={selectedUserUpdate.Name}
                    onChange={(e) =>
                      setSelectedUserUpdate({
                        ...selectedUserUpdate,
                        Name: e.target.value,
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="LastName">Apellidos</Label>
                  <Input
                    id="LastName"
                    name="LastName"
                    type="text"
                    value={selectedUserUpdate.LastName}
                    onChange={(e) =>
                      setSelectedUserUpdate({
                        ...selectedUserUpdate,
                        LastName: e.target.value,
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="Email">Correo Electrónico</Label>
                  <Input
                    id="Email"
                    name="Email"
                    type="email"
                    value={selectedUserUpdate.Email}
                    onChange={(e) =>
                      setSelectedUserUpdate({
                        ...selectedUserUpdate,
                        Email: e.target.value,
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="Tel">Teléfono</Label>
                  <Input
                    id="Tel"
                    name="Tel"
                    type="text"
                    value={selectedUserUpdate.Tel}
                    onChange={(e) =>
                      setSelectedUserUpdate({
                        ...selectedUserUpdate,
                        Tel: e.target.value,
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="date">Fecha de nacimiento</Label>
                  <Input
                    id="date"
                    name="Birthdate"
                    type="date"
                    onChange={(e) =>
                      setSelectedUserUpdate({
                        ...selectedUserUpdate,
                        Birthdate: e.target.value,
                      })
                    }
                    value={selectedUserUpdate.Birthdate}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="instituto">Instituto de procedencia</Label>
                  <Input
                    id="instituto"
                    name="InstitutoProcedencia"
                    type="text"
                    value={selectedUserUpdate.InstitutoProcedencia}
                    onChange={(e) =>
                      setSelectedUserUpdate({
                        ...selectedUserUpdate,
                        InstitutoProcedencia: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>

              {/* Segunda columna */}
              <Col md={6}>
                <FormGroup>
                  <Label>Género</Label>
                  <div>
                    <Input
                      name="Gender"
                      type="radio"
                      value="Masculino"
                      checked={selectedUserUpdate?.Gender === "Masculino"}
                      onChange={(e) =>
                        setSelectedUserUpdate({
                          ...selectedUserUpdate,
                          Gender: e.target.value,
                        })
                      }
                    />{" "}
                    <Label check>Masculino</Label>
                  </div>
                  <div>
                    <Input
                      name="Gender"
                      type="radio"
                      value="Femenino"
                      checked={selectedUserUpdate?.Gender === "Femenino"}
                      onChange={(e) =>
                        setSelectedUserUpdate({
                          ...selectedUserUpdate,
                          Gender: e.target.value,
                        })
                      }
                    />{" "}
                    <Label check>Femenino</Label>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label for="Carrera">Carrera</Label>
                  <Input
                    id="Carrera"
                    name="Carrera"
                    type="select"
                    value={selectedUserUpdate.Carrera || ""}
                    onChange={(e) =>
                      setSelectedUserUpdate({
                        ...selectedUserUpdate,
                        Carrera: e.target.value,
                      })
                    }
                  >
                    {selectOptions.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="notas">Notas</Label>
                  <Input
                    id="notas"
                    name="Notas"
                    type="textarea"
                    onChange={(e) =>
                      setSelectedUserUpdate({
                        ...selectedUserUpdate,
                        Notas: e.target.value,
                      })
                    }
                    value={selectedUserUpdate.Notas}
                  />
                </FormGroup>
              </Col>
            </Row>
          ) : (
            <p>No hay datos disponibles</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateData}>
            Guardar Cambios
          </Button>
          <Button color="secondary" onClick={() => setModalUpdate(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
    </div>
  );
}
