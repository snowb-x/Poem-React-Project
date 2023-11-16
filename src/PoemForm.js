import React, { useState } from 'react' 
import ReactMarkdown from 'react-markdown' 

const PoemForm = ({createPoem, addPoemError, setAddPoemError, setRedirect}) => {

    const initialState = {title: '', author: '', authorid: 0, text: ''}

    const [formInfo, setFormInfo] = useState(initialState)

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
        createPoem(formInfo)
        setFormInfo(initialState)
        setRedirect(true)
    }

    return (
        <div className="container">
            <form onSubmit={formHandler}>
            <div className="mb-3">
                <label htmlFor='title' className="form-label">Poem Title</label>
                <input name='title' className="form-control" onChange={inputHandler} required></input>
            </div>
            <div className="col-md-6">
                <label htmlFor='author' className="form-label">Author</label>
                <input name='author' className="form-control" onChange={inputHandler} required></input>
            </div>
            <div className="col-md-3">
                <label htmlFor='authorid' className="form-label">Author ID</label>
                <input name='authorid' type='number' className="form-control" onChange={inputHandler} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor='text' className="form-label">Poem Text</label>
                <textarea name='text' className="form-control" rows="10" cols="50" onChange={inputHandler} required></textarea>
            </div>
                <button type='submit' className="col btn btn-success">Add Poem</button>
                {addPoemError ? <p>Error! Missing information</p> : <p></p>}
            </form>
            <p>**Note: use mark down syntax to format your text. Refer to mark down guide for baic syntax.</p>  
            <a href="https://www.markdownguide.org/basic-syntax/" target="_blank">https://www.markdownguide.org/basic-syntax/</a>
        </div>
    )
}

export default PoemForm
