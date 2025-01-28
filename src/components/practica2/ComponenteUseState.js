"use client";
import { useState, useEffect } from "react";
import React  from 'react'


export default function componente1() {
    const [cont, setCont] = useState(0);
    const [color, setColor] = useState('red');
    


  useEffect(() => {   
    cambioColor()
         
    }, [cont])

    function cambioColor(){
        if(color === 'red'){
            setColor('blue');
            document.body.style.backgroundColor = 'blue';
        }else{
            setColor('red');
            document.body.style.backgroundColor = 'red';
        }
    }

    function onClickButton(){
        setCont(cont + 1); 
    }


    return (
    <div>
        <a>Contador: {cont} </a>
        <button onClick={onClickButton} className="button1">+</button>    
    </div>
  )
}
