import React from 'react';
import './App.css';
import {Query} from "react-apollo";
import {gql} from 'apollo-boost';

function App() {
    return (
        <div className="App">
            <Query query={GET_USERS_QUERY}>
                {({data, loading, error}) => {
                    if (loading) return <div>Loading</div>
                    if (error) return <div>Error</div>
                    return <div>{JSON.stringify(data)}</div>
                }}
            </Query>
        </div>
    );
}

const GET_USERS_QUERY = gql`
 {
    tracks {
    id
    title
    }
 }
`

export default App;
