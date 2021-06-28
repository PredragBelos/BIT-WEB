//VARIABLES
var genreList = document.querySelector("#genre");
var movieList = document.querySelector("#filmsList")
var createMovieButton = document.querySelector("#createMovieButton");
var movieTitle = document.querySelector("#title");
var movieLength = document.querySelector("#length");
var movieGenre = document.querySelector("#genre");
var createMovieForm = document.querySelector("#createMovieForm");
var programDate = document.querySelector("#date");
var createProgramButton = document.querySelector("#createProgramButton");
var programDropDownList = document.querySelector("#program");
var addMoviButton = document.querySelector("#addMovieButton");
var movieDropDownList = document.querySelector("#movie");


//FUNCTIONS
(function (genres) {

    for (var i = 0; i < genres.length; i++) {
        var genre = document.createElement("option");
        genre.textContent = genres[i];
        genreList.appendChild(genre);

    }

})(genres);


/*Function for create movie*/
function createMovie() {

    try {

        var movie = new Movie(movieTitle.value, movieGenre.value, parseInt(movieLength.value));

        if (!movieTitle.value) {
            throw new Error("Title of movie must be defined.")
        }

        if (movieGenre.value === "-" || movieGenre.value === " ") {
            throw new Error("Genre of movie must be defined.")
        }

        if (!parseInt(movieLength.value)) {
            throw new Error("Length of movie must be defined.")
        }

        movies.push(movie);
        var movieListElement = document.createElement("li");
        var movieDropDownElement = document.createElement("option");
        movieDropDownElement.setAttribute("class", "movieItem");
        movieDropDownElement.textContent = movieTitle.value;
        movieListElement.textContent = movie.getData();
        movieList.appendChild(movieListElement);
        movieDropDownList.appendChild(movieDropDownElement);

        /*Clear textBox after creating movie*/
        movieTitle.value = "";
        movieGenre.value = "";
        movieLength.value = "";

    } catch (error) {
        alert(error.message);
    }
}

/*Function for create date string*/
function createDateString() {
    try {
        var result = "";
        var date = programDate.value.split("-");
        var month = date[1];
        var day = date[2];
        var year = date[0];
        result += month + "/" + day + "/" + year;

        if (month === undefined || month === undefined || month === undefined) {
            throw new Error("Date of program must be selected!");
        }

        return result;
    }
    catch (error) {
        alert(error.message);
    }
}

/*Function for create program*/
function createProgram() {
    try {
        var program = new Program(createDateString());
        programs.push(program);

        /*Clear drop down list*/
        clearProgramList();
        clearProgramListUl();

        /*Insert programs to drop down list*/
        for (var i = 0; i < programs.length; i++) {
            var programItem = document.createElement("option");
            var programListItem = document.createElement("li");
            var programsUl = document.querySelector("#programsUl");
            programItem.setAttribute("class", "programItem");
            programItem.textContent = programs[i].getDate();
            programDropDownList.appendChild(programItem);
            programListItem.setAttribute("class", "programList");
            programListItem.textContent = programs[i].getReport();
            programsUl.appendChild(programListItem);

        }
    }
    catch (error) {
        console.log(error.message);
    }
}

/*Function for clear program list*/
function clearProgramList() {
    var programDropDownItems = document.querySelectorAll("#program .programItem");

    for (var i = 0; i < programDropDownItems.length; i++) {
        var programItem = document.querySelector(".programItem");
        var programDropDownList = programItem.parentElement;
        programDropDownList.removeChild(programItem);
    }
}

/*Function to clear program list Ul*/
function clearProgramListUl() {
    var programLiItems = document.querySelectorAll("#programsUl .programList");

    for (var i = 0; i < programLiItems.length; i++) {
        var programItem = document.querySelector(".programList");
        var programListItems = programItem.parentElement;
        programListItems.removeChild(programItem);
    }
}

/*Function for adding films to programs*/
function addFilmToProgram() {

    try {
        /*Select film object*/
        var movieListTitle = movieDropDownList.value;
        var film = movies.filter(function (item) {
            return item.title === movieListTitle;
        });

        if (film.length < 1) {
            throw new Error("Movie for program must be selected!");
        }
        var moviObject = film[0];

        /*Select program object*/
        var programListItem = programDropDownList.value;
        var program = programs.filter(function (item) {
            return item.getDate() === programListItem;
        });

        if (program.length < 1) {
            throw new Error("Program must be selected!");
        }

        var programObject = program[0];

        programObject.addMovie(moviObject);

        /*Unset value of drop down lists*/
        programDropDownList.value = "-";
        movieDropDownList.value = "-";

        /*Unset program list*/
        clearProgramListUl();

        for (var i = 0; i < programs.length; i++) {
            var programListItem = document.createElement("li");
            programListItem.setAttribute("class", "programList");
            programListItem.textContent = programs[i].getReport();
            programsUl.appendChild(programListItem);
        }

    }
    catch (error) {
        alert(error.message);
    }
}

/*Function to prevent defaoult forms actions*/
var forms1 = document.getElementById("createMovieForm");
var forms2 = document.getElementById("createProgramForm");

function preventDefaultAction(e) {
    e.preventDefault();
}




//EVENTS

createMovieButton.addEventListener("click", createMovie);
createProgramButton.addEventListener("click", createProgram);
addMoviButton.addEventListener("click", addFilmToProgram);
forms1.addEventListener("submit", preventDefaultAction);
forms2.addEventListener("submit", preventDefaultAction);










