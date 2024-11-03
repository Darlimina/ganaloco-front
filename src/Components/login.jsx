import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import Modal from 'react-modal';
import '../index.css'

Modal.setAppElement('#root');

function Login(){

    const Navigate = useNavigate();
    const [correo, setCorreo] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState('');

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', { correo, password });
    
        try {
          
          const response = await fetch('https://ganaloco-back-vert.vercel.app/apiv1/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, password })
          });

          const result = await response.json();
          if (result.status === "Bienvenido") {

            if(result.rol === "User"){
                //console.log(`User: ${result.user}, Role: ${result.rol}`);
                localStorage.setItem('id', result.id);
                localStorage.setItem('user', result.user);
                localStorage.setItem('role', result.rol);
                Navigate("/InfoUser");

                //onLoginSuccess(result.rol);
            } else if (result.rol === "Admin"){
                //console.log(`User: ${result.user}, Role: ${result.rol}`);
                localStorage.setItem('id', result.id);
                localStorage.setItem('user', result.user);
                localStorage.setItem('role', result.rol);
                Navigate("/infoAdmin");
                //onLoginSuccess(result.rol);
            }
            
          } else {
            //setError('Usuario o clave incorrecto');
            //if (error === null) { console.log(error) }else {console.log(error)}
            window.alert("Usuario o contraseña incorrecta");

          }
        } catch (error) {
          //console.error('Error:', error);
          window.alert("Ha ocurrido un error al consultar las credenciales.");
          //setError('Error en las credenciales');
        }
    };


    const nuevousuario = () => {
        Navigate("/NewUser")
        //window.location = 'https://gana-front.vercel.app'
    };

    return (
    <>
        <section class="text-center">
        <div class="p-5 bg-image" >
        <h5 className='fw-bold'>Bienvenidos a la Promoción Gana Loco</h5>
        </div>
        

        
                    <div class="card  mx-md-5 shadow-5-strong bg-body-tertiary" >
                        <div class="card-body py-4 px-md-5">

                                <div class="row d-flex justify-content-center">

                                    <div className="col-lg-2"> </div>
                                    
                                    <div class="col-lg-6">
                                    <h2 class="fw-bold mb-5">Iniciar Sesión</h2>
                                    <form onSubmit={handleSubmitLogin}>

                                        <div class="d-flex justify-content-center">
                                        
                                            <div className="row"> 
                                            <div data-mdb-input-init class="form-outline mb-4">
                                            <label class="form-label" htmlFor="email">Usuario</label>
                                            <input type="email" placeholder='example@ezample.com' id="email" class="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required/>
                                            </div>

                                            <div data-mdb-input-init class="form-outline mb-4">
                                            <label class="form-label" for="form3Example4">Contraseña</label>
                                            <input type="password" id="form3Example4" class="form-control" placeholder='ingresa la contraseña' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                            
                                            </div>
                                            </div>

                                        </div>

                                        <button type="submit" class="btn btn-primary btn-block mb-2"  >
                                        Ingresar
                                        </button>

                                        <div class="text-center">
                                            <p class="mb-5 pb-lg-2" >Aún no tienes una cuenta? <a href="#" onClick={nuevousuario}> ;Registrate aqui</a></p>
                                        </div>
                                    </form>

                                    </div>

                                    <div className="col-lg-2"> </div>

                                </div>

                        </div>
                    </div>


        </section>

        
    </>

    );
}

export default Login