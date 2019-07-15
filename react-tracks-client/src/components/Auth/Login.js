import React, {useState} from "react";
import {Mutation} from 'react-apollo';
import {gql} from 'apollo-boost';
import Error from "./Register";

const Login = ({setNewUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event, tokenAuth, client) => {
        event.preventDefault();
        const res = await tokenAuth()
        localStorage.setItem('authToken', res.data.tokenAuth.token)
        client.writeData({data: {isLoggedIn: true}})
    }

  return (
         <div className="register-container">
            <h1>Login</h1>
            <Mutation mutation={LOGIN_MUTATION}
                      variables={{username, password}}
            onCompleted={data => {
              console.log({data})
            }}>

                {(tokenAuth, {loading, error, called, client}) => {
                    return (
                        <form onSubmit={event => handleSubmit(event, tokenAuth, client)} className="register-from">
                            <div>
                                <input id="username" placeholder="username" type="text" onChange={event => setUsername(event.target.value)} />
                            </div>
                            <div>
                                <input id="password" placeholder="password" type="password" onChange={event => setPassword(event.target.value)}/>
                            </div>
                            <button disabled={loading || !username.trim() || !password.trim()}
                                    type="submit">{loading ? "Logging in..." : "Login"}</button>
                            <button onClick={() => setNewUser(true)} type="submit">New User? Register here</button>
                            {error && <Error error={error}/>}
                        </form>
                     )
                 }}
            </Mutation>
        </div>
    );
}

const LOGIN_MUTATION = gql`
mutation ($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
  }
}`

export default Login;