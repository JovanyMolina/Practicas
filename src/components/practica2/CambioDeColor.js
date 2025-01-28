"use client";

import React from 'react'
import { useState, useEffect } from "react";


export default function componente3() {
    const [color, setColor] = useState('red');
/*
    useEffect(() => {   
         //cambioColor()

         
    }, [])
*/
    function cambioColor(){
        if(color === 'red'){
            setColor('blue');
            document.body.style.backgroundColor = 'blue';
        }else{
            setColor('red');
            document.body.style.backgroundColor = 'red';
        }
    }
   

  return (
    <div>

        <button onClick={cambioColor} className='button1'>Cambio de color de fondo</button>  
    </div>
  )
}
