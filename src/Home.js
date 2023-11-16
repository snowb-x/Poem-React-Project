//import poemlist.js to display the list of poems
import PoemList from './PoemList'

const Home = ({poems, addVote, addPoemError, setAddPoemError, redirect, setRedirect}) => {
    if(redirect){
        setRedirect(false)
    }
    if(addPoemError){
        setAddPoemError(false)
    }
    return (
    
    <div className="container">
        <div className="row mx-auto">
            <h1>Poem World</h1>
            <PoemList poems={poems} addVote={addVote}/>
        </div>
    </div>
    )
}

export default Home