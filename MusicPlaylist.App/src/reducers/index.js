import { combineReducers } from 'redux'
import {fetchTag } from './reducer_tag'
import {reducer as formReducer} from 'redux-form'

const reducers = combineReducers({
    authenticator: fetchTag,
    form: formReducer
})

export default reducers