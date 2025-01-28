import React from 'react'

export default function practicaUno(props) {
  return (
    <div>
      <h1>Componente 1</h1>
      <p>Nombre: {props.name}</p>
      <p>Apellido: {props.lastname}</p>
      <p>Edad: {props.years}</p>
    </div>
  )
}
