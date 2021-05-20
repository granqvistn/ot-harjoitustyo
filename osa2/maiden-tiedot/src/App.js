import React, {useState, useEffect} from 'react'
import axios from 'axios'



function App() {

  const [maat, setMaat] = useState([])
  const [haku, setHaku] = useState([])
 
  
  useEffect(() => {
    axios
     .get('https://restcountries.eu/rest/v2')
     .then(response => {
       setMaat(response.data)
     })
  }, [])

  const checkMaat = (event) => {
    let arr = maat.filter(maa => maa.name.toLowerCase().includes(event.target.value.toLocaleLowerCase()))
    setHaku(arr)           
  }

  const handleClick = (props) => {
    setHaku([props])    
  }

  const Listing = (props) => {
    return(
      <div>
        <p>{props.maa.name} <button onClick={() => handleClick(props.maa)} id={props.maa.name}>show</button></p>        
      </div>
    )
  }

  const CountryInfo = (props) => {
    return(
      <div>
          <h1>{props.country.name}</h1>
          <p>capital {props.country.capital} </p>
          <p>population {props.country.population} </p>
          <h2>languages </h2>
          <ul>
            {props.country.languages.map(kieli => <li key ={kieli.name}> {kieli.name}</li>)}
          </ul>
          <img src={props.country.flag} alt='Flag' />         
        </div>
    )
  }

  const Tulostus = () => {
    
    
    if (haku.length > 10){
      return <p>Too many matches, specify another filter</p>
    }

    else if (haku.length === 1){
      return (
        <div>
          {<CountryInfo country={haku[0]} /> }
        </div>        
      )          
    }

    else if( 1 < haku.length < 10){
      return (
        <form>
          <div>
            {haku.map(maa => 
              <Listing key={maa.name} maa={maa} />)}
          </div>
        </form>
      )      
    }    
  }

  return (
    <div>
      <form>
        <div>
          find countries
          <input             
            onChange={checkMaat}/>
        </div>
      </form>
      <div>
        <Tulostus maat={maat} />
      </div>
    </div>
  );
}

export default App;
