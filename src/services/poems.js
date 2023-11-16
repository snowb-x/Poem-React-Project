import axios from 'axios'
const baseURL = "/api/poems"

//added bob header
axios.defaults.headers.common['bob'] = 'Bobalooba'

const getAll = () => {
    return axios.get(baseURL)
                .then(response => response.data)
}

const create = (newObject) => {
    return  axios.post(baseURL, newObject)
                 .then(response => response.data)
}

const vote = (object) => {
    const votes = object.votes + 1
    return axios.post(baseURL + "/" + object.id,
    {
        id: object.id,
        title: object.title,
        author: object.author,
        authorid: object.authorid,
        text: object.text,
        votes: votes
      })
                .then(response => response.data)
}

const editPoem = (object) => {
    return axios.put(baseURL + "/" + object.id, 
    {
        id: object.id,
        title: object.title,
        author: object.author,
        authorid: object.authorid,
        text: object.text,
        votes: object.votes
      })
                .then(response => response.data)
}

const deletePoem = (id) => {
    return axios.delete(baseURL + "/" + id)
                .then(response => response.data)
}

export default {getAll, create, vote, editPoem, deletePoem}