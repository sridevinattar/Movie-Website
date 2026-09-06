const movieContainer = document.getElementById("movieContainer");

const searchInput = document.getElementById("searchInput");

const genreFilter = document.getElementById("genreFilter");

const ratingFilter = document.getElementById("ratingFilter");

const resultCount = document.getElementById("resultCount");

const noResults = document.getElementById("noResults");


// ================= DISPLAY MOVIES =================

function displayMovies(movieList) {

    movieContainer.innerHTML = "";

    resultCount.textContent =
        `${movieList.length} movie${movieList.length !== 1 ? "s" : ""} found`;


    if (movieList.length === 0) {

        noResults.style.display = "block";

        return;
    }


    noResults.style.display = "none";


    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    movieList.forEach(movie => {

        const isFavorite =
            favorites.some(item => item.id === movie.id);


        movieContainer.innerHTML += `

            <div class="col-12 col-sm-6 col-lg-4">

                <div class="movie-card">

                    <div class="movie-poster">

                        <img
                            src="${movie.image}"
                            alt="${movie.title}">


                        <div class="movie-rating">

                            <i class="bi bi-star-fill"></i>
                            ${movie.rating}

                        </div>


                        <button
                            class="favorite-btn ${isFavorite ? "active" : ""}"
                            onclick="toggleFavorite(${movie.id})">

                            <i class="bi ${
                                isFavorite
                                ? "bi-heart-fill"
                                : "bi-heart"
                            }"></i>

                        </button>

                    </div>


                    <div class="movie-info">

                        <h5>
                            ${movie.title}
                        </h5>


                        <div class="movie-meta">

                            ${movie.year}
                            &nbsp; • &nbsp;
                            ${movie.genre}

                        </div>


                        <p class="movie-description">

                            ${movie.description}

                        </p>


                        <a
                            href="movie-details.html?id=${movie.id}"
                            class="btn btn-sm btn-outline-light mt-2">

                            View Details

                        </a>

                    </div>

                </div>

            </div>

        `;

    });

}


// ================= FILTER MOVIES =================

function filterMovies() {

    const searchValue =
        searchInput.value.toLowerCase().trim();


    const selectedGenre =
        genreFilter.value;


    const selectedRating =
        ratingFilter.value;


    const filteredMovies = movies.filter(movie => {

        const matchesSearch =
            movie.title.toLowerCase().includes(searchValue);


        const matchesGenre =
            selectedGenre === "all" ||
            movie.genre === selectedGenre;


        const matchesRating =
            selectedRating === "all" ||
            movie.rating >= Number(selectedRating);


        return (
            matchesSearch &&
            matchesGenre &&
            matchesRating
        );

    });


    displayMovies(filteredMovies);

}


// ================= SEARCH =================

searchInput.addEventListener(
    "input",
    filterMovies
);


// ================= GENRE =================

genreFilter.addEventListener(
    "change",
    filterMovies
);


// ================= RATING =================

ratingFilter.addEventListener(
    "change",
    filterMovies
);


// ================= FAVORITES =================

function toggleFavorite(movieId) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    const movie =
        movie.find(item => item.id === movieId);


    const existingMovie =
        favorites.find(item => item.id === movieId);


    if (existingMovie) {

        favorites =
            favorites.filter(item => item.id !== movieId);

    } else {

        favorites.push(movie);

    }


    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );


    filterMovies();

}


// ================= URL GENRE =================

// Allows links such as:
// movies.html?genre=Action

const urlParams =
    new URLSearchParams(window.location.search);


const selectedGenreFromURL =
    urlParams.get("genre");


if (selectedGenreFromURL) {

    genreFilter.value = selectedGenreFromURL;

}


// ================= INITIAL LOAD =================

displayMovies(movies);