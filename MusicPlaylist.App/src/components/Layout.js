import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Layout extends Component {
    render() {
        return (
            <div className="bg-wrap">
                <div className="vegas-pattern">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;