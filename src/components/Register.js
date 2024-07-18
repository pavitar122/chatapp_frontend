import React, { useState } from 'react'
import logo from "../logo/logo.png"
import { Link } from 'react-router-dom'
import useSignup from '../hooks/useSignup';

const Register = () => {

    const { signup } = useSignup();
    const [inputs, setinputs] = useState({
        fullName: "",
        userName: "",
        password: "",
        cpassword: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='login'>
                <div className='login__image'>
                    <img className='login__image__img' src={logo} alt="Chat Logo" />
                </div>
                <div className='login__container'>
                    <p className='login__container__text' >Create yor account.</p>
                    <input className='login__container__input'
                        placeholder='Enter Fullname'
                        type="text"
                        value={inputs.fullName}
                        onChange={(e) => { setinputs({ ...inputs, fullName: e.target.value }) }}

                    />

                    <input className='login__container__input'
                        placeholder='Enter Username'
                        type="text"
                        value={inputs.userName}
                        onChange={(e) => { setinputs({ ...inputs, userName: e.target.value }) }}

                    />

                    <input className='login__container__input'
                        placeholder='Enter Password'
                        type="password"
                        value={inputs.password}
                        onChange={(e) => { setinputs({ ...inputs, password: e.target.value }) }}

                    />
                    <input className='login__container__input'
                        placeholder='Confirm Password'
                        type="password"
                        value={inputs.cpassword}
                        onChange={(e) => { setinputs({ ...inputs, cpassword: e.target.value }) }}
                    />

                    <button className='login__container__button' type='submit'>Register</button>
                    <p className='login__container__link'>Already have an account <Link to={"/login"} >Login</Link></p>
                </div>
            </div>
        </form>
    )
}

export default Register