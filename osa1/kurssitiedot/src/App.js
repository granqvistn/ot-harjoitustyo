import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}



const Content = (props) => {
  return (
    <div>
      <Part osa={props.course.parts[0].name} lkm={props.course.parts[0].exercises} />
      <Part osa={props.course.parts[1].name} lkm={props.course.parts[1].exercises} />
      <Part osa={props.course.parts[2].name} lkm={props.course.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[2].exercises + props.course.parts[1].exercises}</p>
    </div>
  )
}

const Part = (props) =>{
  return (
    <div>
      <p>{props.osa} {props.lkm}</p>
    </div>
  )
}

export default App