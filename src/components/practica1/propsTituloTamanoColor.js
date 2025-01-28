import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function propsTituloParrafoImg(props) {
  return (
    <div className='C2' style={{
        fontFamily: props.fontFamily,
        fontSize: props.fontSize,
        color: props.color
    }}>
      <h1>Componente dos Fuentes</h1>
      <a>Tamaño del texto</a>
      <p>Color del texto</p>
    </div>
  )
}
  