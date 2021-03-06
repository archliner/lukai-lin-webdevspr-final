import Axios from "axios";
import React from 'react';
import {Spinner} from "react-bootstrap";

export default function (RedirectComponent) {
    return class extends React.Component {

        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }

        componentDidMount() {
            Axios.get('/api/user/loggedIn')
                .then(res => {
                    if (res.status === 200) {
                        this.setState({loading: false});
                    } else {
                        throw new Error(res.error);
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({loading: false, redirect: true});
                });
        }

        render() {
            const {loading} = this.state;
            if (loading) {
                return (<div align={"center"}><Spinner animation={"border"} variant={"primary"}/><p>Loading...</p></div>);
            }
            // if (redirect) {
            //     return (<Redirect to="/home"/>);
            // }
            return (<RedirectComponent {...this.props} />);
        }
    }
}
