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

class Issiues extends React.Component{
    
    componentDidMount(){
        this.props.paginationAction('REFRESH', true)
    }
    
    getIssues = async () => {
        this.props.repoAction('LOADING');
        let pageNumber = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).page ? qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).page : 1;
        const getRepoIssuesCall = await fetch(apiUrl+this.props.match.params.id+'/issues?page='+pageNumber+'&per_page=5')
        this.props.paginationAction('ACTIVE_PAGE', pageNumber)
        this.props.paginationAction('PAGINATION_LINK', await getRepoIssuesCall.headers.get('Link'))
        this.props.paginationAction('PATH_LINK', `/repo/detail/${this.props.match.params.id}/issues`)
        const response = await getRepoIssuesCall.json();
        this.props.repoAction('GET_REPO_ISSUES',response);
    }

    render(){
        
        if(this.props.paginationState.refresh){
            this.getIssues();
            this.props.paginationAction('REFRESH', false)
        }

        let html;
        if(this.props.repoState.loading){
            html = (
                <div className="loading"> Issues Loading...</div>
            )
        }else{
            let emptyerror;
            if(this.props.repoState.issueList.length <= 0 ){
                emptyerror = (
                    <div>There is no issue</div>
                )
            }
            html = (
                <div>
                    <h1>"{this.props.match.params.id}" All Issiues</h1>
                    {this.props.repoState.issueList.map((issue) => {
                        return(
                            <div className="item" key={issue.id}>
                                {issue.title}
                                <div className="sub-info">
                                    <span className="info-item"><FontAwesomeIcon icon={faUser} className="icon" />{issue.user.login}</span>
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
            <div className="issue-wrapper">
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

export default connect(mapStateToProps, mapDispatchToProps) (Issiues);