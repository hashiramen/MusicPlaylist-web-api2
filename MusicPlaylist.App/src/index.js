import 'regenerator-runtime/runtime'
import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Layout from './components/Layout'
import LandingPage from './components/LandingPage'
import MyPlaylist from './containers/MyPlaylist'

//error pages
import PageNotFound from './components/PageNotFound'

//hoc
import require_playlist from './hoc/require_playlist'

//1.reducers
//2.root of sagas
import reducers from './reducers'
import rootSaga from './sagas'

const saga = createSagaMiddleware()
const store = createStore(
    reducers,
    applyMiddleware(saga)
)
saga.run(rootSaga)

import { requestTag } from './actions/action_tag'
// store.dispatch(requestTag('xd'))
// setTimeout(() => console.log('Application state: ', store.getState()), 3000)

console.log('Starts the react app...')
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Layout><LandingPage /></Layout>}/>
                <Route path="/myplaylist" render={() => <Layout><MyPlaylist /></Layout>} />
                <Route path="*" render={() => <Layout><PageNotFound /></Layout>}/>
            </Switch>
        </Router>
    </Provider>
    ,document.getElementById('root'))