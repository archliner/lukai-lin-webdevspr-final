import React from "react";
import {connect} from 'react-redux';
import {checkLoggedIn} from '../actions/user.action';
import {addPost} from '../actions/youtube.action';
import {Redirect} from "react-router";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import {Container, Jumbotron} from "react-bootstrap";

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
                    <h3>Add a post</h3>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {/* {error} */}
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
                </Jumbotron>
                {/*<InputGroup>*/}
                {/*    <InputGroupAddon addonType={"prepend"} >*/}
                {/*        <InputGroupText>Playlist</InputGroupText>*/}
                {/*    </InputGroupAddon>*/}
                {/*    <Input />*/}
                {/*</InputGroup>*/}
                {/*<InputGroup>*/}
                {/*    <InputGroupAddon addonType={"prepend"}>*/}
                {/*        <InputGroupText>Title</InputGroupText>*/}
                {/*    </InputGroupAddon>*/}
                {/*    <Input />*/}
                {/*</InputGroup>*/}
                {/*<InputGroup>*/}
                {/*    <InputGroupAddon addonType={"prepend"}>*/}
                {/*        <InputGroupText>Description</InputGroupText>*/}
                {/*    </InputGroupAddon>*/}
                {/*    <Input />*/}
                {/*</InputGroup>*/}
                {/*<InputGroup>*/}
                {/*    <InputGroupAddon addonType={"prepend"}>*/}
                {/*        <InputGroupText>Tags (split by comma)</InputGroupText>*/}
                {/*    </InputGroupAddon>*/}
                {/*    <Input />*/}
                {/*</InputGroup>*/}
                {/*<input type="submit" value="Submit" disabled={this.props.inFlight} onClick={(e) => this.handleSubmit(e)}/>*/}
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
