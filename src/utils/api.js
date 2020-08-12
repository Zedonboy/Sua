import { API_HOST } from "../config"

export const loginUserAPI = (identifier, password) => {
    let url = `${API_HOST}/auth/local`
    return fetch(url, {
        method : "POST",
        body : JSON.stringify({identifier, password}),
        headers : {
            'Content-Type':'application/json'
        }
    })
}

export const fetchCourses = currentUserEmail => {
    let url = `${API_HOST}/course-data?author=${currentUserEmail}`

    return fetch(url, {
        method : "GET",
        headers : {
            'Content-Type':'application/json'
        }
    })
}

export const updateCourse = (data, jwt) => {
    let url = `${API_HOST}/course-data/${data.id}`

    return fetch(url, {
        method : "PUT",
        body : JSON.stringify(data),
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    })
}

export const createCourse = (data, jwt) => {
    let url = `${API_HOST}/course-data`
    return fetch(url, {
        method : "POST",
        body : JSON.stringify(data),
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${jwt}`
        }

    })
}
export const deleteCourse = (data, jwt) => {
    let url = `${API_HOST}/course-data/${data.id}`
    return fetch(url, {
        method : "DELETE",
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    })
}
export const createCourseOutline = (data, jwt) => {
    let url = `${API_HOST}/course-outline-data`
    return fetch(url, {
        method : "POST",
        body : JSON.stringify(data),
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    })
}
export const updateCourseOutline = (data , jwt) => {
    let url = `${API_HOST}/course-outline-data/${data.id}`
    return fetch(url, {
        method : "PUT",
        body : JSON.stringify(data),
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    })
}
export const fetchCourseOutline = (data, jwt) => {
    let url = `${API_HOST}/course-outline-data/`
    return fetch(url, {
        method : "GET",
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    })
}
export const deleteCourseOutline = (data, jwt) => {
    let url = `${API_HOST}/course-outline-data/${data.id}`
    return fetch(url, {
        method : "DELETE",
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    })
}