import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const PoemEdit = ({poem, editPoem, setEditMode}) => {
  
    const [formInfo, setFormInfo] = useState(poem)

    const inputHandler = (event) => {
        const input = event.target.attributes.name.value
        console.log(input, event.target.value)

        if(input === "title") {
            setFormInfo({...formInfo, title: event.target.value})
        } else if (input === "author"){
            setFormInfo({...formInfo, author: event.target.value})
        } else if (input === "authorid"){
            setFormInfo({...formInfo, authorid: event.target.value})
        } else if (input === "text"){
            setFormInfo({...formInfo, text: event.target.value})
        }
        console.log("setFormInfo")
    }

    const formHandler = (event) => {
        event.preventDefault()
        console.log("Form submitted: ", formInfo);
        editPoem(formInfo)
        setFormInfo(formInfo)
        setEditMode(false)
    }

    return (
        <div className="container">
            <form onSubmit={formHandler}>
                <div className="mb-3">
                    <label htmlFor='title' className="form-label" >Poem Title</label>
                    <input value={formInfo.title} name='title' className="form-control" onChange={inputHandler} required></input>
                </div>
                <div className="col-mb-6">
                    <label htmlFor='author' className="form-label" >Author</label>
                    <input value={formInfo.author} name='author' className="form-control" onChange={inputHandler} required></input>
                </div>
                <div className="col-mb-3">
                    <label htmlFor='authorid' className="form-label" >Author ID</label>
                    <input value={formInfo.authorid} name='authorid' type='number' className="form-control" onChange={inputHandler} required></input>
                </div>
                <div className="mb-3">
                    <label htmlFor='text' className="form-label">Poem Text</label>
                    <textarea value={formInfo.text} name='text' className="form-control" rows="10" cols="50" onChange={inputHandler} required></textarea>
                </div>
                    <button type='submit' className="col btn btn-success">Submit Edit</button>
            </form>
            <p>**Note: use mark down syntax to format your text. Refer to mark down guide for baic syntax.</p>  
            <a href="https://www.markdownguide.org/basic-syntax/" target="_blank">https://www.markdownguide.org/basic-syntax/</a>
    </div>
    )
}

export default PoemEdit