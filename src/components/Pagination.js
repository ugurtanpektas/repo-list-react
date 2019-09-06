import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {paginationAction} from '../actions/paginationAction';
import { Link } from 'react-router-dom';
import qs from 'query-string';

class Pagination extends React.Component{
    
    parsePaginationLink(paginationLink){
        if(!paginationLink){
            return false;
        }
        let links = {prev:null, next:null, first:null, last:null};
        let pureLink;
        paginationLink = paginationLink.split(',');
        paginationLink.map((link) => {
            if(link.indexOf('rel="prev"') > -1){
                pureLink = link.split('<')[1].split('>')[0];
                links.prev = qs.parseUrl(pureLink).query.page;
            }
            if(link.indexOf('rel="next"') > -1){
                pureLink = link.split('<')[1].split('>')[0];
                links.next = qs.parseUrl(pureLink).query.page;
            }
            if(link.indexOf('rel="first"') > -1){
                pureLink = link.split('<')[1].split('>')[0];
                links.first = qs.parseUrl(pureLink).query.page;
            }
            if(link.indexOf('rel="last"') > -1){
                pureLink = link.split('<')[1].split('>')[0];
                links.last = qs.parseUrl(pureLink).query.page;
            }
            return false;
        });
        return links;
    }
    refreshData(){
        this.props.paginationAction('REFRESH', true)
    }
    getLink(type, paginationLink) {
        let allLinks = this.parsePaginationLink(paginationLink)
        if(!allLinks){
            return false;
        }
        switch(type){
            case 'PREV':
                if(allLinks.prev){
                    return(
                        <Link to={`${this.props.paginationState.pathLink}?page=${allLinks.prev}`} onClick={this.refreshData.bind(this)} className="prev-link">Prev</Link>
                    )
                }
                break;
            case 'NEXT':
                    if(allLinks.next){
                        return(
                            <Link to={`${this.props.paginationState.pathLink}?page=${allLinks.next}`} onClick={this.refreshData.bind(this)} className="next-link">Next</Link>
                        )
                    }
                break;
            case 'FIRST':
                    if(allLinks.first){
                        return(
                            <Link to={`${this.props.paginationState.pathLink}?page=${allLinks.first}`} onClick={this.refreshData.bind(this)} className="first-link">First</Link>
                        )
                    }
                break;
            case 'LAST':
                    if(allLinks.last){
                        return(
                            <Link to={`${this.props.paginationState.pathLink}?page=${allLinks.last}`} onClick={this.refreshData.bind(this)} className="last-link">Last</Link>
                        )
                    }
                break;
            default:
                break;
        }    
    }

    render(){
        if(this.props.paginationState.paginationLink){
            return(
                <div className="pagination">
                    {this.getLink('FIRST',this.props.paginationState.paginationLink)}
                    {this.getLink('PREV',this.props.paginationState.paginationLink)}
                    <span className="active-page">{this.props.paginationState.activePage}</span>
                    {this.getLink('NEXT',this.props.paginationState.paginationLink)}
                    {this.getLink('LAST',this.props.paginationState.paginationLink)}
                </div>
            )
        }
        else{
            return(
                <div className="pagination">          
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return{
        paginationState: state.pagination
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        paginationAction: paginationAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (Pagination);