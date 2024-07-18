import React, { useState } from 'react'
import logo from "../logo/logo.png"
import useLogin from '../hooks/useLogin'

const Login = () => {
    const [inputs, setinputs] = useState({
        userName: "",
        password: ""
    })
    const { login } = useLogin();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(inputs);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='login'>
                <div className='login__image'>
                    <img className='login__image__img' src={logo} alt="Chat Logo" />
                </div>
                <div className='login__container'>
                    <p className='login__container__text' >Login into your account</p>
                    <input className='login__container__input'
                        placeholder='Enter username'
                        type="text"
                        value={inputs.userName}
                        onChange={(e) => { setinputs({ ...inputs, userName: e.target.value }) }}
                    />

                    <input className='login__container__input'
                        placeholder='Enter password'
                        type="password"
                        value={inputs.password}
                        onChange={(e) => { setinputs({ ...inputs, password: e.target.value }) }}
                    />

                    <button className='login__container__button' type='submit'>Login</button>
                </div>
            </div>
        </form>

    )
}

export default Login;