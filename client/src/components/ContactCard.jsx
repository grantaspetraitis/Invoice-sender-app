import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";


const ContactCard = (props) => {

    const navigate = useNavigate();

    const { login } = useContext(AppContext);
    const [formData, setFormData] = useState({
        month: '',
        title: ''
    });

    const { month, title } = formData;

    const onSubmit = async e => {
        e.preventDefault();

        const data = {
            email: props.data.contact_email,
            name: props.data.contact_name,
            month: e.target.month.value,
            title: e.target.title.value
        }

        const response = await fetch('https://invoice-sender-app.herokuapp.com/newsingleinvoice', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (response.ok) {
            toast.success('Sent invoice(s) successfully');
            navigate('/');
        } else {
            toast.error(json.error);
        }
    }

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="contact-card">
                <h3>{props.data.contact_name}</h3>
                <p>{props.data.contact_email}</p>
                <label htmlFor="month">Which month is this invoice for?</label>
                <input required value={month} id="month" className="input" onChange={onChange} type="text" name="month" placeholder="Month"></input>
                <input required value={title} id="title" className="input" onChange={onChange} type="text" name="title" placeholder="Invoice title"></input>
                <button className="btn">Send invoice to this contact</button>
            </div>
        </form>
    );
}

export default ContactCard;