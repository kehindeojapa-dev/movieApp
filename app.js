const mostPopularMovieURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const horrorMoviesURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&with_genres=27";
const IMGPATH = "http://image.tmdb.org/t/p/w1280";


async function getMostPopularMovie () {
    const resp = await fetch(mostPopularMovieURL);
    const respData = await resp.json()
    console.log(respData);

    const main = document.querySelector('#movies-Container')
    const cardDisplay = document.querySelector('.cardDisplay');
    
    respData.results.forEach(movie => {
        const {poster_path, title, vote_average} = movie;
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
            <button class="trailer_btn">Watch Trailer</button>
            <button class="stream_btn">Stream</button>
        </div>
        `
        cardDisplay.appendChild(movieCard);
    })
}

getMostPopularMovie();