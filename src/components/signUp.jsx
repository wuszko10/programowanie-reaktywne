import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [account, setAccount] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate()

    const handleChangeRoute = () => {
        navigate('/home');
        window.location.reload();
    };

    const validate = () => {
        const validationErrors = {};

        if (account.username.trim() === '') {
            validationErrors.username = 'Username is required!';
        }
        if (account.email.trim() === '') {
            validationErrors.email = 'Email is required!';
        }
        if (account.password.trim() === '') {
            validationErrors.password = 'Password is required!';
        }

        return Object.keys(validationErrors).length === 0 ? null : validationErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors || {});
        if (validationErrors) return;

        axios
            .post('http://localhost:3001/api/user/create', {
                name: account.username,
                email: account.email,
                password: account.password
            })
            .then((response) => {
                handleChangeRoute();
            })
            .catch((error) => {
                const errorMessages = {};
                errorMessages.password =
                    "Given username doesn't exist or the password is wrong!";
                setErrors(errorMessages || {});
                console.log(error);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAccount((prevAccount) => ({
            ...prevAccount,
            [name]: value
        }));
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Name</label>
                    <input
                        value={account.username}
                        name="username"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        placeholder="Username"
                    />
                    {errors.username && (
                        <div className="alert alert-danger">{errors.username}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        value={account.email}
                        name="email"
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <div className="alert alert-danger">{errors.email}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        value={account.password}
                        name="password"
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <div className="alert alert-danger">{errors.password}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    SignUp
                </button>
            </form>
        </div>
    );
};

export default SignUp;