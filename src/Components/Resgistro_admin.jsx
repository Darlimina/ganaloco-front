import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registroadmin.css';

function NewAdmin() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const GoTo = useNavigate();

    const handleClickSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://ganaloco-back-vert.vercel.app/apiv1/New_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, password })
            });

            const result = await response.json();
            if (result) {
                window.alert(result.status);
                GoTo("/");
            } else {
                setError('Error en el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Internal server error');
        }
    };

    const handleLogout = () => {
        // Aquí puedes agregar la lógica de salida, como eliminar tokens o datos de sesión
        GoTo("/"); // Redirige a la página de inicio o a donde desees
    };

    return (
        <>
            <header>
                <div className="container-fluid px-1 py-5 mx-auto">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9 col-11 text-center">
                            <h3>Registro de Administrador</h3>
                            <div className="card">
                                <h5 className="text-center mb-4">Formulario de registro</h5>
                                <form className="form-card" onSubmit={handleClickSubmit}>
                                    <div className="row justify-content-between text-left">
                                        <div className="col-sm-2"></div>
                                        <div className="form-group col-sm-8 flex-column d-flex">
                                            
                                            <label className="form-control-label px-3" htmlFor="email">
                                                Usuario <span className="text-danger"> *</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="example@example.com"
                                                onChange={(e) => setCorreo(e.target.value)}
                                                required
                                                minLength="5"
                                            />
                                        </div>
                                        <div className="col-sm-2"></div>
                                    </div>
                                    <div className="row justify-content-between text-left mt-4">
                                        <div className="col-sm-2"></div>
                                        <div className="form-group col-sm-8 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="pass">
                                                Contraseña <span className="text-danger"> *</span>
                                            </label>
                                            <input
                                                type="password"
                                                id="pass"
                                                name="pass"
                                                placeholder="***********"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-sm-2"></div>
                                    </div>
                                    <div className="row justify-content-between text-left mt-3">
                                        <div className="col-sm-2"></div>
                                        <div className="form-group col-sm-3">
                                            <button type="submit" className="btn btn-primary">
                                                Registrarse
                                            </button>
                                        </div>
                                        <div className="col-sm-2"></div>
                                    </div>
                                </form>
                                {/* Botón de salir */}
                                <div className="row justify-content-between text-left mt-3">
                                    <div className="col-sm-2"></div>
                                    <div className="form-group col-sm-2">
                                        <button type="button" className="btn btn-secondary" onClick={handleLogout}>
                                            Salir
                                        </button>
                                    </div>
                                    <div className="col-sm-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default NewAdmin;
