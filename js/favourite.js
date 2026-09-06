const favoritesContainer =
    document.getElementById("favoritesContainer");

const emptyFavorites =
    document.getElementById("emptyFavorites");


// ================= LOAD FAVORITES =================

function displayFavorites() {

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    favoritesContainer.innerHTML = "";


    // ================= EMPTY =================

    if (favorites.length === 0) {

        emptyFavorites.style.display = "block";

        return;
    }


    emptyFavorites.style.display = "none";


    // ================= DISPLAY =================

    favorites.forEach(movie => {

        favoritesContainer.innerHTML += `

            <div class="col-12 col-sm-6 col-lg-4">

                <div class="movie-card">


                    <!-- POSTER -->

                    <div class="movie-poster">

                        <img
                            src="${movie.image}"
                            alt="${movie.title}">


                        <div class="movie-rating">

                            <i class="bi bi-star-fill"></i>

                            ${movie.rating}

                        </div>


                        <button
                            class="favorite-btn active"
                            onclick="removeFavorite(${movie.id})">

                            <i class="bi bi-heart-fill"></i>

                        </button>

                    </div>


                    <!-- INFORMATION -->

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
                            class="btn btn-sm btn-outline-light">

                            View Details

                        </a>

                    </div>

                </div>

            </div>

        `;

    });

}


// ================= REMOVE FAVORITE =================

function removeFavorite(movieId) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    favorites =
        favorites.filter(movie => movie.id !== movieId);


    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );


    displayFavorites();

}


// ================= INITIAL LOAD =================

displayFavorites();