import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../registrouser.css'

function RegistroUser(){
    const [nombre, setnombre] = useState('');
    const [fechaN, setfechaN] = useState('');
    const [celular, setcelular] = useState('');
    const [correo, setcorreo] = useState('');
    const [password, setPassword] = useState('');
    const [cedula, setcedula] = useState('');
    const [ciudad, setciudad] = useState('');
    const [error, setError] = useState('');
    const GoTo = useNavigate();

    const handleClickSubmit = async (e) => {
        e.preventDefault("datos");
        //console.log('Form submitted:', { nombre, fechaN, correo, password, celular, cedula, ciudad });

        try {
            const response = await fetch('https://ganaloco-back-vert.vercel.app/apiv1/new_user', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, fechaN, correo, password, celular, cedula, ciudad})
            });

            //validación del resultado que nos trae el backend
            const result = await response.json();
            if(result){ 
                window.alert(result.status);
                GoTo("/");
            }else{}
            
        } catch (error) {
            console.error('Error:', error);
            setError('Internal server error ');
        }
    }


    return (

        <>

            <header>

                <div class="container-fluid px-1 py-5 mx-auto">
                    <div class="row d-flex justify-content-center">
                        <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                            <h3>Registro de Usuarios</h3>
                            <p class="blue-text">Por favor ingresa todos los datos solicitados.</p>
                            <div class="card">
                                <h5 class="text-center mb-4">Formulario de registro</h5>
                                <form class="form-card" onSubmit={handleClickSubmit}>
                                    <div class="row justify-content-between text-left">
                                        <div class="form-group col-sm-6 flex-column d-flex"> 
                                            <label class="form-control-label px-3" htmlFor="nombre">Nombre completo<span class="text-danger"> *</span></label> 
                                            <input type="text" id="nombre" name="nombre" placeholder="Escriba su nombre" onChange={(e) => setnombre(e.target.value)} required minLength="5"/> </div>

                                        <div class="form-group col-sm-6 flex-column d-flex"> 
                                            <label class="form-control-label px-3" htmlFor="fecha">Fecha de nacimiento<span class="text-danger"> *</span></label> 
                                            <input type="date" id="fecha" name="fecha" onChange={(e) => setfechaN(e.target.value)} required /> </div>
                                    </div>
                                    <div class="row justify-content-between text-left">
                                        <div class="form-group col-sm-6 flex-column d-flex"> 
                                            <label class="form-control-label px-3" htmlFor="correo">Correo electronico<span class="text-danger"> *</span></label> 
                                            <input type="text" id="correo" name="coreo" placeholder="example@example.com" onChange={(e) => setcorreo(e.target.value)} required minLength="5"/> </div>

                                        <div class="form-group col-sm-6 flex-column d-flex"> 
                                            <label class="form-control-label px-3" htmlFor="telefono">Teléfono celular<span class="text-danger"> *</span></label> 
                                            <input type="number" id="telefono" name="telefono" placeholder="Escriba su número de celular" onChange={(e) => setcelular(e.target.value)} required /> </div>
                                    </div>

                                    <div class="row justify-content-between text-left">
                                        <div class="form-group col-sm-6 flex-column d-flex"> 
                                            <label class="form-control-label px-3" htmlFor="cedula">Cedula<span class="text-danger"> *</span></label> 
                                            <input type="number" id="cedula" name="cedula" placeholder="Escriba su número de cedula" onChange={(e) => setcedula(e.target.value)} required/> </div>

                                        <div class="form-group col-sm-6 flex-column d-flex"> 
                                            <label class="form-control-label px-3" htmlFor="ciudad">Ciudad de residencia<span class="text-danger"> *</span></label> 
                                            <input type="text" id="ciudad" name="ciudad" placeholder="Ciudad de residencia" onChange={(e) => setciudad(e.target.value)} required minLength="4"/> </div>
                                    </div>

                                    <div class="row justify-content-between text-left">
                                        <div class="form-group col-sm-6 flex-column d-flex">
                                            <label class="form-control-label px-3" htmlFor="pass">Contraseña<span class="text-danger" > *</span></label> 
                                            <input type="password" id="pass"  name="pass" placeholder="*********"  onChange={(e) => setPassword(e.target.value)} required /> </div>

                                        <div class="form-group col-sm-6 pt-4"> <button type="submit" class="btn btn-primary">Registrarse</button> 
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </header>
        </>

    )
}

export default RegistroUser