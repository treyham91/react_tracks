import React, {useState} from "react";
import {Mutation} from 'react-apollo';
import {gql} from 'apollo-boost';
import './forms.css';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="register-container">
            <h1>Register</h1>
            <Mutation mutation={REGISTER_MUTATION}>
                {() => {
                    return (
                        <form className="register-from">
                            <div>
                                <input id="username" placeholder="username" type="text" onChange={event => setUsername(event.target.value)} />
                            </div>
                            <div>
                                <input id="email" placeholder="email" type="text" onChange={event => setEmail(event.target.value)}/>
                            </div>
                            <div>
                                <input id="password" placeholder="password" type="password" onChange={event => setPassword(event.target.value)}/>
                            </div>
                            <button type="submit">Register</button>
                            <button type="submit">Previous User? Log in here</button>
                        </form>
                     )
                 }}
            </Mutation>
        </div>
    );
};

const REGISTER_MUTATION = gql`
    mutation ($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            user {
                username
                email
            }
        }
    }
`

export default Register;