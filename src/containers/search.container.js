import React from "react";
import {connect} from 'react-redux';
import {checkLoggedIn} from '../actions/user.action';
import {searchByAuthors, searchByTitle, addPostWithPlaylistId} from '../actions/youtube.action';
import {Redirect} from "react-router";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

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
      return <img src={imgUrl} width={120} height={90}/>
    }

    _renderBookList() {
        if (!this.props.searchList || this.props.searchList.length === 0) {
            return null;
        }
        
        const youtubeSearchRows = this.props.searchList.playList.map((playlist) => (
            <tr key={playlist.id.playlistId}>
              <td align={"center"}>{this._getThumbnail(playlist.snippet.thumbnails)}</td>
                {/*<td align={"middle"}>{playlist.snippet.title}</td>*/}
                <td align={"center"}><a href={"https://www.youtube.com/playlist?list=" + playlist.id.playlistId}>{playlist.snippet.title}</a></td>
                <td>{playlist.snippet.description}</td>
                <td align={"center"}><input type="button" value="Post this" onClick={() => this.handlePostClick("https://www.youtube.com/playlist?list=" + playlist.id.playlistId)}/></td>
            </tr>
            ));
        
        return (
            <Table striped bordered hover responsive>
                <thead>
                <tr align={"center"}>
                    <th style={{width: "15%"}}>Playlist</th>
                    {/*<th style={{width: "28%"}}>Title</th>*/}
                    <th style={{width: "34%"}}>Title</th>
                    <th style={{width: "34%"}}>Description</th>
                    <th style={{width: "17%"}}>Post</th>
                </tr>
                </thead>
                <tbody>
                    {youtubeSearchRows}
                </tbody>
            </Table>

            // <table>
            //     <thead>
            //     <tr>
            //       <th>Playlist</th>
            //         <th>Title</th>
            //         <th>Playlist ID</th>
            //     </tr>
            //     </thead>
            //     <tbody>
            //         {youtubeSearchRows}
            //     </tbody>
            // </table>
            )

    }

    render() {
        if (this.props.youtubeRedirect.route) {
            return (<Redirect to={this.props.youtubeRedirect.route}/>)
        }
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <h3 className="text-center">Search Youtube Playlists</h3>
                        <Form className="justify-content-md-center">
                            <Form.Row className="justify-content-md-center">
                                <Form.Group as={Col} controlId="formGridKeyword" xs lg="4">
                                    <Form.Label></Form.Label>
                                    <Form.Control type="text" placeholder="Enter a keyword" onChange={(e) => this.handleChange(e, 'keyword')}/>
                                </Form.Group>
                            </Form.Row>
                            <br/>
                            <Form.Group as={Row} className="justify-content-md-center">
                                <Col xs lg="4" >
                                    <Button block variant="primary" type="button" onClick={() => this.handleClick()}>
                                        Search
                                    </Button>
                                </Col>
                            </Form.Group>
                            </Form>
                    </Container>
                </Jumbotron>
                
                {/* <form>
                    <label> Keyword:
                        <input type="text"
                            disabled={this.props.inFlight}
                            value={this.state.keyword}
                            onChange={(e) => this.handleChange(e, 'keyword')}/> </label>
                    <input type="button" value="Submit" onClick={() => this.handleClick()} disabled={this.props.inFlight}/>
                </form> */}
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
