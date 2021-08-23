let gifs = []
//Get the current value of savedGIFs parsed to array or make an empty array
const saved = JSON.parse(localStorage.getItem('saved')) || []

//Make event listener for searchGIPHY button
document.getElementById('searchGIPHY').addEventListener('click', event =>{
  //Prevent page refresh
  event.preventDefault()
  //Create variable of search form imput value
  const search = document.getElementById('gif').value
  //Query api with get function usin˜g axios
  axios.get(`https://api.giphy.com/v1/gifs/search?api_key=Y83aIFrxFBZ0o4llJ1rN0t9mbUE6sEbV&limit=20&q=${search}&rating=g`)
    .then(res => {
      //gifs are under res.data.data after console logging res we now know
      //Set variable to target gifs array in GIPHY API
      gifs = res.data.data
      //Make inner html of gifs empty
  document.getElementById('gifs').innerHTML = ''
      //loop over gifs
      gifs.forEach(gif => {
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
        //Give save button a class of "saveGIF"
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
              class="btn btn-success saveGIF"
              data-id="${gif.id}"
              >
              Save
              </button>
          </div>
        `
        //Append cards the div with the name "gifs"
        document.getElementById('gifs').append(gifElem)
      })
      document.getElementById('gif').value = ''
    })
    .catch(err => console.error(err))
})
//Add event listener
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

//Add click event listener to document
document.addEventListener('click', event=> {
//Add logic that executes when the target's class list contains saveGIF
  if(event.target.classList.contains('saveGIF')){
  //Find gif with ID and save it to local storage
    const gif = gifs.filter(gif => gif.id ===event.target.dataset.id)[0]
    //push if to array with "gif" variable name
    saved.push(gif)
    //Save item as string in local storage with key "saved"
    localStorage.setItem('saved', JSON.stringify(saved))
    //Remove from page the gif card by removing parent of parent of save button which is the card div
    event.target.parentNode.parentNode.remove()
  }
}) 