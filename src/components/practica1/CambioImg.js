"use client";

import { useState } from 'react'
import React from 'react'

export default function CambioImg() {
  const IMAGE1 = "https://www.softwareland.mx/img/softwareland-logo.svg";


  const [imagen1, ponImg] = useState(IMAGE1);


  const IMG2 = "https://www.svgrepo.com/show/303108/google-icon-logo.svg";


  const cliCkimg = () => {
    ponImg((prevImage) => {

      if (prevImage === IMAGE1) {
        return IMG2;
      } else {
        return IMAGE1;
      }
    });
  };

  return (
    <div>
      <img src={imagen1} alt='logo' ></img>
      <button onClick={cliCkimg}>Cambiar</button>
    </div>
  )
}
