import React from "react";
import {connect} from 'react-redux';
import {checkLoggedIn} from '../actions/user.action';
import {addPost} from '../actions/youtube.action';
import {Redirect} from "react-router";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {playlistId: '', name: '', description: '', tags:[]};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    // todo: push tags into array
    handleTagChange(event, value) {
        var tags = event.target.value.split(",");
        this.setState({tags: tags});
    }

    handleSubmit(event) {
        this.props.addPost(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.checkLoggedIn();
        // const username = this.props.routeState.username;
        const playlistId = this.props.youtubeRedirect.playlistId;
        if (playlistId) {
            console.log('playlist id: ' + playlistId)
            this.setState({playlistId: playlistId, description: '', name: '', tags: []});
        } else {
            this.setState({playlistId: '', description: '', name: '', tags: []});
        }

    }

    render() {
        if (this.props.youtubeRedirect.route) {
            return (<Redirect to={this.props.youtubeRedirect.route}/>)
        }
        
        return (
            <div align={"center"}>
                <Jumbotron>
                    <Container>
                        <h2 className="text-center">Add a post</h2>
                        <Form onSubmit={(e) => this.handleSubmit(e)} className="justify-content-md-center">
                            <Form.Row className="justify-content-md-center">
                                <Form.Group as={Col} controlId="formGridUsername" xs lg="4">
                                <Form.Label>Playlist</Form.Label>
                                <Form.Control value={this.state.playlistId} type="text" placeholder="Playlist url here..." onChange={(e) => this.handleChange(e, 'playlistId')}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="justify-content-md-center">
                                <Form.Group as={Col} controlId="formGridPassword" xs lg="4">
                                    <Form.Label>List name</Form.Label>
                                    <Form.Control type="text" placeholder="List name here..." rows="3" onChange={(e) => this.handleChange(e, 'name')} />
                                    {/* <Form.Control type="text" placeholder="Comment" onChange={(e) => this.handleChange(e, 'comment')}/> */}
                                </Form.Group>
                            </Form.Row>
                            
                            <Form.Row className="justify-content-md-center">
                                <Form.Group as={Col} controlId="formGridPassword" xs lg="4">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Description here..." rows="3" onChange={(e) => this.handleChange(e, 'description')} />
                                    {/* <Form.Control type="text" placeholder="Comment" onChange={(e) => this.handleChange(e, 'comment')}/> */}
                                </Form.Group>
                            </Form.Row>
                            
                            <Form.Row className="justify-content-md-center">
                                <Form.Group as={Col} controlId="formGridPassword" xs lg="4">
                                    <Form.Label>Tags (split by comma)</Form.Label>
                                    <Form.Control type="text" placeholder="Tags here..." rows="3" onChange={(e) => this.handleChange(e, 'tags')} />
                                    {/* <Form.Control type="text" placeholder="Comment" onChange={(e) => this.handleChange(e, 'comment')}/> */}
                                </Form.Group>
                            </Form.Row>
                            <br/>
                            <Form.Group as={Row} className="justify-content-md-center">
                                <Col xs lg="4" >
                                    <Button block variant="primary" type="submit" disabled={this.props.inFlight}>
                                    Submit
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Container>
                </Jumbotron>

                {/* <Jumbotron>
                    <h3>Add a post</h3>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div><label style={{width: 200+'px'}}> Playlist
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.playlistId}
                               onChange={(e) => this.handleChange(e, 'playlistId')}/> </label></div>
                    <div><label style={{width: 200+'px'}}> List name
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.name}
                               onChange={(e) => this.handleChange(e, 'name')}/> </label></div>
                    <div><label style={{width: 200+'px'}}> Description
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.description}
                               onChange={(e) => this.handleChange(e, 'description')}/> </label></div>
                    <div><label style={{width: 200+'px'}}> Tags (split by comma)
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.tags}
                               onChange={(e) => this.handleTagChange(e, 'tags')}/> </label></div>

                    <input type="submit" value="Submit" disabled={this.props.inFlight}/>
                </form>
                </Jumbotron> */}
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        checkLoggedIn: () => dispatch(checkLoggedIn()),
        addPost: (user) => dispatch(addPost(user)),
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
)(AddPost)
