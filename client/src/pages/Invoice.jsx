import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";

const Invoice = () => {

    const navigate = useNavigate();

    const { login } = useContext(AppContext);
    const [checked, setChecked] = useState(null);
    const [name, setName] = useState(null);
    const [contacts, setContacts] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        month: ''
    });

    const { month } = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const fetchContacts = async e => {
        const response = await fetch('/profile', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            }
        });
        const json = await response.json();
        setContacts(json);
    }

    const handleChange = e => {
        setChecked(e.target.value)
        setName(e.target.name)
    }

    console.log(checked)
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target)
        const data = {
            email: checked,
            month: e.target.month.value,
            name: name
        }

        const response = await fetch('/newinvoice', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
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

    useEffect(() => {
        if (contacts === null) fetchContacts();
    }, [])

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#007655", marginTop: "200px" }}>Your invoice details</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="checkbox">
                    {
                        contacts && contacts.map((contact, i) =>
                            <>
                                <label htmlFor={i} key={i}>{contact.contact_email}, {contact.contact_name} <input onChange={handleChange} id={i} type="checkbox" value={contact.contact_email} name={contact.contact_name}></input> </label>
                                
                            </>)
                    }
                </div>
                <div className="form-element">
                    <label>Which month is this payment for?</label>
                    <input required className="input" type="text" value={month} placeholder="Month" onChange={onChange} name="month" />
                </div>
                <button className="btn">Send invoice</button>
            </form>
        </>
    );
}

export default Invoice;