import React from "react";
import {connect} from 'react-redux';
import {clear, logOut} from '../actions/user.action'
import {Redirect} from "react-router";

class LogoutContainer extends React.Component {
    onClick(event) {
        event.preventDefault();
        this.props.logout(this.state);
    }

    componentDidMount() {
        this.props.clear();
    }

    render() {
        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        return (
            <div>
                <input type={'button'} value={'Logout'} onClick={(e) => this.onClick(e)}/>
            </div>
            
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        logout: () => dispatch(logOut()),
        clear: () => dispatch(clear()),
    }
};


function mapStateToProps(state, props) {
    return {
        ...state.user,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutContainer)