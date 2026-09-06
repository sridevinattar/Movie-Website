const movieDetails =
    document.getElementById("movieDetails");


// ================= GET MOVIE ID =================

const urlParams =
    new URLSearchParams(window.location.search);

const movieId =
    Number(urlParams.get("id"));


// ================= FIND MOVIE =================

const movie =
    movies.find(item => item.id === movieId);


// ================= DISPLAY MOVIE =================

if (movie) {

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    const isFavorite =
        favorites.some(item => item.id === movie.id);


    movieDetails.innerHTML = `

        <div class="details-container">

            <div class="row align-items-center g-4">


                <!-- POSTER -->

                <div class="col-md-5">

                    <img
                        src="${movie.image}"
                        alt="${movie.title}"
                        class="details-poster">

                </div>


                <!-- INFORMATION -->

                <div class="col-md-7">

                    <div class="details-content">


                        <p class="section-label">

                            ${movie.genre}

                        </p>


                        <h1>

                            ${movie.title}

                        </h1>


                        <!-- RATING -->

                        <div class="details-rating">

                            <i class="bi bi-star-fill"></i>

                            ${movie.rating} / 10

                        </div>


                        <!-- YEAR + GENRE -->

                        <div class="details-meta">

                            <i class="bi bi-calendar3"></i>

                            ${movie.year}

                            &nbsp;&nbsp; • &nbsp;&nbsp;

                            <i class="bi bi-film"></i>

                            ${movie.genre}

                        </div>


                        <!-- DESCRIPTION -->

                        <h4>
                            About the Movie
                        </h4>

                        <p class="details-description">

                            ${movie.fullDescription}

                        </p>


                        <!-- MOVIE INFORMATION -->

                        <div class="details-info">

                            <p>

                                <strong>Release Date:</strong>

                                ${movie.releaseDate}

                            </p>


                            <p>

                                <strong>Cast:</strong>

                                ${movie.cast}

                            </p>

                        </div>


                        <!-- BUTTONS -->

                        <div>

                            <a
                                href="${movie.trailer}"
                                target="_blank"
                                class="btn trailer-btn">

                                <i class="bi bi-youtube"></i>

                                Watch Trailer

                            </a>


                            <button
                                onclick="toggleDetailsFavorite(${movie.id})"
                                class="details-favorite ${
                                    isFavorite ? "active" : ""
                                }">

                                <i class="bi ${
                                    isFavorite
                                    ? "bi-heart-fill"
                                    : "bi-heart"
                                }"></i>

                                ${
                                    isFavorite
                                    ? "Remove Favorite"
                                    : "Add to Favorites"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;

} else {

    movieDetails.innerHTML = `

        <div class="text-center py-5">

            <i class="bi bi-film"
               style="font-size: 50px; color: #ff3158;">
            </i>

            <h2 class="mt-3">
                Movie not found
            </h2>

            <p class="text-secondary">
                The movie you are looking for does not exist.
            </p>

            <a href="movies.html"
               class="btn btn-primary-custom">

                Browse Movies

            </a>

        </div>

    `;

}


// ================= FAVORITE =================

function toggleDetailsFavorite(movieId) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    const movie =
        movies.find(item => item.id === movieId);


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


    // Refresh details page

    location.reload();

}