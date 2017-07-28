import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export default function(ComposedComponent) {
    class PlaylistAuthentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        }

        componentWillMount() {
            if(typeof this.props.authenticator.Id == 'undefined'){
                this.context.router.history.push('/')
            }
        }

        componentWillUpdate(nextProps){
            if(typeof this.props.authenticator.Id == 'undefined'){
                this.context.router.history.push('/')
            }
        }

        render(){
            return <ComposedComponent {...this.props} />
        }
    }


    function mapStateToProps(state){
        return { authenticator: state.authenticator }
    }

    return connect(mapStateToProps)(PlaylistAuthentication)
}