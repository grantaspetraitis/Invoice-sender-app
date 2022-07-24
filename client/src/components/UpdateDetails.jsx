import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";

const UpdateDetails = (props) => {
    const { login } = useContext(AppContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState(props.data[0])

    const { activity_title, bank, recipient_name, bank_account, price, teacher_name, phone } = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/details', {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify(formData)
        })

        const json = await response.json();

        if (response.ok) {
            toast.success('Updated details successfully');
            navigate(0);
        } else {
            toast.error(json.error);
        }
    }

    return (
        <form className="form-account-update" onSubmit={onSubmit}>
            <div className="form-element">
                <label>Activity name: </label>
                <input className="input" type="text" value={formData.activity_name} placeholder="Activity name" onChange={onChange} name="activity_name" />
            </div>
            <div className="form-element">
                <label>Bank: </label>
                <input className="input" type="text" value={formData.bank} placeholder="Bank" onChange={onChange} name="bank" />
            </div>
            <div className="form-element">
                <label>Recipient's name: </label>
                <input className="input" type="text" value={formData.recipient_name} placeholder="Recipient's name" onChange={onChange} name="recipient_name" />
            </div>
            <div className="form-element">
                <label>Account no.: </label>
                <input className="input" type="text" value={formData.account_no} placeholder="Account no." onChange={onChange} name="account_no" />
            </div>
            <div className="form-element">
                <label>Price: </label>
                <input className="input" type="text" value={formData.price} placeholder="Price" onChange={onChange} name="price" />
            </div>
            <div className="form-element">
                <label>Teacher's name: </label>
                <input className="input" type="text" value={formData.teacher_name} placeholder="Teacher's name" onChange={onChange} name="teacher_name" />
            </div>
            <div className="form-element">
                <label>Phone no.: </label>
                <input className="input" type="text" value={formData.phone} placeholder="Phone" onChange={onChange} name="phone" />
            </div>
            <button className="btn">Update</button>
        </form>
    );
}

export default UpdateDetails;