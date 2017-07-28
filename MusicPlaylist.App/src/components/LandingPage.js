import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { Field, reduxForm }  from 'redux-form'
import { connect } from 'react-redux'
//actions
import { requestTag } from '../actions/action_tag.js'

class LandingPage extends Component {

    renderTagField(field) {
        return(
            <div>
                <input type="text" autoFocus {...field.input}/>
                {field.meta.touched ? field.meta.error : ''}
            </div>
        )
    }

    onSubmit(values) {
        this.props.requestTag(values, () => this.props.history.push('/myplaylist'))
    }

    render() {
        const { handleSubmit } = this.props
        const spinner = () => {
            return(
                <i className="fa fa-cog fa-spin"></i>
            )
        }
        return (
            <div className="landing-wrap">
                <form className="landing-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="landing-icon">
                        <span>{this.props.pending ? spinner() : ''}</span>
                    </div>
                    <div className="landing-input">
                        <Field name="tag" component={this.renderTagField} />
                    </div>
                    <div className="landing-button">
                        <button type="submit"><i className="fa fa-sign-in" aria-hidden="true"></i></button>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {}

    if(!values.tag){
        errors.tag = " "
    }

    return errors 
}

function mapStateToProps({authenticator}){
    const { pending } = authenticator
    return {
        pending
    }
}

export default withRouter(reduxForm({
    validate,
    form: 'RequestAuthenticator'
})(
    connect(mapStateToProps, { requestTag })(LandingPage)
));