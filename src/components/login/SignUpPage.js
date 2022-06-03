import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApi } from '../../services/axios.service'
import { useLocalStorage } from '../../services/localStorage.service';
import './SignUpPage.css'

export default function SignUpPage() {

    const navigate = useNavigate();
    const http = useApi();
    const localStorageService = useLocalStorage();

    function attemptSignUp(user) {
        http.createNewUser(user)
            .then(res => {
                const user = res.data.user;
                localStorageService.saveUser(user);
                navigate(`/`);
            }).catch(err => {
                console.error(err);
            });
    }

    return (
        <div className="login-button-signup">
            <br />
            <br />
            <SignUpForm onSubmit={attemptSignUp} />
            <hr />
            <Link to="/">
                <button type="button">Log In</button>
            </Link>
        </div>
    )
}

function SignUpForm({ onSubmit }) {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [isEmailTaken, setIsEmailTaken] = useState(true);

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
            onSubmit(user);
        }
    }

    return (
        
        
        <form onSubmit={handleSubmit}>
            <div>
                {isEmailTaken && <div className="error-message"></div>}
                <label className='email-label'>Email:</label>
                <input type="text"
                    className={isEmailTaken ? 'email-taken' : ''}
                    name="email"
                    required
                    value={user.email}
                    onChange={handleChange} />
            <br />

            <label >Password:</label>
            <input type="password"
                name="password"
                value={user.password}
                onChange={handleChange} />
                </div>

            <button className='submit-button' type="submit"
                disabled={!user.email || !user.password}>Sign Up</button>
        </form>
        
    )
    
}