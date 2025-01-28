import React from 'react'
import ComponenteParrafo from '@/components/practica1/componenteParrafo'
import ComponenteTitulo from '@/components/practica1/componenteTitulo'
import PracticaUno from '@/components/practica1/propsBasico'
import PropsTituloParrafoImg from '@/components/practica1/propsTituloTamanoColor'
import ComponenteImg from '@/components/practica1/ComponenteImg'
import styles from './pagina1.module.css';


export default function practica() {
  return (
    <div className={styles.pagina1background}>
      <ComponenteParrafo />
      <ComponenteTitulo />
      <PracticaUno name="Lupe" lastname="Mendoza" years="26"/>
      <PracticaUno name="Armando" lastname="Garcia" years="45"/>
      <PropsTituloParrafoImg fontFamily="Segoe UI"  fontSize="20"  color="blue"/>
      <PropsTituloParrafoImg fontFamily="Arial"  fontSize="15"  color="red"/>
      <ComponenteImg />



    </div>
  )
}
  