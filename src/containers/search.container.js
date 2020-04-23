import React from "react";
import {connect} from 'react-redux';
import {checkLoggedIn} from '../actions/user.action';
import {searchByAuthors, searchByTitle, addPostWithPlaylistId} from '../actions/youtube.action';
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

    handlePostClick(playlistId) {
        this.props.addPostWithPlaylistId(playlistId);
    }

    _getThumbnail(thumbnails) {
      let imgUrl = "";
      if (thumbnails) {
        imgUrl = thumbnails.default.url;
      } else
        imgUrl = "https://upload.wikimedia.org/wikipedia/commons/e/e1/YouTube_play_buttom_icon_%282013-2017%29.svg";
      return <img src={imgUrl}/>
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
              <td>{this._getThumbnail(playlist.snippet.thumbnails)}</td>
                <td align={"middle"}>{playlist.snippet.title}</td>
                <td>{playlist.id.playlistId}</td>
                <td><input type="button" value="Post this" onClick={() => this.handlePostClick("https://www.youtube.com/playlist?list=" + playlist.id.playlistId)}/></td>
            </tr>
            ));
        
        return (
            <table>
                <thead>
                <tr>
                  <th>Playlist</th>
                    <th>Title</th>
                    <th>Playlist ID</th>
                </tr>
                </thead>
                <tbody>
                    {youtubeSearchRows}
                </tbody>
            </table>)

    }

    render() {
        if (this.props.youtubeRedirect.route) {
            return (<Redirect to={this.props.youtubeRedirect.route}/>)
        }
        return (
            <div>
                <h3>Search Youtube</h3>
                <form>
                    <label> Keyword:
                        <input type="text"
                            disabled={this.props.inFlight}
                            value={this.state.keyword}
                            onChange={(e) => this.handleChange(e, 'keyword')}/> </label>
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
        searchByAuthors: (request) => dispatch(searchByAuthors(request)),
        addPostWithPlaylistId: (playlistId) => dispatch(addPostWithPlaylistId(playlistId))
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