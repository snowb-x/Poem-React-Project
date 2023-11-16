//markdown from react
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import React, { useState } from 'react'

//react router manage web pages
import {useParams} from "react-router-dom"
import PoemEdit from './PoemEdit.js'

const PoemView = ({poems, addVote, editPoem, deletePoem, setRedirect}) => {
    //display individual poem
    //added vote
    const [editMode, setEditMode] = useState(false)
    const id = Number(useParams().id)
    const poem = poems.find(p => p.id === id)

    const deleteHandler = () => {
        console.log('delete button is pressed for: ', id)
        setRedirect(true)
        deletePoem(id)
    }
  
    const editHandler = () => {
        console.log("edit button has been pressed for id:", id)
        setEditMode(true)
    }

    const submitVote = () => {
        console.log("Add Vote to poem ", poem)
        addVote(poem)
    }

    if (poem){
        console.log("poem is ", poem)
        if(editMode){
            console.log("edit poem here");
            return(<PoemEdit poem={poem} editPoem={editPoem} setEditMode={setEditMode}/>)  
        } else {
            return(
                <div className="container">
                    <div className="row gap-3">
                    <ul className="list-unstyled">
                        <li className="list-group-item"><h3>{poem.title}</h3></li>
                        <li className="list-group-item">Author: {poem.author}</li>
                        <li className="list-group-item"><ReactMarkdown>{poem.text}</ReactMarkdown></li>
                        <li className="list-group-item">Vote: {poem.votes} <button type="button" className="btn btn-secondary" onClick={submitVote}>+ Vote</button></li>
                        <button type="button" className="col btn btn-success" onClick={editHandler}>Edit</button>
                        <button type="button" className="col btn btn-danger" onClick={deleteHandler}>Delete</button>
                    </ul>
                    </div>
                </div>
            )
        }
    }
    return setRedirect(true)
}  

export default PoemView