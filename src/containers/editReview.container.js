import React from "react";
import {connect} from 'react-redux';
import {checkLoggedIn} from '../actions/user.action';
import {editReview} from '../actions/youtube.action';
import {Redirect} from "react-router";

class EditReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rate: '', comment: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.editReview(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.checkLoggedIn();
        const reviewId = this.props.youtubeRedirect.reviewId;
        const username = this.props.routeState.user.username;
        const isAdmin = this.props.routeState.user.isAdmin;
        // console.log(username + ' ' + isAdmin)
        this.setState({rate: '', comment: '', _id: reviewId, username: username, isAdmin: isAdmin});
    }

    render() {
        if (this.props.youtubeRedirect.route) {
            return (<Redirect to={this.props.youtubeRedirect.route}/>)
        }
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {/* {error} */}
                    <label> Rate:
                        <input type="text"
                            disabled={this.props.inFlight}
                            value={this.state.rate}
                            onChange={(e) => this.handleChange(e, 'rate')}/> </label>
                    <label> Comment:
                        <input type="text"
                            disabled={this.props.inFlight}
                            value={this.state.password}
                            onChange={(e) => this.handleChange(e, 'comment')}/> </label>
                    <input type="submit" value="Submit" disabled={this.props.inFlight}/>
                </form>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        checkLoggedIn: () => dispatch(checkLoggedIn()),
        editReview: (review) => dispatch(editReview(review)),
    }
};


function mapStateToProps(state, props) {
    return {
        ...state.user,
        ...state.youtube
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditReview)