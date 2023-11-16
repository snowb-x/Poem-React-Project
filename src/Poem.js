//markdown from react
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import React, {useState} from 'react';
//router
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"


const Poem = ({poem, addVote}) => {
  //need to add limit to peom text and a read more button
    const [readMore, setReadMore] = useState(false)
    
    const submitVote = () => {
      console.log("Add Vote to poem ", poem)
      addVote(poem)
    }

    return (
      <ul className="list-unstyled">
        <li><Link to={`/api/poems/${poem.id}`}><h3 className="display-3">{poem.title}</h3></Link></li>
        <li>Author: {poem.author}</li>
        {readMore
          ? <li><ReactMarkdown className="lead">{poem.text}</ReactMarkdown> <button type="button" className="btn btn-outline-secondary" onClick={()=>setReadMore(!readMore)}>Collapse</button></li>
          : <li><ReactMarkdown className="lead">{poem.text.substr(0,300)}</ReactMarkdown> ... <button type="button" className="btn btn-outline-secondary" onClick={()=>setReadMore(!readMore)}>read more</button></li>
        }
        <li>Votes: {poem.votes}  <button type="button" className="btn btn-secondary" onClick={submitVote}>+ Vote</button></li>
      </ul>
    )
}

export default Poem