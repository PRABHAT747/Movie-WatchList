let inputEl = document.getElementById('in');
let buttonEl =document.getElementById('search')
let movieEl = document.getElementById('list')

let mainEl = document.getElementById('main')
let topmovEl = document.getElementById('topmov')
let titleEl = document.getElementById('title')
let btninp = document.getElementById('btninp')
let wait = false;
let array = []



async function getmovieList(imb){
  const response =  await  fetch(`http://www.omdbapi.com/?apikey=b483166d&i=${imb.imdbID}`)
  const info = await response.json()
  return getcontent(info)
        }

async function getmovie(){
    if(wait===true)
    {
      loading()
    }
try{
  
    //console.log(inputEl + "turn")
    const response  =  await fetch(`http://www.omdbapi.com/?apikey=b483166d&s=${inputEl.value}`)
    let tempstr=``
   
    const info = await response.json()
        for(let imb of info.Search){
        tempstr+=await getmovieList(imb)
        //console.log(tempstr)
        //console.log(fata)
        }
        wait=false;
       
movieEl.innerHTML = tempstr; 

       
    }catch(err){
            if(!inputEl.value){
                document.querySelector('.loaing').innerHTML =`<p class="error">Unable to proceed without any name</p>`
            }
            else{
            wait=!wait
            document.querySelector('.loaing').innerHTML=`<p class="error">Something Went Wrong</p>`
           
         }
    }
}
buttonEl.addEventListener('click',async function(){
    wait= true;
    await getmovie() 
    let WatchlistEl =document.querySelector('.movie-list')
    WatchlistEl.addEventListener('click',async function(e){
        if(e.target.id){
        document.getElementById(e.target.id).innerText="✔️Added";
        if(!array.includes(e.target.id)){
            array.push(e.target.id)
            localStorage.setItem("array",JSON.stringify(array))
            }
    }
})
  
    })

inputEl.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      buttonEl.click()
    }
  });

function getcontent(data){

let inner = `
<div class = "movie-main">
        <div class = "movie-image">
            <img src="${data.Poster}">
        </div>
        <div class = "movie-info">
            <div class="title-rating">
                <p class="movie-name">${data.Title}</p>
                <p class="movie-rating">⭐${data.imdbRating}</p>
            </div>
            <div class="time-genre-btn">
                <p class="time">${data.Runtime}</p>
                <p class ="genre">${data.Genre}</p>
                <p class="btn join" id ="${data.imdbID}">+Watchlist</p>
            </div>
            <div class="plot-container">
            <p class="plot">${data.Plot}</p>
            </div>
        </div>
</div>        
`
return inner
}

function loading(){
    movieEl.innerHTML=`<div class= "loaing">
    <h1 class = "loaf">Please Wait!</h1>
    <?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns:svg="http://www.w3.org/2000/svg" 
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    version="1.0" width="160px" height="20px" viewBox="0 0 128 16" 
    xml:space="preserve"><path fill="#ff94ff" d="M6.4,4.8A3.2,3.2,0,1,1,3.2,8,3.2,3.2,0,0,1,6.4,4.8Zm12.8,0A3.2,3.2,0,1,1,16,8,3.2,3.2,0,0,1,19.2,4.8ZM32,4.8A3.2,3.2,0,1,1,28.8,8,3.2,3.2,0,0,1,32,4.8Zm12.8,0A3.2,3.2,0,1,1,41.6,8,3.2,3.2,0,0,1,44.8,4.8Zm12.8,0A3.2,3.2,0,1,1,54.4,8,3.2,3.2,0,0,1,57.6,4.8Zm12.8,0A3.2,3.2,0,1,1,67.2,8,3.2,3.2,0,0,1,70.4,4.8Zm12.8,0A3.2,3.2,0,1,1,80,8,3.2,3.2,0,0,1,83.2,4.8ZM96,4.8A3.2,3.2,0,1,1,92.8,8,3.2,3.2,0,0,1,96,4.8Zm12.8,0A3.2,3.2,0,1,1,105.6,8,3.2,3.2,0,0,1,108.8,4.8Zm12.8,0A3.2,3.2,0,1,1,118.4,8,3.2,3.2,0,0,1,121.6,4.8Z"/><g><path fill="#ff00ff" d="M-42.7,3.84A4.16,4.16,0,0,1-38.54,8a4.16,4.16,0,0,1-4.16,4.16A4.16,4.16,0,0,1-46.86,8,4.16,4.16,0,0,1-42.7,3.84Zm12.8-.64A4.8,4.8,0,0,1-25.1,8a4.8,4.8,0,0,1-4.8,4.8A4.8,4.8,0,0,1-34.7,8,4.8,4.8,0,0,1-29.9,3.2Zm12.8-.64A5.44,5.44,0,0,1-11.66,8a5.44,5.44,0,0,1-5.44,5.44A5.44,5.44,0,0,1-22.54,8,5.44,5.44,0,0,1-17.1,2.56Z"/><animateTransform attributeName="transform" type="translate" values="23 0;36 0;49 0;62 0;74.5 0;87.5 0;100 0;113 0;125.5 0;138.5 0;151.5 0;164.5 0;178 0" calcMode="discrete" dur="1170ms" repeatCount="indefinite"/></g></svg>
    </div>
    `
}

 
