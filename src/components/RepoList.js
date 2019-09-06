import React from "react";
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {repoAction} from './../actions/repoAction';
import {paginationAction} from '../actions/paginationAction';
import qs from 'query-string';
import Pagination from "./Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCodeBranch, faEye } from '@fortawesome/free-solid-svg-icons'

const apiUrl = 'https://api.github.com/users/reactjs/repos';

class RepoList extends React.Component{
    
    componentDidMount(){
        this.props.paginationAction('REFRESH', true)
    }

    getRepos = async () => {
        this.props.repoAction('LOADING');
        let location = window.location.href.split('?')[1];
        let pageNumber = location && qs.parse(location, { ignoreQueryPrefix: true }).page ? qs.parse(location, { ignoreQueryPrefix: true }).page : 1;
        const getReposCall = await fetch(apiUrl+'?page='+pageNumber+'&per_page=10');
        this.props.paginationAction('ACTIVE_PAGE', pageNumber)
        this.props.paginationAction('PAGINATION_LINK', await getReposCall.headers.get('Link'))
        this.props.paginationAction('PATH_LINK', `/`)
        const response = await getReposCall.json();
        this.props.repoAction('GET_REPOS',response);
    }

    render(){

        if(this.props.paginationState.refresh){
            this.getRepos();
            this.props.paginationAction('REFRESH', false)
        }

        let html;
        if(this.props.repoState.loading){
            html = (
                <div className="loading"> Loading...</div>
            )
        }else{
            html = (
                <div>
                    <h1>Repositories</h1>
                    {this.props.repoState.repoList.map((repository) => {
                        return(
                            <div className="item" key={repository.id}>
                                <Link to={`/repo/detail/${repository.name}`}>{repository.name}</Link>
                                <span className="info-item"><FontAwesomeIcon icon={faUser} className="icon" />{repository.owner.login}</span>
                                <span className="info-item"><FontAwesomeIcon icon={faCodeBranch} className="icon" />{repository.forks_count}</span>
                                <span className="info-item"><FontAwesomeIcon icon={faEye} className="icon" />{repository.watchers_count}</span>
                                <div className="description">{repository.description}</div>
                            </div>
                        )
                    })}
                    <Pagination/>
                </div>
            )
        }
        return(
            <div className="repo-list-wrapper">
                {html}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        repoState: state.repos,
        paginationState: state.pagination
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        repoAction : repoAction,
        paginationAction: paginationAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (RepoList);