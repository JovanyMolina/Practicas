"use client";
import React, {useState } from "react";
import { Button, Toast, ToastBody, ToastHeader } from "reactstrap";

export default function Componente1() {
   const [estado,enviarEstado] = useState(false);

    function cambiarEstado(){
        enviarEstado(!estado);
    }
    

  return (
    <div>
      <div>
        <Button color="primary" onClick={cambiarEstado}>
          Click toast
        </Button>
        <br />
        <br />
        <Toast isOpen={estado}>
          <ToastHeader  icon="primary" toggle={cambiarEstado}>
            Toast title
          </ToastHeader>
          <ToastBody className="p-3 bg-primary my-2 rounded">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ToastBody>
        </Toast>
      </div>
    </div>
  );
}
