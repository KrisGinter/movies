import React, {useState} from 'react';
import Header from "../../Layouts/Header/header";
import Footer from "../../Layouts/Footer/footer";
import Thanks from "../../../Assets/Images/Thanks.png"

const ContactDetails = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        region: '',

    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitted(true);
            const newData = {
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                region: formData.region
            }
            localStorage.setItem('data', JSON.stringify(newData));
        } else {
            setIsSubmitted(false);
        }
    };

    const validateForm = (data) => {
        const errors = {};

        if (data.name.length < 2) {
            errors.name = 'Name should contain at least 2 characters';
        }

        if (data.surname.length < 2) {
            errors.surname = 'Surname should contain at least 2 characters';
        }

        if (!isValidEmail(data.email)) {
            errors.email = 'E-mail is not valid';
        }

        if (!data.region) {
            errors.gender = 'Choose region';
        }

        return errors;
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };


    const errorStyle = {
        color: 'red',
    };

   const isDataStorage = JSON.parse(localStorage.getItem('data'))


    return (
        <div className="container contact__container">
            <div className="contact__description">
            <h1 className="contact__headline">Contact</h1>
            <p className="contact__mail">If you have any questions write us an e-mail to the address <span>
                movies@movies.com</span></p>
            </div>
            {isDataStorage ? (<div>
                    <img className="contact__image" src={Thanks} alt="thanks"/>
                    <h2 style={{marginTop: "10px"}}>You are subscribed to the newsletter!</h2>
            </div>) :
                ( <div className="contact__form__container" style={{marginTop: "20px"}}>
                    <p className="contact__newsletter">Get the inside scoop delivered right to your inbox! Fill the form below
                        and subscribe to our newsletter for curated content and exciting announcements.</p>
                    <div className="contact__form">
                <h2>Newsletter Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="contact__part">
                        <label className="contact__label">
                            <p>Name:</p>
                            <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                        </label>
                        {errors.name && <span style={errorStyle}>{errors.name}</span>}
                    </div>
                    <div className="contact__part">
                        <label className="contact__label">
                            <p>Surname:</p>
                            <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                        </label>
                        {errors.surname && <span style={errorStyle}>{errors.surname}</span>}
                    </div>
                    <div className="contact__part">
                        <label className="contact__label">
                            <p>Email:</p>
                            <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                        </label>
                        {errors.email && <span style={errorStyle}>{errors.email}</span>}
                    </div>
                    <div className="contact__part">
                        <label className="contact__label">
                            <p>Region:</p>
                            <select name="region" value={formData.region} onChange={handleChange}>
                                <option className="d-none" value="">Choose</option>
                                <option value="Africa">Africa</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="North America">North America</option>
                                <option value="South America">South America</option>
                                <option value="Oceania">Oceania</option>
                            </select>
                        </label>
                        {errors.gender && <span style={errorStyle}>{errors.gender}</span>}
                    </div>
                    <button className="button contact__button" type="submit">Send</button>
                </form>
                    </div>
                </div>)}
        </div>

    )
}
export default function Contact(){
    return (<>
        <Header/>
            <ContactDetails/>
            <Footer/>
        </>
    )
}