import React, {useState, useEffect} from 'react';
import Header from "../../Layouts/Header/header";
import Footer from "../../Layouts/Footer/footer";


const FavouritesDisplay = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavourites = localStorage.getItem('favourites');
        if (storedFavourites) {
            const parsedFavourites = JSON.parse(storedFavourites);
            setFavourites(parsedFavourites);
        }
    }, []);

    function removeFavourite(title) {
        const storedFavourites = localStorage.getItem('favourites');
        let favouritesArray = [];

        if (storedFavourites) {
            favouritesArray = JSON.parse(storedFavourites);
        }

        const indexToRemove = favouritesArray.findIndex((item) => item.title === title);

        if (indexToRemove !== -1) {
            favouritesArray.splice(indexToRemove, 1);

            const updatedFavourites = JSON.stringify(favouritesArray);

            localStorage.setItem('favourites', updatedFavourites);
        }

        setFavourites(favouritesArray);
    }

    return (
        localStorage.getItem('favourites') === null || localStorage.getItem('favourites') === "[]" ?
            (<div className="container favourites__container">
                <div className="favourites__headline">
                    <h1 style={{paddingTop: "150px"}}>You have no favourites added yet.</h1>
                    <p>To add titles to your favourites go to Search section, find the title then add it to your favourites</p>
                </div>
            </div>) :
            (
        <div className="container favourites__container">
            <div className="favourites__headline">
                <h1>Your Favourites</h1>
            </div>
            <div className="favourites__display__container">
                {favourites.map((favourite) => (
                    <div className="favourites__display">
                        <div className="favourites__details">
                            <div className="favourites__title">{favourite.title}</div>
                        </div>
                        <div className="favourites__poster">
                            <img className="favourites__poster" src={favourite.poster} alt="Poster" />
                        </div>
                        <button className="button button_remove" onClick={() => removeFavourite(favourite.title)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>)
    )
}

export default function Favourites(){
    return (
        <>
            <Header/>
            <FavouritesDisplay/>
            <Footer/>
        </>
    )
}