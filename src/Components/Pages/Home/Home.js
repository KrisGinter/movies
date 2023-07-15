import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../../Layouts/Header/header";
import Footer from "../../Layouts/Footer/footer";
import Background from "../../../Assets/Images/background.jpg"

export default function Home(){
    return ( <>
            <Header/>
            <section className="home">
                <div className="container">
                <h1 className="home__headline">Find your favourites movies and series!</h1>
                    <p className="home__text">Look where streams are available and create your own
                        database of favourite movies</p>
                    <Link className="button button__home" to="/search">Start searching</Link>
                    <img className="background" src={Background}/>
                </div>
            </section>
            <Footer/>
        </>
    )
}