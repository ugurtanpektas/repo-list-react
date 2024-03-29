import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {repoAction} from '../actions/repoAction';
import {paginationAction} from '../actions/paginationAction';
import qs from 'query-string';
import Pagination from "./Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const apiUrl = 'https://api.github.com/repos/reactjs/';

class PullRequests extends React.Component{

    componentDidMount(){
        this.props.paginationAction('REFRESH', true)
    }
    
    getPulls = async () => {
        this.props.repoAction('LOADING');
        let pageNumber = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).page ? qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).page : 1;
        const getRepoPullsCall = await fetch(apiUrl+this.props.match.params.id+'/pulls?page='+pageNumber+'&per_page=5');
        this.props.paginationAction('ACTIVE_PAGE', pageNumber);
        this.props.paginationAction('PAGINATION_LINK', await getRepoPullsCall.headers.get('Link'));
        this.props.paginationAction('PATH_LINK', `/repo/detail/${this.props.match.params.id}/pulls`)
        const response = await getRepoPullsCall.json();
        this.props.repoAction('GET_REPO_PULLS',response);
    }

    render(){
        if(this.props.paginationState.refresh){
            this.getPulls();
            this.props.paginationAction('REFRESH', false)
        }
        let html;
        if(this.props.repoState.loading){
            html = (
                <div className="loading"> Pull Requests Loading...</div>
            )
        }else{
            let emptyerror;
            if(this.props.repoState.pullList.length <= 0 ){
                emptyerror = (
                    <div>There is no pull requests</div>
                )
            }
            html = (
                <div>
                    <h1>"{this.props.match.params.id}" All Pull Requests</h1>
                    {this.props.repoState.pullList.map((pullRequest) => {
                        return(
                            <div className="item" key={pullRequest.id}>
                                {pullRequest.title}
                                <div className="sub-info">
                                    <span className="info-item"><FontAwesomeIcon icon={faUser} className="icon" />{pullRequest.user.login}</span>
                                </div>
                            </div>
                        )
                    })}
                    {emptyerror}
                    <Pagination/>
                </div>
            )
        }
        return(
            <div className="pull-requests-wrapper">
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

export default connect(mapStateToProps, mapDispatchToProps) (PullRequests);