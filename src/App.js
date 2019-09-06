import React from 'react';
import './General.css';
import RepoList from './components/RepoList';


export class App extends React.Component{

  render(){
    return(
        <RepoList></RepoList>
    )
  }
}

export default App;
