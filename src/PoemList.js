import Poem from './Poem.js'

const PoemList = (props) => {
    const {poems, addVote} = props
    return(
    <ul className="list-group">{poems.map(p => 
        <li key={p.id} className="list-group-item">
          <Poem poem = {p} addVote={addVote}/>
        </li>)}  
      </ul>
    )
  }

  export default PoemList