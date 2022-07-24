import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";

const Invoice = () => {

    const navigate = useNavigate();

    const { login } = useContext(AppContext);
    const [checked, setChecked] = useState([]);
    const [name, setName] = useState(null);
    const [contacts, setContacts] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        month: '',
        title: ''
    });

    const { month, title } = formData;

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
        setChecked(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: checked,
            month: e.target.month.value,
            name: name,
            title: e.target.title.value
        }

        const response = await fetch('/newinvoice', {
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

    useEffect(() => {
        if (contacts === null) fetchContacts();
    }, [])

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#007655", marginTop: "200px" }}>Your invoice details</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="checkbox">
                    {/* <label>Select all <input type="checkbox"></input></label> */}
                    
                    {
                        contacts && contacts.map((contact, i) =>
                            <>
                                <label style={{ padding: 7 }} htmlFor={i} key={contact.contact_id}>{contact.contact_email}, {contact.contact_name} <input onChange={handleChange} id={i} type="checkbox" value={contact.contact_email} name={contact.contact_name}></input> </label>
                                
                            </>)
                    }
                </div>
                <div className="form-element">
                    <label>Invoice title</label>
                    <input required className="input" type="text" value={title} placeholder="Invoice title" onChange={onChange} name="title" />
                </div>
                <div className="form-element">
                    <label>Which month is this invoice for?</label>
                    <input required className="input" type="text" value={month} placeholder="Month" onChange={onChange} name="month" />
                </div>
                <button className="btn">Send invoice(s)</button>
            </form>
        </>
    );
}

export default Invoice;