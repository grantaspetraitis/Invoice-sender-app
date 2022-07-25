import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ContactCard from "../components/ContactCard";
import { AppContext } from "../Context";

const Profile = () => {

    const navigate = useNavigate();
    const { login } = useContext(AppContext);
    const [contacts, setContacts] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        body: ''
    });

    const { email, body } = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const fetchContacts = async e => {
        const response = await fetch('https://invoice-sender-app.herokuapp.com/profile', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            }
        });
        const json = await response.json();
        setContacts(json);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: e.target.email.value,
            body: e.target.body.value
        }

        const response = await fetch('https://invoice-sender-app.herokuapp.com/addcontacts', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (response.ok) {
            toast.success('Added contacts successfully!');
            navigate(0);
        } else {
            toast.error(json.error);
        }
    }

    useEffect(() => {
        if(contacts === null) fetchContacts();
    })

    return (
        <>
        <h1 style={{ color: "#007655", marginTop: 150, padding: 10 }}>Contacts</h1>
            <div className="container">
                {
                    contacts ? contacts.map((contact, i) => <ContactCard key={i} data={contact}></ContactCard>) : <div className="spinner"></div>
                }
            </div>
            <h1 style={{ textAlign: "center", color: "#007655", marginTop: "50px" }}>Add new contact(s)</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-element">
                    <input required className="input" style={{ width: 500 }} type="text" value={email} placeholder="Email addresses (comma separated)" onChange={onChange} name="email" />
                </div>
                <div className="form-element">
                    <input required className="input" style={{ width: 500 }} type="text" value={body} placeholder="Names (comma separated)" onChange={onChange} name="body" />
                </div>
                <button className="btn">Add</button>
            </form>
        </>
    );
}

export default Profile;