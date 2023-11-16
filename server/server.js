const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const { response } = require('express')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let rawData = fs.readFileSync('./server/poems.json')
let poems = JSON.parse(rawData).poems
const poemsURL = '/api/poems'
const poemURL = '/api/poems/:id'

//Check header Bob : Bobalooba
const headerBobCheck = (request) => {
    console.log("bob header ", request.header('bob'), request.header("bob") === "Bobalooba")
    return request.header("bob") === "Bobalooba"
}

//GET home
app.get('/', (request, response) => {
    response.send("<h1>Hello World</h1>")
})

//GET all poems
app.get(poemsURL, (request, response) => {
    if(!headerBobCheck(request)){
        console.log("Bad request.")
        response.send(400).end()
    }
    response.json(poems)
    console.log('GET poems!', poems)
})

//GET poem of id
app.get(poemURL, (request, response) => {
    if(!headerBobCheck(request)){
        console.log("Bad request.")
        response.send(400).end()
    }
    const id = Number(request.params.id)
    console.log('GET poem with id: ', id)
    const poem = poems.find(p => p.id === id)
    console.log(poem)
    if(poem){
        response.json(poem)
    } else {
        response.status(404).end()
    }
})

//gernerte a new ID when new poem is added
const generatedId = () => {
    const maxId = poems.length > 0
    ? Math.max(...poems.map(p => p.id))
    : 0
    return maxId + 1
}
//POST added new poem to the poem list
app.post(poemsURL, (request, response) => {
    if(!headerBobCheck(request)){
        console.log("Bad request.")
        response.send(400).end()
    }
    const body = request.body
    console.log(body)
    let aID // if author id is 0 !body.authorid is true.
    console.log("aID", !body.authorid); 
        if(body.authorid === 0){//this is to make fix this issue
            aID = false
        } else {
            aID = !body.authorid
        }
    if(!body.title || !body.author || aID || !body.text){
        return response.status(400).json({
            error: 'Missing information! Title, Author, Author ID and/or poem text is empty!'
        })
    }

    const poem = {
        id: generatedId(),
        title: body.title,
        author: body.author,
        authorid: body.authorid,
        text: body.text,
        vote: 0
    }
    poems = poems.concat(poem)
    console.log('POST: New poem added:', poem)
    response.json(poem)
})

//POST a vote to a poem
app.post(poemURL, (request, response) => {
    if(!headerBobCheck(request)){
        console.log("Bad request.")
        response.send(400).end()
    }
    const id = Number(request.params.id)
    let votes = request.body.votes
    console.log("vote is now ", request.body)
    let poem = poems.find(p => p.id == id)
    console.log(poem)

    if(poem && votes){
      const newVote = {
        id: poem.id,
        title: poem.title,
        author: poem.author,
        authorid: poem.authorid,
        text: poem.text,
        votes: votes
      }

      poems = poems.map(p => p.id !== id ? p : newVote)
      console.log('POST: Vote added for poem: ', newVote)
      response.json(newVote)
    } else {
        console.log('POST: Poem not found! Cannot post vote.')
        response.status(404).end()
    }

})

//PUT edit a poem
app.put(poemURL, (request, response) => {
    if(!headerBobCheck(request)){
        console.log("Bad request.")
        response.send(400).end()
    }
    const id = Number(request.params.id)
    const body = request.body
    console.log('PUT: update, edit a poem of id:', id, body)
    let poem = poems.find(p => p.id === id)
    console.log(poem)

    if(poem){
        let aID // if author id is 0 !body.authorid is true. 
        if(body.authorid === 0){//this is to make fix this issue
            aID = false
        } else {
            aID = !body.authorid
        }
        let bodyId // if author id is 0 !body.authorid is true. 
        if(body.id === 0){//this is to make fix this issue
            bodyId = false
        } else {
            bodyId = !body.id
        }

        if(bodyId || !body.title || !body.author || aID || !body.text){
            return response.status(400).json({
                error: 'Missing information! ID, Title, Author, Author ID and/or poem text is empty!'
            })
        }
        poem = {
            id: body.id,
            title: body.title,
            author: body.author,
            authorid: body.authorid,
            text: body.text,
            votes: body.votes
        }

        poems = poems.map(p => p.id !== id ? p : poem)
        console.log('PUT: edited poem have been updated in the list!', poem)
        response.json(poem)
    } else {
        console.log('PUT: Poem not found!')
        response.status(404).end()
    }
})

//DELETE a poem
app.delete(poemURL, (request, resonse) => {
    if(!headerBobCheck(request)){
        console.log("Bad request.")
        response.send(400).end()
    }
    const id = Number(request.params.id)
    const poem = poems.find(p => p.id === id)

    if(poem){
        poems = poems.filter(p => p.id !== id)
        console.log(`Poem ${id} has been DELETED!`)
        resonse.status(204).end()
    } else {
        console.log('DELETE: poem not found! Cannot delete a poem that does not exist.')
        response.status(404).end()
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})