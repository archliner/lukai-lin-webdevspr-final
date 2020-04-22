import React from "react";
import {connect} from 'react-redux';
import {checkLoggedIn} from '../actions/user.action';
import {searchByAuthors, searchByTitle} from '../actions/youtube.action';
import {Redirect} from "react-router";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.checkLoggedIn();
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleClick() {
        if (this.state.keyword) {
            this.props.searchByTitle(this.state);
        }
    }

    // componentDidMount() {
    //     this.props.clear();
    //     this.props.checkLoggedIn();
    // }
    _renderBookList() {
        if (!this.props.searchList || this.props.searchList.length === 0) {
            return null;
        }
        const books = [];
        // const list = this.props.searchList.bookList.map((book) => (
        //     books.push({title: book.title, authors: book.authors})
        // ));
        
        const youtubeSearchRows = this.props.searchList.playList.map((playlist) => (
            <tr key={playlist.id.playlistId}>
                <td>{playlist.snippet.title}</td>
                <td>{playlist.snippet.description}</td>
            </tr>
            ));
        
        return (
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                    {youtubeSearchRows}
                </tbody>
            </table>)

    }

    render() {
        return (
            <div>
                <h3>Search Youtube</h3>
                <form>
                    <label> Keyword:
                        <input type="text"
                            disabled={this.props.inFlight}
                            value={this.state.keyword}
                            onChange={(e) => this.handleChange(e, 'keyword')}/> </label>
                    {/*<label> Author:*/}
                    {/*    <input type="text"*/}
                    {/*        disabled={this.props.inFlight}*/}
                    {/*        value={this.state.password}*/}
                    {/*        onChange={(e) => this.handleChange(e, 'authors')}/> </label>*/}
                    <input type="button" value="Submit" onClick={() => this.handleClick()} disabled={this.props.inFlight}/>
                </form>
                <div>{this._renderBookList()}</div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        checkLoggedIn: () => dispatch(checkLoggedIn()),
        searchByTitle: (request) => dispatch(searchByTitle(request)),
        searchByAuthors: (request) => dispatch(searchByAuthors(request))
    }
};


function mapStateToProps(state, props) {
    return {
        ...state.user,
        ...state.youtube,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)
