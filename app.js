/**
 * DOM Variables
 */

const main = document.querySelector('#movies-Container');
const textHolder = document.querySelector('.textHolder');
const seeAllLatest = document.querySelector('#latestMovies .categoryIntro a');
const seeAllAction = document.querySelector('#actionMovies .categoryIntro a');
const seeAllRomance = document.querySelector('#romanceMovies .categoryIntro a');
const seeAllComedy = document.querySelector('#comedyMovies .categoryIntro a');
const seeAllHorror = document.querySelector('#horrorMovies .categoryIntro a');
const seeAllSciFi = document.querySelector('#scifiMovies .categoryIntro a');
const seeAllAnimation = document.querySelector('#animationMovies .categoryIntro a');

const searchForm = document.querySelector('#search-container form');
const searchInput = document.querySelector('#search');

/**
 * Fetch movies api according to category, searches
 * 
 */

// most popular/latest movies url/searchURL
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

// search movies URL
const searchURL = "https://api.themoviedb.org/3/search/movie?&api_key=f441110fce33369a3556c8129b731986&query="

// for getting absolute path for images gotten from the tmdb api
const IMGPATH = "http://image.tmdb.org/t/p/w1280";

 

/** DISPLAY MOVIES
 * Function generates movies and decide where to put it
 * and no of movies to generate at a time.
 */
