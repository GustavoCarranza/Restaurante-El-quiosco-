<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistroRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //Metodo para registrar usuario 
    public function register(RegistroRequest $request)
    {
        //Validar registro
        $data = $request->validated();
        //Crear usuario 
        $user = User::create([
            'name' => $data['name'], 
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        //Retornar respuesta
        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ];
    }
    //Metodo para iniciar sesion
    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        //revisa el password

        if(!Auth::attempt($data)){
            return response([
                'errors' => ['El email o el password son incorrectos']
            ],422);
        }
        //Autenticar al usuario
        $user = Auth::user();
        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ];
    }
    //Metodo para cerrar
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return[
            'user' => null
        ];
    }
}
