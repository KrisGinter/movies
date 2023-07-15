import React, { useState, useEffect } from 'react';
import Header from "../../Layouts/Header/header";
import Footer from "../../Layouts/Footer/footer";


const SearchField = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [titleDetails, setTitleDetails] = useState([])



    const handleSearch = () => {
        fetch(`https://api.watchmode.com/v1/search/?apiKey=E1pn6G0f4xL5kwMux4bjDlLUzv02lBB1EgI4gt1U&search_field=name&search_value=${searchValue}`)
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

            <div className="search__list__container">
            {searchResults.length > 0 && (
                <ul className="column__list">
                    {searchResults.map((result) => (
                        <li key={result.id} data-id={result.id} onClick={fetchTitleDetails}>{result.name}</li>
                    ))}
                </ul>
            )}
        </div>
            <div className="search__result">
                <h1>{titleDetails.title}</h1>
            </div>
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