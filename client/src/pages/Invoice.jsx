import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Invoice = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        body: ''
    });

    const {email, body} = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: e.target.email.value,
            body: e.target.body.value
        }

        const response = await fetch('/sendmail', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if(response.ok) {
            toast.success('Sent invoice(s) successfully');
            navigate('/');
        } else {
            toast.error(json.error);
        }
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#007655", marginTop: "200px" }}>Login to an existing account</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-element">
                    <input required className="input" type="email" value={email} placeholder="Email addresses" onChange={onChange} name="email" />
                </div>
                <div className="form-element">
                    <input required className="input" type="password" value={body} placeholder="Password" onChange={onChange} name="password" />
                </div>
                <button className="btn">Send invoice</button>
            </form>
        </>
    );
}
 
export default Invoice;