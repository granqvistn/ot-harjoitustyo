import React from 'react'
const reducer = (accumulator, currentValue) => accumulator + currentValue
const Course = (props) => {  
   return(
     <div>
     <Header course={props.course} />
     <Content course={props.course}/>
     <Total course={props.course} />
     </div>
   )
    
}
  
  
const Header = (props) => {
  return (
    <div>
      <h2>{props.course.name}</h2>
    </div>
  )
}

const Content = (props) => {  
  return (
    <div>      
      {props.course.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}


const Total = (props) => {

  var arr = []
  for (let i = 0; i < props.course.parts.length; i++){
    arr.push(props.course.parts[i].exercises)
  }

  return (
    <div>
      <p><strong>total of {arr.reduce(reducer)} exercises</strong></p>
    </div>
  )
}

const Part = (props) =>{
  return (    
    <p>{props.part.name} {props.part.exercises}</p>    
  )
}

export default Course