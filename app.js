/**
 * DOM Variables
 */

const main = document.querySelector('#movies-Container')
// const infoBtn = document.querySelectorAll('.info_btn');
// console.log(infoBtn);

/**
 * Fetch movies api according to category, searches
 * 
 */

// most popular/latest movies url
const mostPopularMovieURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
// action movies url
const actionMoviesURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&with_genres=28";
// romance movies url
const romanceMoviesURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&with_genres=10749";
// comedy movies url
const comedyMoviesURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&with_genres=35";
// horror movies url
const horrorMoviesURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&with_genres=27";
// sci-fi movies url
const scifiMoviesURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&with_genres=878";
// animation movies url
const animationMoviesURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&with_genres=16";

const IMGPATH = "http://image.tmdb.org/t/p/w1280";


function displayMovies(respData, cardDisplay) {
    return respData.results.forEach(movie => {
        const {poster_path, title, vote_average, overview, id} = movie;

        async function getMovieDetail(id){
            const cast = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f441110fce33369a3556c8129b731986`);
            // const cast = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&with_genres=16");
            const castData = await cast.json();
            const castCrew = (castData.cast);
            

            const movieCard = document.createElement('div');
            movieCard.classList.add('movieCard')
            movieCard.innerHTML = `
            <div>
                <img src="${IMGPATH + poster_path}" alt="testing">
            </div>
            <div class="title">
                <h4>${title}</h4>
                <span>${vote_average}</span>
            </div>
            <div class="button-Container">
                <button class="info_btn">Movie Info</button>
                <button class="trailer_btn"><a href="https://www.youtube.com/results?search_query=${title + ' trailer'}" target="_blank">Watch Trailer</a></button>
                <button class="stream_btn"><a href="https://azm.to/search/${title}" target="_blank">Stream</a></button>
            </div>
            <section id="popup-Container" class="off-display">
                <button id="close_btn">X</button>
                <div class="movieCard">
                    <div class="movieInfo">
                        <img src="${IMGPATH + poster_path}" alt="${title}">
                        <h4>${title}<span>${vote_average}</span></h4>
                    </div>
                    <div class="overview">
                        <p>${overview}</p> 
                    </div>
                    <div class="actors-Container">
                        <div>
                            <img src="${IMGPATH + castCrew[0].profile_path}" alt="test">
                            <h3>${castCrew[0].name}</h3>
                            <p><span>as </span>${castCrew[0].character}</p>
                        </div>
                        <div>
                            <img src="${IMGPATH + castCrew[1].profile_path}" alt="test">
                            <h3>${castCrew[1].name}</h3>
                            <p><span>as </span>${castCrew[1].character}</p>
                        </div>
                        <div>
                            <img src="${IMGPATH + castCrew[2].profile_path}" alt="test">
                            <h3>${castCrew[2].name}</h3>
                            <p><span>as </span>${castCrew[2].character}</p>
                        </div>
                        <div>
                            <img src="${IMGPATH + castCrew[3].profile_path}" alt="test">
                            <h3>${castCrew[3].name}</h3>
                            <p><span>as </span>${castCrew[3].character}</p>
                        </div>
                    </div>
                    <div class="button-Container">
                        <button class="stream_btn"><a href="https://azm.to/search/${title}" target="_blank">Stream</a></button>
                        <button class="trailer_btn"><a href="https://www.youtube.com/results?search_query=${title + ' trailer'}" target="_blank">Watch Trailer</a></button>
                    </div>
                </div>
            </section>
            `
            cardDisplay.appendChild(movieCard)
            }
            getMovieDetail(id);
        });
}

//display latest movies
async function getMostPopularMovies () {
    const resp = await fetch(mostPopularMovieURL);
    const respData = await resp.json();
    // console.log(respData);
    const cardDisplay = document.querySelector('#latestMovies .cardDisplay');
    displayMovies(respData, cardDisplay);
};

//display action movies
async function getActionMovies(){
    const resp = await fetch(actionMoviesURL);
    const respData = await resp.json();

    const cardDisplay =  document.querySelector('#actionMovies .cardDisplay');
    displayMovies(respData, cardDisplay);
}

//display romance movies
async function getRomanceMovies(){
    const resp = await fetch(romanceMoviesURL);
    const respData = await resp.json();

    const cardDisplay =  document.querySelector('#romanceMovies .cardDisplay');
    displayMovies(respData, cardDisplay);
}

//display comedy movies
async function getComedyMovies(){
    const resp = await fetch(comedyMoviesURL);
    const respData = await resp.json();

    const cardDisplay =  document.querySelector('#comedyMovies .cardDisplay');
    displayMovies(respData, cardDisplay);
}

//display horror movies
async function getHorrorMovies(){
    const resp = await fetch(horrorMoviesURL);
    const respData = await resp.json();

    const cardDisplay =  document.querySelector('#horrorMovies .cardDisplay');
    displayMovies(respData, cardDisplay);
}

//display sci-fi movies
async function getSciFiMovies(){
    const resp = await fetch(scifiMoviesURL);
    const respData = await resp.json();

    const cardDisplay =  document.querySelector('#scifiMovies .cardDisplay');
    displayMovies(respData, cardDisplay);
}

//display animation movies
async function getAnimationMovies () {
    const resp = await fetch(animationMoviesURL);
    const respData = await resp.json();
    console.log(respData);
    const cardDisplay = document.querySelector('#animationMovies .cardDisplay');
    displayMovies(respData, cardDisplay);
};


getMostPopularMovies();
getActionMovies();
getRomanceMovies();
getComedyMovies();
getHorrorMovies();
getSciFiMovies();
getAnimationMovies();


/**
 * FUNCTIONALITY for MOVIE INFO
 *
 */

 //when an item is clicked, this returns a standard array of the classlist existing for such item
function arrayedClassLIst(e) {
    let item = e.target;
    arrayedItem = Array.from(item.classList);
}
// setInterval(() => {
//     const infoBtn = document.querySelectorAll('.info_btn')
// }, interval);
// infoBtn.forEach(button => {
//     button.addEventListener('click', showInfo);
//     function showInfo(){
//         alert('button clicked');
//     }
// })
main.addEventListener('click', showInfo)
function showInfo(e) {
    arrayedClassLIst(e)
    if(arrayedItem.includes('info_btn')){
        // alert('clicked');
        let item =e.target
        infoCard = item.parentElement.nextSibling.nextSibling;
        infoCard.classList.remove('off-display');
    }
}