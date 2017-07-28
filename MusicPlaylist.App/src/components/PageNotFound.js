import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PageNotFound extends Component {
    render() {
        return (
            <div>
                <h1 style={{color:'white', textAlign: 'center', paddingTop: '25%', marginBottom: '.5em'}}>Error 404, page not found</h1>
                <Link to="/"style={{color:'white', margin: 'auto', display: 'inherit', textAlign: 'center'}}>Go to homepage</Link>
            </div>
        );
    }
}

export default PageNotFound;