import { createRef, useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([])
    const {registro} = useAuth({middleware: 'guest', url: '/'})

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        registro(datos,setErrores)
    }
  return (
    <>
    <h1 className="text-4xl font-black">Crea tu cuenta</h1>
    <p>Crea tu cuenta llenando el formulario</p>

    <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form 
            onSubmit={handleSubmit}
            noValidate
        >
        {errores ? errores.map(error => <Alerta key={error}>{error}</Alerta>) : null}
            <div className="mb-4">
                <label 
                htmlFor="name"
                className="text-slate-800">
                Nombre: 
                </label>
                <input 
                    type="text" 
                    className="mt-2 w-full p-3 bg-gray-100"
                    name="name"
                    id="name"
                    placeholder="Tu nombre"
                    ref={nameRef}
                
                />
            </div>

            <div className="mb-4">
                <label 
                htmlFor="email"
                className="text-slate-800">
                Email: 
                </label>
                <input 
                    type="email" 
                    className="mt-2 w-full p-3 bg-gray-100"
                    name="email"
                    id="email"
                    placeholder="Tu email"
                    ref={emailRef}
                
                />
            </div>

            <div className="mb-4">
                <label 
                htmlFor="password"
                className="text-slate-800">
                Password: 
                </label>
                <input 
                    type="password" 
                    className="mt-2 w-full p-3 bg-gray-100"
                    name="password"
                    id="password"
                    placeholder="Tu password"
                    ref={passwordRef}
                
                />
            </div>

            <div className="mb-4">
                <label 
                htmlFor="password_confirmation"
                className="text-slate-800">
                Confirmar password: 
                </label>
                <input 
                    type="password" 
                    className="mt-2 w-full p-3 bg-gray-100"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="Confirmar password"
                    ref={passwordConfirmationRef}
                
                />
            </div>

            <input 
            type="submit" 
            value="Crear cuenta"
            className="bg-indigo-600 hober:bg-indigo-800 text-white text-center w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg"
            />

        </form>
    </div>
    <nav className="mt-5">
        <Link to="/auth/login">
            ¿Ya tienes cuenta? Inicia sesión
        </Link>
    </nav>
    </>
  )
}
