import * as React from 'react'
import { useState } from 'react';
import { signUp as awsSignUp } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerif, setPasswordVerif] = useState("");
    const navigate = useNavigate()

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangePasswordVerif = (e) => {
        const passwordVerif = e.target.value;
        setPasswordVerif(passwordVerif);
    };

    async function handleSignUp() {
        try {
            const { isSignUpComplete, userId, nextStep } = await awsSignUp({
                username,
                password,
            });
            console.log(userId);
            console.log(isSignUpComplete)
            console.log(nextStep)
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    return (
        <div className='bg-white px-10 py-20 rounded-3xl border-gray-200'>
            <h1 className='text-5xl font-semibold'>Registrate</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Ingresa tus datos para crear tu sesión.</p>
            <div className="border-t-2 border-gray-200 my-8"></div>
            <div className='mt-8'>
                <div>
                    <label className='text-lg font-medium'>Email</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu correo electrónico'
                        onChange={onChangeUsername}
                    />
                </div>
                <div>
                    <label className='text-lg font-medium'>Contraseña</label>
                    <input
                        type='password'
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu contraseña'
                        onChange={onChangePassword}
                    />
                </div>
                <div>
                    <label className='text-lg font-medium'>Verificar Contraseña</label>
                    <input
                        type='password'
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu contraseña nuevamente'
                        onChange={onChangePasswordVerif}
                    />
                </div>
                <div className='mt-8 flex flex-col gap-y-4'>
                    <button
                        onClick={handleSignUp}
                        className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-green-700 text-white text-lg font-bold'>
                        Registrarse
                    </button>
                </div>
                <div className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base'>¿Ya tienes una cuenta?</p>
                    <button
                        onClick={() => { navigate("/login") }}
                        className='text-green-700 text-base font-medium ml-2'>Inicia sesión</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm