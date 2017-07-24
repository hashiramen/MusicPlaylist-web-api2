import { REQUEST_TAG } from './types'

export function requestTag(tag, callback) {
    return {
        type: REQUEST_TAG,
        payload: tag,
        pending: true,
        callback
    }
}
