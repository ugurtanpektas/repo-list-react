import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {repoAction} from './../actions/repoAction';
import { Link } from 'react-router-dom';
import './../General.css';

const apiUrl = 'https://api.github.com/repos/reactjs/';

class RepoDetail extends React.Component{

    componentDidMount(){
        this.getRepoDetail();
    }
    
    getRepoDetail = async () => {
        this.props.repoAction('LOADING');
        const getRepoDetailCall = await fetch(apiUrl+this.props.match.params.id)
        const response = await getRepoDetailCall.json();
        this.props.repoAction('GET_REPO_DETAIL',response);
    }

    render(){
        let html;
        if(this.props.repoState.loading){
            html = (
                <div className="loading"> Loading...</div>
            )
        }else{
            html = (
                <div>
                    <h1>Repo Detail</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td className="table-label">Repo Name</td>
                                <td>:</td>
                                <td>{this.props.repoState.repoDetail.name}</td>
                            </tr>
                            <tr>
                                <td className="table-label">Repo Url</td>
                                <td>:</td>
                                <td><a href={this.props.repoState.repoDetail.html_url} target="_blank" rel="noopener noreferrer">{this.props.repoState.repoDetail.html_url}</a></td>
                            </tr>
                            <tr>
                                <td className="table-label">Repo Issiu Count</td>
                                <td>:</td>
                                <td>{this.props.repoState.repoDetail.open_issues_count}</td>
                            </tr>
                            <tr>
                                <td className="table-label">Repo Fork Count</td>
                                <td>:</td>
                                <td>{this.props.repoState.repoDetail.forks_count}</td>
                            </tr>
                            <tr>
                                <td className="table-label">Repo Watch Count</td>
                                <td>:</td>
                                <td>{this.props.repoState.repoDetail.watchers}</td>
                            </tr>
                            <tr>
                                <td className="table-label">See all issues</td>
                                <td>:</td>
                                <td><Link to={`/repo/detail/${this.props.match.params.id}/issues`}>Show Issues</Link></td>
                            </tr>
                            <tr>
                                <td className="table-label">See All Pull Requests</td>
                                <td>:</td>
                                <td><Link to={`/repo/detail/${this.props.match.params.id}/pulls`}>Show Pull Requests</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>   
            )
        }
        return(
            <div className="repo-detail-wrapper">
                {html}
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        repoState: state.repos
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        repoAction : repoAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (RepoDetail);