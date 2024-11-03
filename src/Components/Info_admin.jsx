import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import '../index.css'


function InfoAdmin(){


    const USUARIO = localStorage.getItem("id"); //obtengo el (ID) del usuario autenticado  del local storage    
    if(USUARIO){
   
        const [DatosTabla1, setDatosTabla1] = useState([]);
        //const [DatosTabla2, setDatosTabla2] = useState([]);
        //const [DatosTabla3, setDatosTabla3] = useState([]);
        //const [DatosTabla4, setDatosTabla4] = useState([]); 
        const [DatosUser, setDatosUser] = useState([]);
        const [AuditLogin, setAuditLogin] = useState([]); 

        const handleLogout = () => {
            localStorage.clear();
            window.location = 'https://ganaloco-front-khaki.vercel.app'
        };

        useEffect(() => {

            const CargarTablas = async () => {
            try {
                //const iduser = localStorage.getItem("id"); //obtengo el (ID) del usuario autenticado  del local storage
                const response1 = await axios.post('https://ganaloco-back-vert.vercel.app/apiv1/info_admin_tabla1');
                setDatosTabla1(response1.data);

    

            } catch (error) {
                console.error(error);
            }
            };
            
            const CargarInfoUser = async () => {
                try {
                    const user = localStorage.getItem("user"); //obtengo el (usuario) del usuario autenticado  del local storage
                    const response2 = await axios.post('https://ganaloco-back-vert.vercel.app/apiv1/info_user', {user});
                    setDatosUser(response2.data);
                } catch (error) {
                console.error(error);
                }
            };

            const CargarAccessLogin = async () => {
                try {
                    const user = localStorage.getItem("user"); //obtengo el (usuario) del usuario autenticado  del local storage
                    const response3 = await axios.post('https://ganaloco-back-vert.vercel.app/apiv1/info_audit_users', {user});
                    setAuditLogin(response3.data);
                } catch (error) {
                console.error(error);
                }
            };

            CargarTablas();
            CargarInfoUser();
            CargarAccessLogin();
        }, []);


        return (

            <>
            <header>
                <nav id="main-navbar" class="navbar barra navbar-expand-lg navbar-light bg-white fixed-top border">
                    <div class="container-fluid">

                        <a class="navbar-brand" href="#"></a>
                        
                        <ul class="navbar-nav ms-auto d-flex flex-row">
                            <div className='pt-2 d-none d-md-flex input-group w-auto my-auto'>
                                {DatosUser.map((datauser) => ( <span className='m-2'> Bievenido: <h5 class="mb-0 text-center"> {datauser.user}  </h5> </span> )) } 
                            </div>

                            <li class="nav-item">
                                <a class="nav-link me-3 me-lg-0" href="#">
                                    <i class="fas fa-fill-drip"></i>
                                </a>
                            </li>
                            <li class="nav-item me-3 me-lg-0">
                                <a class="nav-link" href="#">
                                    <i class="fab fa-github"></i>
                                </a>
                            </li>

                            <li class="nav-item ">
                                <button className='btn btn-primary' onClick={handleLogout} > 
                                     <span>Salir</span>
                                </button>
                            </li>

                            <li class="nav-item me-3 me-lg-0">
                                <a class="nav-link" href="#">
                                    <i class="fab fa-github"></i>
                                </a>
                            </li>

                        </ul>
                    </div>
                </nav>
            </header>
            

                <main>
                    <div class="container pt-4">

                    <div className='card-body'>
                    <br />
                    </div>
                        <section class="mb-4">

                            {/* tabla 1 millon */}
                            <div class="card mt-5">
                                <div class="card-header text-center py-3">
                                    <h5 class="mb-0 text-center">
                                        <strong>Usuarios ganadores</strong>
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover text-nowrap ">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">Identificación</th>
                                                    <th scope="col">Celular</th>
                                                    <th scope="col">Código</th>
                                                    <th scope="col">Premio</th>
                                                    <th scope="col">Fecha</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                DatosTabla1.map((datospremios) => (
                                                <tr key={datospremios._id}>
                                                    <td>{datospremios.nombre}</td>
                                                    <td>{datospremios.cedula}</td>
                                                    <td>{datospremios.telefono}</td>
                                                    <td> <img src="https://img.icons8.com/?size=100&id=KbWH0mrVfjj0&format=png&color=000000" height="20" alt="" loading="lazy" /> {datospremios.codigo}</td>
                                                    <td>{datospremios.premio}</td>
                                                    <td>{datospremios.fecha}</td>
                                                </tr>
                                                )) 
                                                }
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>


                        </section>

                    </div>
                </main>
            </>
        )

    }else{
        //Se redirecciona al login si no existe una varia de usuario valida 
        window.location= 'https://ganaloco-front-khaki.vercel.app' // ruta de ront
    }
}

export default InfoAdmin