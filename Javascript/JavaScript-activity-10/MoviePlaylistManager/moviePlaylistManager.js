let movies = [];
let priorities = [];


function addMovie() {



    const movieInput = document.getElementById('movie');
    const priorityInput = document.getElementById('priority');
    const movieList = document.getElementById('movieList');



    let movie = movieInput.value.trim();
    let priority = Number(priorityInput.value.trim());



    if (movie !== '' && !isNaN(priority) && priority >= 1 && priority <= 3) {



        movies.push(movie);
        priorities.push(priority);



        const li = document.createElement('li');
        li.textContent = movie;



        switch (priority) {
            case 1:
                li.classList.add('priority-high');
                break;
            case 2:
                li.classList.add('priority-medium');
                break;
            case 3:
                li.classList.add('priority-low');
                break;
        }



        const watchedButton = document.createElement('button');
        watchedButton.textContent = 'watched';
        watchedButton.onclick = function () {
            li.classList.toggle('watched');
        };
        li.appendChild(watchedButton);



        const movieEditButton = document.createElement('button');
        movieEditButton.textContent = 'Movie Edit';
        movieEditButton.onclick = function () {
            const newMovie = prompt('Edit Movie name : ', movie);
            if (newMovie !== null && newMovie.trim() !== '') {
                const movieIndex = movies.indexOf(movie);
                movies[movieIndex] = newMovie;
                li.firstChild.textContent = newMovie;
                movie = newMovie;
            }
        };
        li.appendChild(movieEditButton);



        const priorityEditButton = document.createElement('button');
        priorityEditButton.textContent = 'Edit priority';
        priorityEditButton.onclick = function () {
            const newpriority = prompt('Edit priority : ', priority);
            
            if(!isNaN(newpriority) && newpriority>=1 && newpriority<=3 && newpriority!=""){
                priority=Number(newpriority);
                li.classList.remove("priority-high","priority-medium","priority-low")
                switch (priority) {
                    case 1:
                        li.classList.add('priority-high');
                        break;
                    case 2:
                        li.classList.add('priority-medium');
                        break;
                    case 3:
                        li.classList.add('priority-low');
                        break;
                }

            }
            else{
                alert("enter valid priority");
            }
        };
        li.appendChild(priorityEditButton);

        

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function () {
            movieList.removeChild(li);
            const movieIndex = movies.indexOf(movie);
            movies.splice(movieIndex, 1);
            priorities.splice(movieIndex, 1);
        };
        li.appendChild(removeButton);
        movieList.appendChild(li);
        movieInput.value = '';
        priorityInput.value = '';
    } else {
        alert('Please enter a valid movie and a priority between 1 and 3');
    }
}