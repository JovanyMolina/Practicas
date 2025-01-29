"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Form, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function ComponenteFormulario(args) {
  //////////////
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [botonActivo, setBotonActivo] = useState(false);
  const [formEnviado, setFormEnviado] = useState(false);

  //////////

  const [datosFormulario, setDatosFormularios] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    edad: 0,
    genero: false,
    rol: "",
    opcion1: false,
    opcion2: false,
    notas: "",
    fechaDeRegistro: "",
  });

  const cambio = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosFormularios({
      ...datosFormulario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const elSumitForm = (e) => {
    e.preventDefault();
    console.log(datosFormulario);
    setFormEnviado(true);

    /*
    if(!datosFormulario.nombre || !datosFormulario.apellidos || !datosFormulario.email || !datosFormulario.password || !datosFormulario.edad || !datosFormulario.genero || !datosFormulario.rol ||  !datosFormulario.notas || !datosFormulario.fechaDeRegistro){
      alert("Todos los campos son obligatorios");
        return;
    }*/

   

  };
  useEffect(() => {
    if (datosFormulario.nombre && 
      datosFormulario.email && 
      datosFormulario.password && 
      datosFormulario.edad && 
      datosFormulario.genero && 
      datosFormulario.rol && 
      datosFormulario.notas && 
      datosFormulario.fechaDeRegistro) {
      setBotonActivo(true);
    } else {
      setBotonActivo(false);
      setFormEnviado(false);
    }
  }, [datosFormulario]); 

  function ReiniciarFormulario() {
    setDatosFormularios({
      nombre: "",
      apellidos: "",
      email: "",
      password: "",
      edad: 0,
      genero: false,
      rol: "",
      opcion1: false,
      opcion2: false,
      notas: "",
      fechaDeRegistro: "",
    });
    setFormEnviado(false);
  }


  return (
    <div>
      <h1>Formulario de registro</h1>
      <Form onSubmit={elSumitForm}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleName">Nombre</Label>
              <div>
                {" "}
                <Input
                  name="nombre"
                  value={datosFormulario.nombre}
                  onChange={cambio}
                />
              </div>
              <Label for="exampleName">Apeliidos</Label>
              <div>
                {" "}
                <Input
                  name="apellidos"
                  value={datosFormulario.apellidos}
                  onChange={cambio}
                />
              </div>
              <Label for="exampleEmail">Email</Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="with a placeholder"
                type="email"
                onChange={cambio}
                value={datosFormulario.email}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">Contraseña</Label>
              <Input
                id="examplePassword"
                name="password"
                type="password"
                onChange={cambio}
                value={datosFormulario.password}
              />
              <FormGroup>
                <Label for="exampleDatetime">edad</Label>
                <Input
                  name="edad"
                  placeholder="edad"
                  type="number"
                  onChange={cambio}
                  value={datosFormulario.edad}
                />
              </FormGroup>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup check>
          <label>
            <h6>Genero</h6>
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
        <FormGroup>
          <Label for="exampleSelect">Rol</Label>
          <Input
            id="exampleSelect"
            name="rol"
            value={datosFormulario.rol}
            onChange={cambio}
            type="select"
          >
            <option></option>
            <option>Admin</option>
            <option>Operador</option>
            <option>Caja</option>
            <option>Supervisor</option>
          </Input>
        </FormGroup>
        <FormGroup check>
          <label>
            <h6>Opciones</h6>
          </label>
          <div> </div>
          <Input
            type="checkbox"
            name="opcion1"
            value="opcion 1"
            onChange={cambio}
            checked={datosFormulario.opcion1  }
          />{" "}
          <Label check>opcion 1</Label>
        </FormGroup>
        <FormGroup check>
          <Input
            type="checkbox"
            name="opcion2"
            value="opcion 2"
            onChange={cambio}
            checked={datosFormulario.opcion2  }
          />{" "}
          <Label check>opcion 2</Label>
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleText">Notas</Label>
              <Input
                id="exampleText"
                name="notas"
                value={datosFormulario.notas}
                onChange={cambio}
                type="textarea"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleDate">Fecha de registro</Label>
              <Input
                id="exampleDate"
                name="fechaDeRegistro"
                placeholder="date placeholder"
                type="date"
                onChange={cambio}
                value={datosFormulario.fechaDeRegistro}
              />
            </FormGroup>
          </Col>
        </Row>{" "}
        
        <Button type="submit" disabled={!botonActivo}>Enviar</Button> 
        <Button onClick={toggle} disabled={!formEnviado} >Mostrar</Button>
        <Button onClick={ReiniciarFormulario} >Reiniciar Formulario </Button> 
        
          
        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Registro con el useState</ModalHeader>
          <ModalBody>
            <p>Nombre: {datosFormulario.nombre}</p>
            <p>Apellidos: {datosFormulario.apellidos}</p>
            <p>Edad: {datosFormulario.edad}</p>
            <p>Email: {datosFormulario.email}</p>
            <p>Contraseña: {datosFormulario.password}</p>
            <p>Genero: {datosFormulario.genero}</p>
            <p>opcion1: {datosFormulario.opcion1 ? "true" : "false" }</p>
            <p>opcion2: {datosFormulario.opcion2 ? "true" : "false"}</p>
            <p>Rol: {datosFormulario.rol}</p>
            <p>Notas: {datosFormulario.notas}</p>
            <p>Fecha de Registro: {datosFormulario.fechaDeRegistro}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Aceptar
            </Button>{" "}
            <Button color="secondary"  onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    </div>
  );
}
