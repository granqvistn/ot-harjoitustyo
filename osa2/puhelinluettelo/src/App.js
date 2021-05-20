import React, { useState, useEffect } from 'react'
import personData from './services/persons'

const App = () => {

  const [ persons, setPersons] = useState([])  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ showAll, setShowAll] = useState(true)
  const [ filterText, setFilter] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  
  useEffect(() => {    
    getData()
  }, [])

  const getData = () => {
    personData
      .getAll()
      .then(response => 
        setPersons(response.data))
  }

  const ErrorNotification = ({msg}) => {
    if (msg === null){
      return null
    }
    return (
      <div className="error">
        {msg}
      </div>
    )
  }

  const SuccessNotification = ({msg}) => {
    if (msg === null){
      return null
    }
    return (
      <div className="success">
        {msg}
      </div>
    )
  }

  const checkName = (event) => {

    event.preventDefault()

    if (persons.filter(e => e.name === newName).length > 0){
      
      if (window.confirm(`${newName} is already added to phonebook, replace the number with a new one?`)){
        
        const person = persons.find(per => per.name === newName)
        const personChange = {...person, number : newNumber}

        personData
         .updateNumber(personChange)
         .then(change => {
          setPersons(persons.map(person => person.id !== personChange.id ? person : change.data))

          setSuccessMsg(
            `${personChange.name} number was changed successfully!`
          )
          setTimeout(() => {
            setSuccessMsg(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMsg(
            `Information of ${personChange.name} has already been removed from the server`
          )
          setTimeout(() => {
            setErrorMsg(null)
          }, 5000)

          //2.20 kohtaan kun tulee error 404, ladataan tiedot siten näkyviin, että serveriltä poistettu nimi häviää listasta
          getData()
          console.log(error)
          setNewName('')
          setNewNumber('')
        })
      }
      
    }
    else {
      addNumber(event)
    }
  }

  const handlePoista = (id) => {

    if (window.confirm("Do you want to delete?")){

      personData
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        
        setSuccessMsg(
          `Delete was done successfully!`
        )
        setTimeout(() => {
          setSuccessMsg(null)
        }, 5000)        
      })
      .catch(error => {
        setErrorMsg(
          "Could not delete person"
        )
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
        console.log(error)
      }) 
    }
  }

  const addNumber = (event) =>{    
    
    const perObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(perObject))
    setNewName('')
    setNewNumber('')
    
    personData
      .addNew(perObject)
      .then(response => {
        setPersons(persons.concat(response.data))        
      
        setSuccessMsg(
          `${perObject.name} was added successfully!`
        )
        setTimeout(() => {
          setSuccessMsg(null)
        }, 5000)
      
    })
    .catch(error => {
      setErrorMsg(
        "Could not add new person"
      )
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
      console.log(error)
    })
    
  }

  const handleNameChange = (event) =>{    
    setNewName(event.target.value)    
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {

    setFilter(event.target.value)

    if (event.target.value.length >= 1){      
      setShowAll(false)      
    }
    else {
      setShowAll(true)
    }    
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterText.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <ErrorNotification msg={errorMsg} />
      <SuccessNotification msg={successMsg} />

      <FilterForm filterText={filterText} handleFilter={handleFilter}/>
        
      <h3>add new</h3>

      <PersonForm name={newName} number={newNumber} checkName={checkName} handleNameChange={handleNameChange} handleNumChange={handleNumChange} />
      
      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} persons={persons} poista={handlePoista}/>
      
    </div>
  )
}

const FilterForm = (props) => {
  return (
    <form>
      <div>
            filter shown with
            <input
            value={props.filterText}
            onChange={props.handleFilter}/>          
      </div>
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.checkName}>
        <div>
          name: <input 
            value={props.name}
            onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input
          value={props.number}
          onChange={props.handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {    
  return (
    <div>
        {props.personsToShow.map((person, i) => <Note key={i} person={person} poista={props.poista} />)}
    </div>
  )
}

const Note = (props) => {      
  return (
  <p> {props.person.name} {props.person.number} <button onClick={() => props.poista(props.person.id)} >delete</button></p>
  )
}

export default App