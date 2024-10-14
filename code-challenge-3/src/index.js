document.addEventListener("DOMContentLoaded", () => {
    const filmList = document.getElementById("films");
    const posterImage = document.getElementById("poster");
    const movieTitle = document.getElementById("title");  
    const movieRuntime = document.getElementById("runtime");
    const movieDescription = document.getElementById("film-info");
    const showtimeLabel = document.getElementById("showtime");
    const ticketsAvailable = document.getElementById("ticket-num");
    const buyTicketButton = document.getElementById("buy-ticket"); 

    let currentMovie;

    // Function to fetch movie data
    function fetchMovies() {
        const url = 'http://localhost:3000/films';  

        fetch(url)
        .then(response => response.json()) 
        .then(data => {
            data.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = movie.title;
                li.className = 'film item';  
                li.addEventListener('click', () => displayMovieDetails(movie));
                filmList.appendChild(li);
            });

            // Automatically display the first movie's details
            if (data.length > 0) {  
                currentMovie = data[0];
                displayMovieDetails(currentMovie);
            }
        })
        .catch(error => {
            console.log("Error fetching movie data:", error);
        });
    }

    // Function to display movie details
    function displayMovieDetails(movie) {
        currentMovie = movie;
        const availableTickets = movie.capacity - movie.tickets_sold;

        posterImage.src = movie.poster;
        posterImage.alt = movie.title;
        movieTitle.textContent = movie.title;  
        movieRuntime.textContent = `${movie.runtime} minutes`;
        movieDescription.textContent = movie.description;
        showtimeLabel.textContent = movie.showtime;
        ticketsAvailable.textContent = `${availableTickets} remaining tickets`;

        updateBuyTicketButton(availableTickets);
    }

    // Function to handle Buy Ticket button click
    buyTicketButton.addEventListener('click', () => {
        if (currentMovie && currentMovie.capacity - currentMovie.tickets_sold > 0) {
            currentMovie.tickets_sold++;
            const availableTickets = currentMovie.capacity - currentMovie.tickets_sold;
            ticketsAvailable.textContent = `${availableTickets} remaining tickets`;
            updateBuyTicketButton(availableTickets);
        } else {
            alert("Sorry, tickets are Sold Out");
        }
    });

    // Function to update the Buy Ticket button
    function updateBuyTicketButton(availableTickets) {
        if (availableTickets > 0) {
            buyTicketButton.classList.remove("disabled");
            buyTicketButton.textContent = "Buy Ticket";
        } else {
            buyTicketButton.classList.add("disabled");
            buyTicketButton.textContent = "Sold Out";
        }
    }

    // Fetch movies when page loads
    fetchMovies();
});
