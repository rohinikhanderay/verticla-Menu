import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function require_auth(ComposedComponent) {
    class Authentication extends Component {
        redirectToSignin() {
            this.props.history.push('/signin');
            localStorage.clear();
        }
        componentDidMount() {
            if (!this.props.auth.authenticated) {
                this.redirectToSignin();
            }
            if (localStorage.getItem('exptTime')) {
                if (localStorage.getItem('exptTime') < Date.now()) {
                    this.redirectToSignin();
                }
            }
        }
        componentDidUpdate(nextProps) {
            if (!nextProps.auth.authenticated) {
                this.redirectToSignin();
            }
        }
        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return { auth: state.auth };
    }

    return withRouter(connect(mapStateToProps)(Authentication));
}
