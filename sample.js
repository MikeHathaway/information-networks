

function selectBooks(){}
function selectAuthors(){}

module.exports = {
  selectBooks,
  selectAuthors
}


function bookPageControlFlow(){
  return Promise.all([selectBooks(),selectAuthors()])
    .then()
    .catch()
}
