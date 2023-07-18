import React, { useState, useEffect } from 'react';
import Header from "../../Layouts/Header/header";
import Footer from "../../Layouts/Footer/footer";


const SearchField = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [titleDetails, setTitleDetails] = useState([])
    const [favourites, setFavourites] = useState([]);



    const handleSearch = () => {
        const apiKey = 'E1pn6G0f4xL5kwMux4bjDlLUzv02lBB1EgI4gt1U';
        setTitleDetails([]);
        fetch(`https://api.watchmode.com/v1/search/?apiKey=${apiKey}&search_field=name&search_value=${searchValue}&sort_by=relevance_desc`)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data.title_results);
                console.log(data);
            })
            .catch(error => console.error('Error:', error));
    };

    const fetchTitleDetails = (e) => {
        const titleId = e.target.getAttribute('data-id');
        const apiKey = 'E1pn6G0f4xL5kwMux4bjDlLUzv02lBB1EgI4gt1U';
                fetch(
                    `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${apiKey}&append_to_response=sources`
                )
                    .then(response => response.json())
                    .then(data => {
                        setTitleDetails(data);
                        console.log(titleDetails);
                        console.log('Title Details:', data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            };

    useEffect(() => {
        console.log('Updated Title Details:', titleDetails);
    }, [titleDetails]);

    const isInputEmpty = searchValue.trim() === ''

    function convertToEmbedLink(url) {
        if (!url) {
            console.error("Invalid YouTube URL");
            return null;
        }

        function extractVideoID(url) {
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = url.match(regExp);

            if (match && match[7] && match[7].length === 11) {
                return match[7];
            } else {
                console.error("Invalid YouTube URL");
                return null;
            }
        }

        const videoID = extractVideoID(url);
        if (!videoID) {
            console.error("Invalid YouTube URL");
            return null;
        }

        const embedLink = "https://www.youtube.com/embed/" + videoID;
        return embedLink;
    }

    function filterStreams(array) {
        const sources = [];
        array.forEach((e) => sources.push(e.name))
        const sourcesWithoutDuplicates = sources.filter(
            (value, index) => sources.indexOf(value) === index)
        return (
            sourcesWithoutDuplicates.map((e) => (
                <p key={e}>{e}</p>
            ))
        );
    }

    function addToFavourites() {
        const newFavourite = {
            title: titleDetails.title,
            poster: titleDetails.poster,
            ranking: titleDetails.user_rating
        };

        const isDuplicate = favourites.some(
            (favourite) => favourite.title === newFavourite.title
        );

        if (isDuplicate) {
            console.log('Title is already in favourites');
            return;
        }

        setFavourites([...favourites, newFavourite]);

        const existingFavourites = JSON.parse(localStorage.getItem('favourites')) || [];

        const isDuplicateInStorage = existingFavourites.some(
            (favourite) => favourite.title === newFavourite.title
        );

        if (isDuplicateInStorage) {
            console.log('Title is already in localStorage');
            return;
        }

        const updatedFavourites = [...existingFavourites, newFavourite];

        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    }


    return (
        <>
        <div className="search__components">
            <h1 className="search__headline">Enter the title</h1>
            <input className="search__input"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="button button__search" onClick={handleSearch} disabled={isInputEmpty}>Search</button>
        </div>

            <div className="container search__list__container">
            {searchResults.length > 0 && (
                <>
                <p>Click the title for the details</p>
                <ul className="column__list">
                    {searchResults.map((result) => (
                        <li key={result.id} data-id={result.id} onClick={fetchTitleDetails}>{result.name}</li>
                    ))}
                </ul>
                </>
            )}
        </div>
            {titleDetails.length !== 0 && (
            <div className="search__result">
                <h1>{titleDetails.title}</h1>
                <div className="search__details">
                    <p>Year: {titleDetails.year}</p>
                    <p>Rating: {titleDetails.user_rating}</p>
                    <p>Plot:</p>
                </div>
                <p className="plot">{titleDetails.plot_overview}</p>
                {titleDetails.trailer !== "" && (
                <div className="iframe_container">
                <iframe className="trailer" width="420" height="315"
                        src={convertToEmbedLink(titleDetails.trailer)}>
                </iframe>
                </div>)}
                {titleDetails.sources.length !== 0 ? (
                <div className="sources">
                    <h2>Available on:</h2>
                    {filterStreams(titleDetails.sources)}
                </div>)
                    : ( <div className="sources">
                    <h2>Not available on streaming platforms</h2>
                </div>)}
                <button className="button button__favourites" onClick={addToFavourites}>Add to favourites</button>
            </div> )}
        </>
    );
};
    function Search() {
        return (
            <>
                <Header/>
                <section className="search">
                    <div className="container search__container">
                <SearchField/>
                    </div>
                </section>
                <Footer/>
            </>
        )
    }

export default Search;