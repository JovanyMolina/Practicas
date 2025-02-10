"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

import {
  Input,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Button,
  Modal,
  FormFeedback,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from "reactstrap";



export default function ComponenteFormulario(args) {



  //////////////

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modalEdit, setModalEdit] = useState(false);
  const toggleEdit = () => setModalEdit(!modalEdit);

  const [botonActivo, setBotonActivo] = useState(false);
  const [buttonEditActive, setButtonEditActive] = useState(false);


  const [formEnviado, setFormEnviado] = useState(false);
  const [registerData, setRegisterData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);



  //////////
  const defaultForm = {
    name: "",
    apellidos: "",
    email: "",
    password: "",
    edad: 1,
    genero: false,
    rol: "",
    opcion1: false,
    opcion2: false,
    notas: "",
    fechaDeRegistro: "",
  };

  const selectOptions = ["desarrollador", "proyect manager", "CEO", "tester", "Practicante"]




  const [datosFormulario, setDatosFormularios] = useState(defaultForm);

  const cambio = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosFormularios({
      ...datosFormulario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  function ReiniciarFormulario() {
    setDatosFormularios(defaultForm);
    setFormEnviado(false);
  }

  const elSumitForm = (e) => {
    e.preventDefault();
    console.log(datosFormulario);
    setFormEnviado(true);

  };
  useEffect(() => {
    if (
      datosFormulario.name &&
      datosFormulario.email &&
      datosFormulario.password &&
      datosFormulario.edad &&
      datosFormulario.genero &&
      datosFormulario.rol &&
      datosFormulario.notas &&
      datosFormulario.fechaDeRegistro
    ) {
      setBotonActivo(true);
      setButtonEditActive(true);
    } else {
      setBotonActivo(false);
      setFormEnviado(false);
      setButtonEditActive(false);
    }
  }, [datosFormulario]);

  /////////////////////////////
  const guardarDatos = () => {
    // setRegistros([...registerData, datosFormulario]);

    if (editIndex !== null) {

      const nuevosRegistros = [...registerData];
      nuevosRegistros[editIndex] = datosFormulario;
      setRegisterData(nuevosRegistros);
      setModalEdit(false);
    } else if (
      datosFormulario.name === "" ||
      datosFormulario.apellidos === "" ||
      datosFormulario.email === "" ||
      datosFormulario.password === "" ||
      datosFormulario.edad === "" ||
      datosFormulario.genero === "" ||
      datosFormulario.rol === "" ||
      datosFormulario.notas === "" ||
      datosFormulario.fechaDeRegistro === ""

    ) {
      alert("Debe llenar todos los campos");
    }
    else {
      setRegisterData([...registerData, datosFormulario]);

    }

    ReiniciarFormulario();
  }

  const eliminarDatos = (index) => {
    const nuevosRegistros = [...registerData];
    nuevosRegistros.splice(index, 1);
    setRegisterData(nuevosRegistros);
  }

  const editarRegistro = (index) => {
    setDatosFormularios(registerData[index]);
    setEditIndex(index);
    setModalEdit(true);
  };
  const cancelarEdicion = () => {
    ReiniciarFormulario();
    setModalEdit(false);
  }

  /////////////////////////////
  return (
    <div>

      <Form onSubmit={elSumitForm} className="FormularioRegistro">
        <h1 className="TituloFormulario">Formulario de registro</h1>
        <Row>
          <Col md={6}>

            <FormGroup>
              <Label className="LanelFormulario" for="exampleName">Nombre</Label>
              <div>
                {" "}
                <Input
                  name="name"
                  value={datosFormulario.name}
                  onChange={cambio}
                  valid={datosFormulario.name.match(/^[a-zA-Z]+$/)}
                  invalid={datosFormulario.name.match(/^[0-9!¡"#$%&¿?(){}=]+$/)}
                />
                <FormFeedback>Solo se permiten letras</FormFeedback>
              </div>


              <Label className="LanelFormulario" for="exampleEmail">Email</Label>
              <Input
                id="exampleEmail"
                name="email"
                type="email"
                onChange={cambio}
                value={datosFormulario.email}
                valid={datosFormulario.email.match(
                  /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
                )}
                invalid={datosFormulario.email != "" && !datosFormulario.email.match(
                  /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
                )}
              />
              <FormFeedback>Debe tener formato de Correo Electronico</FormFeedback>



            </FormGroup>
            <Label className="LanelFormulario" for="exampleDatetime">edad</Label>
            <Input
              name="edad"
              placeholder="edad"
              type="number"
              onChange={cambio}
              //                defaultValue={1}
              value={datosFormulario.edad}
              min="0"
              max="100"
              valid={datosFormulario.edad > 0 && datosFormulario.edad <= 100}

              invalid={
                datosFormulario.edad !== "" && (isNaN(datosFormulario.edad) || datosFormulario.edad <= 0 || datosFormulario.edad > 100)
              }
            />
            <FormFeedback>Solo acepta números positivos, hasta el número 100 (No letras ni simbolos)</FormFeedback>
          </Col>

          <Col md={6}>
            <Label className="LanelFormulario" for="exampleName">Apeliidos</Label>
            <div>
              {" "}
              <Input
                name="apellidos"
                value={datosFormulario.apellidos}
                onChange={cambio}
                valid={datosFormulario.apellidos.match(/^[a-zA-Z]+$/)}
                invalid={datosFormulario.apellidos.match(/^[0-9!¡"#$%&¿?(){}=]+$/)}
              />
              <FormFeedback>Solo se permiten letras</FormFeedback>
            </div>

            <FormGroup>
              <Label className="LanelFormulario" for="examplePassword">Contraseña</Label>
              <Input
                id="examplePassword"
                name="password"
                type="password"
                min={6}
                max={15}
                onChange={cambio}
                value={datosFormulario.password}
              />

              <FormGroup>
                <Label className="LanelFormulario" for="exampleSelect">Rol</Label>
                <Input
                  id="exampleSelect"
                  name="rol"
                  value={datosFormulario.rol}
                  onChange={cambio}
                  type="select"

                >
                  {selectOptions.map((option, index) => (
                    <option key={index}>{option}</option>

                  ))}

                </Input>
              </FormGroup>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="LanelFormulario" for="exampleText">Notas</Label>
              <Input
                id="exampleText"
                name="notas"
                value={datosFormulario.notas}
                onChange={cambio}
                type="textarea"
              />
            </FormGroup>

            <FormGroup>
              <Label className="LanelFormulario" for="exampleDate">Fecha de registro</Label>
              <Input
                id="exampleDate"
                name="fechaDeRegistro"
                placeholder="date placeholder"
                type="date"
                onChange={cambio}
                value={datosFormulario.fechaDeRegistro}
                min={new Date().toISOString().split("T")[0]}
                valid={
                  datosFormulario.fechaDeRegistro >= new Date().toISOString().split("T")[0]
                }
                invalid={
                  datosFormulario.fechaDeRegistro !== "" &&
                  datosFormulario.fechaDeRegistro < new Date().toISOString().split("T")[0]
                }
              />
              <FormFeedback>
                La fecha debe ser igual o posterior al día de hoy.
              </FormFeedback>
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup check>
              <label className="LanelFormulario">
                <h6>Opciones</h6>
              </label>
              <div> </div>
              <Input
                type="checkbox"
                name="opcion1"
                value="opcion 1"
                onChange={cambio}
                checked={datosFormulario.opcion1}
              />{" "}
              <Label check>opcion 1</Label>
            </FormGroup>

            <FormGroup check>
              <Input
                type="checkbox"
                name="opcion2"
                value="opcion 2"
                onChange={cambio}
                checked={datosFormulario.opcion2}
              />{" "}
              <Label check>opcion 2</Label>
            </FormGroup>

            <FormGroup check>

              <label>
                <h6 className="LanelFormulario">Genero</h6>
              </label>
              <div> </div>
              <Input
                name="genero"
                type="radio"
                value="Masculino"
                checked={datosFormulario.genero === "Masculino"}
                onChange={cambio}
              />{" "}
              <Label check>Masculino</Label>
            </FormGroup>
            <FormGroup check>
              <Input
                name="genero"
                type="radio"
                value="Femenino"
                checked={datosFormulario.genero === "Femenino"}
                onChange={cambio}
              />{" "}
              <Label check>Femenino</Label>
            </FormGroup>


          </Col>
        </Row>


        <div className="px-3 ">
          <Button className="m-2" type="submit" disabled={!botonActivo} color="primary">Enviar</Button>
          <Button className="m-2" onClick={toggle} disabled={!formEnviado} color="success">Mostrar</Button>
          <Button className="m-2" onClick={ReiniciarFormulario} color="danger">Reiniciar Formulario </Button>
          <Button className="m-2" onClick={guardarDatos} color="warning" disabled={!buttonEditActive}>Guardar</Button>
        </div>

        { /**************************************************************************************************/}
        <Modal isOpen={modalEdit} toggle={toggleEdit}>
          <ModalHeader >Editar Registro</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Nombre</Label>
                    <Input
                      name="name"
                      value={datosFormulario.name}
                      onChange={cambio}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Apellidos</Label>
                    <Input
                      name="apellidos"
                      value={datosFormulario.apellidos}
                      onChange={cambio}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="email"
                      value={datosFormulario.email}
                      onChange={cambio}
                    />
                  </FormGroup>

                  <FormGroup check>

                    <label>
                      <h6 className="LanelFormulario">Genero</h6>
                    </label>
                    <div> </div>
                    <Input
                      name="genero"
                      type="radio"
                      value="Masculino"
                      checked={datosFormulario.genero === "Masculino"}
                      onChange={cambio}
                    />{" "}
                    <Label check>Masculino</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input
                      name="genero"
                      type="radio"
                      value="Femenino"
                      checked={datosFormulario.genero === "Femenino"}
                      onChange={cambio}
                    />{" "}
                    <Label check>Femenino</Label>
                  </FormGroup>

                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label>Rol</Label>
                    <Input
                      name="rol"
                      type="select"
                      value={datosFormulario.rol}
                      onChange={cambio}
                    >
                      <option>Admin</option>
                      <option>Operador</option>
                      <option>Caja</option>
                      <option>Supervisor</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label>Notas</Label>
                    <Input
                      name="notas"
                      type="textarea"
                      value={datosFormulario.notas}
                      onChange={cambio}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Fecha de Registro</Label>
                    <Input
                      name="fechaDeRegistro"
                      type="date"
                      value={datosFormulario.fechaDeRegistro}
                      onChange={cambio}
                    />
                  </FormGroup>

                  <FormGroup check>
                    <label className="LanelFormulario">
                      <h6>Opciones</h6>
                    </label>
                    <div> </div>
                    <Input
                      type="checkbox"
                      name="opcion1"
                      value="opcion 1"
                      onChange={cambio}
                      checked={datosFormulario.opcion1}
                    />{" "}
                    <Label check>opcion 1</Label>
                  </FormGroup>

                  <FormGroup check>
                    <Input
                      type="checkbox"
                      name="opcion2"
                      value="opcion 2"
                      onChange={cambio}
                      checked={datosFormulario.opcion2}
                    />{" "}
                    <Label check>opcion 2</Label>
                  </FormGroup>

                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={guardarDatos}>
              Guardar Cambios
            </Button>
            <Button color="danger" onClick={cancelarEdicion} >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        { /**************************************************************************************************/}
        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Registro con el useState</ModalHeader>
          <ModalBody>

            <p>Nombre: {datosFormulario.name}</p>
            <p>Apellidos: {datosFormulario.apellidos}</p>
            <p>Edad: {datosFormulario.edad}</p>
            <p>Email: {datosFormulario.email}</p>
            <p>Contraseña: {datosFormulario.password}</p>
            <p>Genero: {datosFormulario.genero}</p>
            <p>opcion1: {datosFormulario.opcion1 ? "true" : "false"}</p>
            <p>opcion2: {datosFormulario.opcion2 ? "true" : "false"}</p>
            <p>Rol: {datosFormulario.rol}</p>
            <p>Notas: {datosFormulario.notas}</p>
            <p>Fecha de Registro: {datosFormulario.fechaDeRegistro}</p>

          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Aceptar
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        { /**************************************************************************************************/}

        <h1 className="TituloFormulario">Datos Guardados</h1>

        <Table
          bordered
          borderless
          responsive
        >
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Apellidos
              </th>
              <th>
                Email
              </th>
              <th>
                Contraseña
              </th>
              <th>
                Rol
              </th>
              <th>
                Notas
              </th>
              <th>
                Opciones
              </th>
              <th>
                Genero
              </th>
              <th>
                Fecha de Registro
              </th>
              <th>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {registerData.map((registro, index) => (
              <tr key={index}>
                <td>{registro.name}</td>
                <td>{registro.apellidos}</td>
                <td>{registro.email}</td>
                <td>{registro.password}</td>
                <td>{registro.rol}</td>
                <td>{registro.notas}</td>
                <td>{registro.opcion1 ? "opcion1" : ""} {registro.opcion2 ? "opcion2" : ""}</td>
                <td>{registro.genero}</td>
                <td>{registro.fechaDeRegistro}</td>
                <td>
                  <Button className="m-2" onClick={() => editarRegistro(index)} color="primary"><FontAwesomeIcon icon={faPencil} /></Button>
                  <Button onClick={() => eliminarDatos(index)} color="danger"><FontAwesomeIcon icon={faTrash} /></Button>
                </td>
              </tr>

            ))}

          </tbody>
        </Table>


      </Form>
    </div>
  );
}
