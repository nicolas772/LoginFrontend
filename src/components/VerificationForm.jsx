import * as React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmSignUp } from 'aws-amplify/auth';

const VerificationForm = (props) => {
    const { username } = props
    const [confirmationCode, setConfirmationCode] = useState("");
    const [inConfirmation, setInConfirmation] = useState(true)
    const navigate = useNavigate()

    const onChangeCode = (e) => {
        const cod_verif = e.target.value;
        setConfirmationCode(cod_verif);
    };

    async function handleSignUpConfirmation() {
        try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username,
                confirmationCode
            })
            console.log(isSignUpComplete)
            console.log(nextStep)
            if (isSignUpComplete) {
                setInConfirmation(false)
            }
        } catch (error) {
            console.log('error confirming signup', error)
        }
    }
    return (
        <>
            {inConfirmation ? (
                <div className='bg-white px-10 py-20 rounded-3xl border-gray-200'>
                    <h2 className='text-4xl font-semibold'>Te enviamos un email.</h2>
                    <p className='font-medium text-lg text-gray-500 mt-4 max-w-md'>Tu código está en camino. Para iniciar sesión, ingresa el código que enviamos a tu correo. Podría tomar un minuto en llegar.</p>

                    <div className='mt-8'>
                        <div>
                            <label className='text-lg font-medium'>Código de verificación</label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder='Ingresa tu código'
                                onChange={onChangeCode}
                            />
                        </div>
                        <div className='mt-8 flex flex-col gap-y-4'>
                            <button
                                onClick={handleSignUpConfirmation}
                                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-green-700 text-white text-lg font-bold'>
                                Confirmar
                            </button>
                        </div>
                        <div className='mt-8 flex justify-center items-center'>
                            <p className='font-medium text-base'>¿No recibiste tu código?</p>
                            <button
                                onClick={() => { console.log("reenviar codigo") }}
                                className='text-green-700 text-base font-medium ml-2'>Reenviar código</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='bg-white px-10 py-20 rounded-3xl border-gray-200'>
                    <h2 className='text-4xl font-semibold'>Listo</h2>
                    <p className='font-medium text-lg text-gray-500 mt-4 max-w-md'>Tu verificación ha sido exitosa.</p>

                    <div className='mt-8'>
                        
                        <div className='mt-8 flex justify-center items-center'>
                            <button
                                onClick={() => { navigate('/login') }}
                                className='text-green-700 text-base font-medium ml-2'>Iniciar Sesión</button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default VerificationForm