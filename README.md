# individual-project-SandraTrinh
individual-project-SandraTrinh created by GitHub Classroom

# COMP3120 Individual Web Development Assignment 1

This is the repository for Sandra Trinh's individual web assignment 1

Name: Sandra Trinh

Student Number: 45915881

Studnet email: sandra.trinh@students.mq.edu.au

# Heroku 
web link: https://comp3120-individual-dev-poems.herokuapp.com/


# Express API Server for POEMS

server URL: https://localhost:3001

special header:

bob : Babalooba

server/server.js
- GET /api/poems - returns a list of poem records
- GET /api/poems/:id - returns the record for the poem with the given id
- POST /api/poems - adds a new poem to the collection, POST body is the poem JSON without the id or votes fields, response includes the new poem id
- POST /api/poems/:id - adds an upvote for the poem with the given id
- PUT /api/poems/:id - edit poem data for the poem with the given id
-DELET /api/poems/:id - remove the poem with the given id

server/poems.json
- Poems records have id, author, title, text and votes fields. id is a unique integer id; votes is an integer count of upvotes for the poem; the remaining fields are text.

# Pages 
Each poem page has an upvote button to record votes for the poem, clicking the button sends a request to the API to add to the votes for the poem

./Home.js
- The front page displays a list of poem previews showing the first few lines of each poem. The poems displayed are those that are most highly rated (most votes).
- Clicking on a poem title (or maybe on the poem or a button saying "read more...") navigates to a page for that poem showing the whole text of the poem, nicely formatted

./PoemForm.js
- There is a link in the site navigation to a form to add a new poem, once the fields are completed and the user clicks submit, the form is sent to the backend, if all goes well, the new poem is shown on it's own page

./PoemView.js
- Poem texts are written using Markdown and when displayed on the page, the Markdown is interpreted to give a nice layout (eg. using the react-markdown package) (note that to create line breaks you end a line with two spaces, you could refer your users to https://www.markdownguide.org/basic-syntax/ for reference)
