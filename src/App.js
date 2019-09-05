import React from 'react';
import './App.css';
import {repos, getReposStart} from './actions/repoAction';
import {connect} from 'react-redux';
import RepoList from './components/RepoList';

export class App extends React.Component{
  render(){
    return(
      <RepoList></RepoList>
    )
  }
}

const repoStateToProps = (state, ownProps) => ({
  repos : state.repos
})

const repoDispatchToProps = {
  getReposStart,
  repos
}

const AppContainer = connect(
  repoStateToProps,
  repoDispatchToProps
)(App);

export default AppContainer;
