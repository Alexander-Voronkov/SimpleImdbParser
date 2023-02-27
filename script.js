const click = (e)=>
{
    window.open(`https://www.google.com/search?q=film+${e.target.dataset.title}`);
}

document.querySelector('.find-btn').addEventListener('click',async (e)=>
{
    const req = document.querySelector('.film-title').value;
    if(req.length===0)
    {
        alert('Enter movie title before a request!');
        return;
    }

    const resp = await axios.get(`http://www.omdbapi.com/?apikey=8aa7fd17&t=${req}`);

    if(resp.data.Response === 'True')
    {
        const film = document.createElement('div');
        const title = document.createElement('h3');
        const poster = document.createElement('img');
        const genre = document.createElement('h4');
        const actors = document.createElement('h4');
        const rating = document.createElement('h4');
        film.addEventListener('click',click);
        title.innerText = resp.data.Title;
        poster.src = resp.data.Poster;
        film.classList.add('film');
        genre.innerText = `Genre: ${resp.data.Genre}`;
        actors.innerText = `Actors: ${resp.data.Actors}`;
        rating.innerText = `Rating: ${resp.data.imdbRating}`;
        film.append(title,poster,genre,actors,rating);
        film.childNodes.forEach(x=>x.dataset.title=resp.data.Title);
        film.dataset.title = resp.data.Title;
        document.querySelector('.film-list').childNodes.forEach(x=>document.querySelector('.film-list').removeChild(x));
        document.querySelector('.film-list').append(film);
    }
    else
    {
        alert('Error! Nothing has been found.');
    }
    console.log(resp);
    
});