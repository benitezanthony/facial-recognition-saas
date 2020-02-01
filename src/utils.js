import {
    Responsive
} from 'semantic-ui-react'
import Axios from 'axios'
import { APIEndpoint } from './constants'

export const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* this allows us to have EVERY request be checked for authentication */
/* authenticated axios request, can be imported to other containers
this means we DO NOT need to pass the token every time we make a request
this function contains the token */
export const authAxios = Axios.create({
    /* URL that will be consistent when we pass the request to axios, use constant from
    constants.js */
    baseURL: APIEndpoint,
    headers: {
        /* grab token from local storage and pass it to Authorization as a string */
        Authorization: {
            toString() {
                return `Token ${localStorage.getItem('token')}`
            }
        }
    }
})