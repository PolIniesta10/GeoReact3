import React, { useContext } from 'react'
import { UserContext } from '../userContext';
import { useLogin } from '../hooks/useLogin';
import { useForm } from "react-hook-form";

export const Login = ({ setLogin }) => {

  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);



const { register, handleSubmit, formState: { errors } } = useForm();

  const { doLogin, error, setError } = useLogin()
  const onSubmit = data => doLogin(data)

    
  return (
    
   <section
   className="absolute top-1/2 left-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
   

    <div x-show="!isLoginPage" className="space-y-4">
                <header className="mb-3 text-2xl font-bold">Log in</header>
                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Email or username" 
                    
                    {...register("email")}
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                {errors.email && <p>{errors.email.message}</p>}

                <div
                    className="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="password" placeholder="Password" 
                   
                    {...register("password")}
                        className="my-3 w-full border-none bg-transparent outline-none" />
                    <a href="#" className="font-medium text-gray-400 hover:text-gray-500">FORGOT?</a>
                </div>
                {errors.password && <p>{errors.password.message}</p>}

                {/* { error ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">{error}</div>) : (<></>)  } */}
                <button 
                // onClick={ () => { doLogin(formState) }}
                onClick={handleSubmit(onSubmit)}

                    className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
                    LOG IN
                </button>
            </div>

            {/* <div className="flex items-center space-x-4">
                <hr className="w-full border border-gray-300" />
                <div className="font-semibold text-gray-400">OR</div>
                <hr className="w-full border border-gray-300" />
            </div> */}

            <footer>
                {/* <div className="grid grid-cols-2 gap-4">
                    <a href="#"
                        className="rounded-2xl border-b-2 border-b-gray-300 bg-white py-2.5 px-4 font-bold text-blue-700 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200">GITHUB</a>
                    <a href="#"
                        className="rounded-2xl border-b-2 border-b-gray-300 bg-white py-2.5 px-4 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200">GOOGLE</a>
                </div> */}

                <div className="mt-8 text-sm text-gray-400">
                    By signing in to ********, you agree to our
                    <a href="#" className="font-medium text-gray-500">Terms</a> and
                    <a href="#" className="font-medium text-gray-500">Privacy Policy</a>.
                </div>
                <div className="mt-8 text-sm text-gray-400">
                    <button onClick={ ()=> setLogin(false) } className="underline">Not registered ?</button>
                </div>
            </footer>
   </section>
    
    
    
    
    
  )
}
