import { createRef, useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';



//funcion principal
export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores, setErrores] = useState([])
    //Mandar a llamar la constante desde el hook el useAuth tiene alojado el middleware y la url 
    const { login } = useAuth({
        middleware: 'guest', 
        url: '/'
    });
    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        //llamamos a la funcion login creada en el js y con el return la retornamos para poder utilizarla 
        login(datos,setErrores)
    }

  return (
    <>
    <h1 className="text-4xl font-black">Iniciar sesión</h1>
    <p>Para crear un pedido debes iniciar sesión</p>

    <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form 
            onClick={handleSubmit}
            noValidate
        >
            {errores ? errores.map(error => <Alerta key={error}>{error}</Alerta>) : null}
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

            <input 
            type="submit" 
            value="Iniciar sesión"
            className="bg-indigo-600 hober:bg-indigo-800 text-white text-center w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg"
            />

        </form>
    </div>
    <nav className="mt-5">
        <Link to="/auth/registro">
            ¿No tienes cuenta? Crea una 
        </Link>
    </nav>
    </>
  )
}
