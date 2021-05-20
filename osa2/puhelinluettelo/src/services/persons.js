import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const addNew = newObject => {    
  return axios.post(baseUrl, newObject)
}

const deletePerson = id => {  
  return axios.delete(`http://localhost:3001/persons/${id}`)
}

const updateNumber = change => {
  return axios.put(`http://localhost:3001/persons/${change.id}`, change)
}


export default { 
  getAll: getAll, 
  addNew: addNew,
  deletePerson: deletePerson,
  updateNumber: updateNumber    
}