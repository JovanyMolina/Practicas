'use client'
import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, CardFooter } from "reactstrap";

export default function ComponenteAPI() {

  const [data, setData] = useState(null)


  function GetAPI() {
    fetch('https://random-data-api.com/api/v2/users?size=1&response_type=json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error))
  }


  function ViewCard() {
    if (!data) {
      return <p>No hay datos</p>
    }
    return (
      <div>
        <Card
          color="dark"
          outline
          style={{
            width: '24rem'
          }}
        >
          <CardHeader >
            <a >{data.first_name} {data.last_name}</a>
          </CardHeader>
          <img
            alt="Avatar"
            src={data.avatar}
          />
          <CardBody>
            <a><strong>ID: </strong>{data.id}</a><br />
            <a><strong>uid: </strong>{data.uid}</a><br />
            <a><strong>Usuario: </strong>{data.username}</a><br />
            <a><strong>Correo: </strong>{data.email}</a><br />
            <a><strong>Contraseña: </strong>{data.password}</a><br />
            <a><strong>Num. Tel.: </strong>{data.phone_number}</a><br />
            <a><strong>Genero: </strong>{data.gender}</a><br />
            <a><strong>numero de seguro social: </strong>{data.social_insurance_number}</a><br />
            <a><strong>Cumpleaños: </strong>{data.date_of_birth}</a><br />

            <a><strong>Empleo: </strong>
              <br />
              {data.employment.title}</a><br />
            <a>{data.employment.key_skill}</a><br />

            <a><strong>Ciudad: </strong>{data.address.city}</a><br />
            <a><strong>Calle: </strong>{data.address.street_name}</a><br />
            <a><strong>Direccion: </strong>{data.address.street_address}</a><br />
            <a><strong>CP: </strong>{data.address.zip_code}</a><br />
            <a><strong>estado: </strong>{data.address.state}</a><br />
            <a><strong>país: </strong>{data.address.country}</a><br />
            <a><strong>latitud: </strong>{data.address.coordinates.lat}</a><br />
            <a><strong>altitud : </strong>{data.address.coordinates.lng}</a><br />
            <a><strong>Tarjeta de Credito: </strong>{data.credit_card.cc_number}</a><br />



          </CardBody>
          <CardFooter>
            <strong >Suscripcion</strong><br />
            <a>Plan: {data.subscription.plan}</a><br />
            <a>Estatus: {data.subscription.status}</a><br />
            <a>Metodo de pago: {data.subscription.payment_method}</a><br />
            <a>Termina: {data.subscription.term}</a>
          </CardFooter>
        </Card>
      </div>
    )
  }




  return (
    <div>
      <Button onClick={GetAPI}>Obtener datos</Button>
      {ViewCard()}
      <Button onClick={GetAPI}>Obtener datos</Button>


    </div>
  )
}
