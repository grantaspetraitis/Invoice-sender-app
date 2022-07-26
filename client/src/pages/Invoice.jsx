import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Mango from "../components/Mango";
import Strawberry from "../components/Strawberry";
import Teal from "../components/Teal";
import { AppContext } from "../Context";

const Invoice = () => {

    const navigate = useNavigate();

    const { login } = useContext(AppContext);
    const [checked, setChecked] = useState([]);
    const [contacts, setContacts] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        month: '',
        title: '',
        select: 'teal'
    });
    const [details, setDetails] = useState(null);

    const { month, title } = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const fetchDetails = async e => {
        const response = await fetch('https://invoice-sender-app.herokuapp.com/details', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            }
        })
        const json = await response.json();
        setDetails(json);
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

    const handleChange = e => {
        setChecked(prevState => {
            if (e.target.checked) {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            } else {
                delete prevState[e.target.name]
                return prevState
            }
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: checked,
            month: e.target.month.value,
            title: e.target.title.value,
            template: e.target.select.value
        }

        const response = await fetch('https://invoice-sender-app.herokuapp.com/newinvoice', {
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
            navigate('/profile');
        } else {
            toast.error(json.error);
        }
    }


    useEffect(() => {
        if (contacts === null) fetchContacts();
        if (details === null) fetchDetails();
    }, [])

    return (
        login ?
            <>
                <h1 style={{ textAlign: "center", color: "#007655", marginTop: "200px" }}>Your invoice details</h1>
                <form className="form" onSubmit={onSubmit}>
                    <div className="checkbox">
                        {/* <label>Select all <input type="checkbox"></input></label> */}
                        <h3 style={{ textAlign: "center", color: "#007655" }}>Select recipients</h3>
                        {
                            contacts && contacts.map((contact, i) =>
                                <div key={contact.contact_id}>
                                    <label style={{ padding: 7 }} htmlFor={i} key={contact.contact_id}>{contact.contact_email}, {contact.contact_name} <input onChange={handleChange} id={i} type="checkbox" value={contact.contact_email} name={contact.contact_name}></input> </label>
                                </div>)
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
                    <div className="form-element">
                        <label>Select template</label>
                        <select required className="select" type="select" value={formData.select} onChange={onChange} name="select">
                            <option value="teal">Teal</option>
                            <option value="mango">Mango</option>
                            <option value="strawberry">Oregon (English)</option>
                        </select>
                    </div>
                    {
                        formData.select === 'teal' && <Teal data={details && details} />
                    }
                    {
                        formData.select === 'mango' && <Mango data={details && details}  />
                    }
                    {
                        formData.select === 'strawberry' && <Strawberry data={details && details}  />
                    }

                    <button className="btn">Send invoice(s)</button>
                </form>
            </> :

            <h1 style={{ color: "#007655", marginTop: 200, marginBottom: 200, padding: 50 }}>Please login or register to view this page</h1>
    );
}

export default Invoice;