import './App.css';
import React, {useState,useEffect} from 'react';
//react router manage web pages
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect
} from "react-router-dom"

//import peoms service to send request to server
import PoemsService from './services/poems.js'
//import pages home, poem, addPoem
import Home from './Home.js'
import PoemView from './PoemView.js'
import PoemForm from './PoemForm.js'

function App() {

  //set poems list
  const [poems, setPoems] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [addPoemError, setAddPoemError] = useState(false)

  //get all poems
  useEffect(() => {
    console.log("effect is being run")
    PoemsService.getAll()
    .then(response => {
      console.log("we have a respinse", response);
      setPoems(response)
    })
  },
  []);

  //added new poem
  const addPoem = (content) => {
    PoemsService.create(content)
    .then(object => {
      console.log("POST resonse data", object)
      setPoems(poems.concat(object))
      console.log("A new poem has been added");
    })
    .catch(error => {
      console.log(error.response.data)
      setAddPoemError(true)
    })
  }

  //add a vote to a poem
  const addVote = (content) => {
    PoemsService.vote(content)
    .then(object => {
      console.log("POST a vote to poem ", object)
      setPoems(poems.map(p => p.id !== content.id ? p : object))
    })
    .catch(error => {
      console.log(error)
      if(error.response.status === 404){
        console.log('Fail to add vote. Poem cannot be found!', error.response.status)
      } else {
        console.log("error!", error.response.status)
      }
    })
  }

  //edit poem data
  const editPoem = (content) => {
    PoemsService.editPoem(content)
    .then(object => {
      console.log("PUT request response", object)
      setPoems(poems.map(p => p.id !== content.id ? p : object))
      console.log("unit has been edited", content.id)
    })
    .catch(error => {
      console.log(error)
      if(error.response.status === 404){
        console.log('Fail to edit. Poem cannot be found!', error.response.status)
      } else if (error.response.status === 400){
        console.log('Missing information input. Bad request.', error.response.status)
      } else {
        console.log("error!", error.response.status)
      }
    })
  }

  //delete Poem
  const deletePoem = (id) => {
    PoemsService.deletePoem(id)
    .then(object => {
      console.log("DELETE response", object)
      setPoems(poems.filter(p => p.id !== id))
      console.log("Poem has been deleted", id)
    })
    .catch(error => {
      console.log(error)
      if(error.response.status === 404){
        console.log('Fail to delete. Poem cannot be found!', error.response.status)
      } else {
        console.log("error!", error.response.status)
      }
      
    })
  }

  const getMaxID = () => {
    const maxId = poems.length > 0
    ? Math.max(...poems.map(p => p.id))
    : 0
    return toString(maxId)
}

  return (
      <Router>
        <header>

        </header>

        <div className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/poemForm">Add Poem</Link>
                </li>
              </ul>
           
          </div>
        </div>

        <Switch>
          <Route path="/poemForm">
            {redirect ? <Redirect to="/" />:<PoemForm createPoem={addPoem} addPoemError={addPoemError} setAddPoemError={setAddPoemError} setRedirect={setRedirect}/>}
          </Route>
          <Route path="/api/poems/:id">
            {redirect ? <Redirect to="/" />:<PoemView poems={poems} addVote={addVote} editPoem={editPoem} deletePoem={deletePoem} setRedirect={setRedirect}/>}
          </Route>
          <Route path="/">
          <Home poems={poems} addVote={addVote} addPoemError={addPoemError} setAddPoemError={setAddPoemError} redirect={redirect} setRedirect={setRedirect}/>
          </Route>
        </Switch>
      </Router>
  )
}

export default App;