function displayMovies(respData, cardDisplay, noOfMovies) {
    return respData.results.slice(0, noOfMovies).forEach(movie => {
        const {poster_path, title, vote_average, overview, id} = movie;

        async function getMovieDetail(id){
            const cast = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f441110fce33369a3556c8129b731986`);
            const castData = await cast.json();
            const castCrew = (castData.cast);
            

            const movieCard = document.createElement('div');
            movieCard.classList.add('movieCard')
            movieCard.innerHTML = `
            <div>
                <img src="${IMGPATH + poster_path}" alt="${title}" loading="lazy">
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
                <button class="close_btn">X</button>
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
                            <img src="${IMGPATH + castCrew[0].profile_path}" alt="${castCrew[0].name}">
                            <h3>${castCrew[0].name}</h3>
                            <p><span>as </span>${castCrew[0].character}</p>
                        </div>
                        <div>
                            <img src="${IMGPATH + castCrew[1].profile_path}" alt="${castCrew[0].name}">
                            <h3>${castCrew[1].name}</h3>
                            <p><span>as </span>${castCrew[1].character}</p>
                        </div>
                        <div>
                            <img src="${IMGPATH + castCrew[2].profile_path}" alt="${castCrew[0].name}">
                            <h3>${castCrew[2].name}</h3>
                            <p><span>as </span>${castCrew[2].character}</p>
                        </div>
                        <div>
                            <img src="${IMGPATH + castCrew[3].profile_path}" alt="${castCrew[0].name}">
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


/**
 * CATEGORY FUNCTIONS
 * Functions below get data for each movie category
 */
//display latest movies
async function getMostPopularMovies (position) {
    const resp = await fetch(mostPopularMovieURL);
    const respData = await resp.json();
    // console.log(respData);
    const cardDisplay = document.querySelector(position);
    displayMovies(respData, cardDisplay, 10);
};

//display action movies
async function getActionMovies(position){
    const resp = await fetch(actionMoviesURL);
    const respData = await resp.json();

    const cardDisplay =  document.querySelector(position);
    displayMovies(respData, cardDisplay, 10);
}

//display romance movies
async function getRomanceMovies(position){
    const resp = await fetch(romanceMoviesURL);
    const respData = await resp.json();

    const cardDisplay =  document.querySelector(position);
    displayMovies(respData, cardDisplay, 10);
}

//display comedy movies
async function getComedyMovies(position){
    const resp = await fetch(comedyMoviesURL);
    const respData = await resp.json();

    const cardDisplay =  document.querySelector(position);
    displayMovies(respData, cardDisplay, 10);
}

//display horror movies
async function getHorrorMovies(position){
    const resp = await fetch(horrorMoviesURL);
    const respData = await resp.json();

    const cardDisplay =  document.querySelector(position);
    displayMovies(respData, cardDisplay, 10);
}

//display sci-fi movies
async function getSciFiMovies(position){
    const resp = await fetch(scifiMoviesURL);
    const respData = await resp.json();

    const cardDisplay =  document.querySelector(position);
    displayMovies(respData, cardDisplay, 10);
}

//display animation movies
async function getAnimationMovies (position) {
    const resp = await fetch(animationMoviesURL);
    const respData = await resp.json();

    const cardDisplay = document.querySelector(position);
    displayMovies(respData, cardDisplay, 20);
};



//Generate Initial Page Content
getMostPopularMovies('#latestMovies .cardDisplay');
getActionMovies('#actionMovies .cardDisplay');
getRomanceMovies('#romanceMovies .cardDisplay');
getComedyMovies('#comedyMovies .cardDisplay');
getHorrorMovies('#horrorMovies .cardDisplay');
getSciFiMovies('#scifiMovies .cardDisplay');
getAnimationMovies('#animationMovies .cardDisplay');


/**
 * FUNCTIONALITY for MOVIE INFO
 *
 */

 //when an item is clicked, this returns a standard array of the classlist existing for such item
function arrayedClassLIst(e) {
    let item = e.target;
    arrayedItem = Array.from(item.classList);
}

main.addEventListener('click', showInfo)
function showInfo(e) {
    arrayedClassLIst(e)
    if(arrayedItem.includes('info_btn')){
        // alert('clicked');
        let item = e.target
        let infoCard = item.parentElement.nextSibling.nextSibling;
        infoCard.classList.remove('off-display');
    }
    if(arrayedItem.includes('close_btn')){
        let item = e.target
        let infoCard = item.parentElement;
        infoCard.classList.add('off-display')
    }
}



/**
 * SEE ALL FUNCTIONS
 * Functionality for SEE ALL LINKS 
 */

// Template function for generating a category content
async function seeAll(category, categoryURL) {
    textHolder.innerHTML = `
        <h3 class="categoryTitle">${category}</h3>
    `;
    main.innerHTML = ''
    
    const resp = await fetch(categoryURL);
    const respData = await resp.json();

    displayMovies(respData, main, 20);
    main.classList.add('wrap');
}

//Latest Movie See All function
seeAllLatest.addEventListener('click', e => {
    e.preventDefault();
    seeAll('Latest', mostPopularMovieURL);
});

//Action Movie See All function
seeAllAction.addEventListener('click', e => {
    e.preventDefault();
    seeAll('Action', actionMoviesURL);
});

//Romance Movie See All function
seeAllRomance.addEventListener('click', e => {
    e.preventDefault();
    seeAll('Romance', romanceMoviesURL);
});

//Comedy Movie See All function
seeAllComedy.addEventListener('click', e => {
    e.preventDefault();
    seeAll('Comedy', comedyMoviesURL);
});

//Horror Movie See All function
seeAllHorror.addEventListener('click', e => {
    e.preventDefault();
    seeAll('Horror', horrorMoviesURL);
});

//Sci-Fi Movie See All function
seeAllSciFi.addEventListener('click', e => {
    e.preventDefault();
    seeAll('Sci-Fi', scifiMoviesURL);
});

//Animation Movie See All function
seeAllAnimation.addEventListener('click', e => {
    e.preventDefault();
    seeAll('Animation', animationMoviesURL);
});



/**
 * SEARCH FUNCTIONS
 */

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchResult();
})

async function searchResult() {
    const searchTerm = searchInput.value;
    if(searchTerm) {
        main.innerHTML = '';
        textHolder.innerHTML = `
            <h3 class="searchInfo">search results for: <span>${searchTerm}<span><h3>
        `;
        main.innerHTML = '';
        const search = await fetch(searchURL + searchTerm);
        const searchData = await search.json();
        displayMovies(searchData, main, 20);
        main.classList.add('wrap');
        searchTerm = ''
    }
}



