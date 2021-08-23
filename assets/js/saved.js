//Get saved array
let saved = JSON.parse(localStorage.getItem('saved'))  || []
//If saved array is empty then display the "no GIFs to display" message
if(saved.length !== 0){
  document.getElementById('gifs').innerHTML = ''



//Loop over saved array
saved.forEach(gif => {
  //Create div with gifElem variable name every time looped
  const gifElem = document.createElement('div')
  //Set car classes for outer styles and layout 
  gifElem.className = 'card col-sm-3 gif bg-dark'
  //Set div element created above's inner html to the card inner layout and styles and set image source to new array's 
  //res.data.data.images.original_still.url value
  //set the title of the card to the res.data.data.title from gif array
  //Make attributs of your own (using "data-someAttribute" syntax) to toggle animation with 
  //data-animated and data-still attributes
  //Add class called "gifClick" to toggle animation
  //Give remove button a class of "removeGIF"
  gifElem.innerHTML = `
  <img
    src="${gif.images.original_still.url}"
    class="card-img-top gifClick"
    alt="${gif.title}"
    data-still="${gif.images.original_still.url}"
    data-animated="${gif.images.original.url}">
  <div class="card-body">
    <h5 class="card-title">${gif.title}</h5>
    <button
    href="#"
    class="btn btn-danger removeGIF"
    data-id="${gif.id}"
    >
    Delete
    </button>
  </div>
  `
        //Append cards the div with the name "gifs"
        document.getElementById('gifs').append(gifElem)
})
}

document.addEventListener('click', event =>{
  //check to see if targeted object has class name of "gifClick"
  if (event.target.classList.contains('gifClick')) {
  //If the clicked image's src is the value of data property of data-still=""
    if(event.target.src === event.target.dataset.still){
      //Swap the image src from the value of data-still to data-animated
      event.target.src = event.target.dataset.animated
    } else {
    //If image src is the value of data-animated set it value of data-still
      event.target.src = event.target.dataset.still
    }
  }
})
//Add event listener for when page is clicked
document.addEventListener('click', event => {
//If clicking on delete button with class list "removeGIF"
  if (event.target.classList.contains('removeGIF')) {
    //Filter out everything but the one matched
    saved = saved.filter(gif => gif.id !== event.target.dataset.id)
    //Stringify saved array
    localStorage.setItem('saved',JSON.stringify(saved))
    //Remove item
    event.target.parentNode.parentNode.remove()

  }
})