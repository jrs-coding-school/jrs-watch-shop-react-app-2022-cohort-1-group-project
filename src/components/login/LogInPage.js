import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { useApi } from '../../services/axios.service'
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../../services/localStorage.service';
import  '../login/LogInPage.css'

export default function LogInPage() {

    return (
        <div className="login">
            <br />
            <br />
            <LogInForm />
            <hr />
            <Link to="/signup">
                <button type="button">Sign Up</button>
            </Link>
        </div>
    )
}

function LogInForm() {

    const navigate = useNavigate();
    const animationTime = 300;
    const http = useApi();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const localStorageService = useLocalStorage();

    function handleChange(e) {
        var name = e.target.name;
        var value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (user.email && user.password) {
            http.login(user)
                .then(res => {
                    // 200 -> login successful
                    console.log(res);
                    localStorageService.saveUser(res.data.user);
                    // navigate(`/user/${res.data.user.id}`);
                    navigate(`/`);
                }).catch(err => {
                    console.error(err)

                    emailRef.current.classList.add("shake");
                    passwordRef.current.classList.add("shake");

                    setUser({ email: '', password: '' });

                    setTimeout(() => {
                        emailRef.current.classList.remove("shake");
                        passwordRef.current.classList.remove("shake");
                    }, animationTime);
                });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className='label'>Email:</label>
            <input type="text"
                ref={emailRef}
                name="email"
                value={user.email}
                style={{ "--animationTime": `${animationTime}ms` }}
                onChange={handleChange} />
            <br />

            <label className='label'>Password:</label>
            <input type="password"
                ref={passwordRef}
                name="password"
                value={user.password}
                style={{ "--animationTime": `${animationTime}ms` }}
                onChange={handleChange} />
            <br />

            <button type="submit">Log In</button>
        </form>
    )
}