import axios from "axios";
import {toast} from "react-toastify";


let default_url = "";

export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


export function axiosGet(url, data) {

    let headers = {
        'Content-Type': 'application/json',
    }

    const getData =  axios.get(default_url + url, {params: data, headers: headers})

    getData
        .then((response) => {
            console.log(response.data)
            if (response.status === 200) {
                toast.success(response.data.message)
            }
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.response.data.error)
        })

    return getData
}


export function axiosPost(url, data, tokenRequired) {

    let headers = {
        'Content-Type': 'application/json',
    }

    if (tokenRequired) {
        headers = {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
        }
    }

    const postData = axios.post(default_url + url, data, {headers: headers})

    postData
        .then((response) => {
            if (url !== "/api/v1/auth/isAuthenticated") {
                console.log(response.data)
            }
            if (response.status === 200) {
                toast.success(response.data.message)
            }
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.response.data.error)
        })

    return postData
}