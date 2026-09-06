const trendingContainer = document.getElementById("trendingMovies");

if (trendingContainer) {
    const trendingMovies = movies.slice(0, 6);

    trendingContainer.innerHTML = trendingMovies.map(movie => `
        <div class="col-md-4 col-lg-2">
            <div class="movie-card">
                <img src="${movie.image}" alt="${movie.title}">

                <div class="movie-card-content">
                    <div class="movie-rating">
                        ⭐ ${movie.rating}
                    </div>

                    <h5>${movie.title}</h5>

                    <p>${movie.year} • ${movie.genre}</p>

                    <p>${movie.description}</p>

                    <a href="movie-details.html?id=${movie.id}" class="btn btn-sm">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `).join("");
}