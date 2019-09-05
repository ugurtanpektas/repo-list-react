import React from "react";
import { Link } from 'react-router-dom'

class RepoList extends React.Component{
    render(){
        return(
            <div id="repo-list-wrapper">
                Repo List
                <Link to="/repo/detail/1231">Repo link</Link>
            </div>
        )
    }
}

export default RepoList;