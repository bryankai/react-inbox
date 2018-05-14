import axios from 'axios'
const url = 'http://localhost:8082/api/messages'
// WHy is this a class?  So we can have different request methods?
class MessageAPI {
  static get () {         // So we can call it by MessageAPI.get()
    return axios.get(url)
  }
  static post(body) {
    return axios.post(url, body)
  }
  static patch(body) {
    return axios.patch(url, body)
  }
}

export default MessageAPI
