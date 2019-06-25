import React, {useState} from "react";
import {Mutation} from 'react-apollo';
import {gql} from 'apollo-boost';
import './forms.css';


function setVisibility(open) {
    let visibility = 'hidden';
    if (open === true) {
        visibility = 'visible'
    }

    else {
        visibility = 'hidden';
    }

    return visibility;
}

function Register({setNewUser}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = (event, createUser) => {
        event.preventDefault();
        createUser()
    }

    return (
        <div className="register-container">
            <h1>Register</h1>
            <Mutation mutation={REGISTER_MUTATION}
                      variables={{username, email, password}}
                      onCompleted={data => {
                          console.log({data})
                          setOpen(true)}}>

                {(createUser, {loading, error}) => {
                    return (
                        <form onSubmit={event => handleSubmit(event, createUser)} className="register-from">
                            <div>
                                <input id="username" placeholder="username" type="text" onChange={event => setUsername(event.target.value)} />
                            </div>
                            <div>
                                <input id="email" placeholder="email" type="text" onChange={event => setEmail(event.target.value)}/>
                            </div>
                            <div>
                                <input id="password" placeholder="password" type="password" onChange={event => setPassword(event.target.value)}/>
                            </div>
                            <button disabled={loading || !username.trim() || !email.trim() || !password.trim()}
                                    type="submit">{loading ? "Registering..." : "Register"}</button>
                            <button onClick={() => setNewUser(false)} type="submit">Previous User? Log in here</button>
                            {error && <div>Error</div>}
                        </form>
                     )
                 }}
            </Mutation>
            <div style={{visibility: setVisibility(open)}}>
                <p>New Account</p>
                <p>User successfully created</p>
                <button onClick={() => setNewUser(false)}>Login</button>
            </div>
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