"use client"
import React, { useState } from 'react';
import { Table, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faStar, faPalette, faFeather, faSliders } from '@fortawesome/free-solid-svg-icons';
import PruebaJson from '@/components/practica4/pruebaJson'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Componente1(args) {
    const icons = {
        faHouse: faHouse,
        faStar: faStar,
        faPalette: faPalette,
        faFeather: faFeather,
        faSliders: faSliders,
      };
      const meses={
        "01" : "Enero"

      };

      const [modal, setModal] = useState(false);
      const toggle = () => setModal(!modal);

      const random = Math.floor(Math.random() * 200) + 1;





      
    return (
        <Table
            bordered
            borderless
            size=""
            striped
        >
            <thead>
                <tr>
                    <th>
                        No.
                    </th>
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>
                    <th>
                        Icono
                    </th>
                    <th>
                        Botones
                    </th>
                </tr>
            </thead>
            <tbody>
                {PruebaJson.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{item["No"]}</th>
                        <td>{item.FirtName}</td>
                        <td>{item.LastName}</td>
                        <td>
                        <FontAwesomeIcon icon={icons[item.Icono]} />
                        </td>
                        <td>
                            <Button color="secondary" onClick={toggle} >{item.Botones || "secondary"}</Button>
                            <Modal isOpen={modal} toggle={toggle} {...args}>
                            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                            <ModalBody>
                               
                            <img src={`https://picsum.photos/200/${random}`} alt="imagen aleatoria"  />
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={toggle}>
                                Do Something
                            </Button>{' '}
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                            </ModalFooter>
                            </Modal>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}




/*
export default function Componente1() {
    return (
        <Table
            bordered
            borderless
            size=""
            striped
        >
            <thead>
                <tr>
                    <th>
                        No.
                    </th>
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>
                    <th>
                        Icono
                    </th>
                    <th>
                        Botones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">
                        1
                    </th>
                    <td>
                        Mark
                    </td>
                    <td>
                        Otto
                    </td>
                    <td>
                    <FontAwesomeIcon icon={faHouse} />                    
                    </td>
                    <td>
                    <Button color="success">    success  </Button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        2
                    </th>
                    <td>
                        Jacob
                    </td>
                    <td>
                        Thornton
                    </td>
                    <td>
                    <FontAwesomeIcon icon={faStar} />                    
                    </td>   
                    <td>
                    <Button color="success">    success  </Button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        3
                    </th>
                    <td>
                        Larry
                    </td>
                    <td>
                        the Bird
                    </td>
                    <td>
                        <FontAwesomeIcon icon={faPalette} />
                    </td>
                    <td>
                    <Button color="success">    success  </Button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        4
                    </th>
                    <td>
                        Larry
                    </td>
                    <td>
                        the Bird
                    </td>
                    <td>
                    <FontAwesomeIcon icon={faFeather} />  
                    </td>
                    <td>
                    <Button color="success">    success  </Button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        5
                    </th>
                    <td>
                        Larry
                    </td>
                    <td>
                        the Bird
                    </td>
                    <td>
                    <FontAwesomeIcon icon={faSliders} />
                    </td>
                    <td>
                    <Button color="success">    success  </Button>
                    </td>
                </tr>
            </tbody>
        </Table>
        
    )
}
*/


