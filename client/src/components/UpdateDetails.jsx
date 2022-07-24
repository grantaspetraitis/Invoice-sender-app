import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";

const UpdateDetails = (props) => {
    const { login } = useContext(AppContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        activity_title: '',
        bank: '',
        recipient_name: '',
        bank_account: '',
        price: '',
        teacher_name: '',
        phone: ''
    })

    const { activity_title, bank, recipient_name, bank_account, price, teacher_name, phone } = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            activity_title: e.target.activity_title.value,
            bank: e.target.bank.value,
            recipient_name: e.target.recipient_name.value,
            bank_account: e.target.bank_account.value,
            price: e.target.price.value,
            teacher_name: e.target.teacher_name.value,
            phone: e.target.phone.value
        }

        const response = await fetch('/details', {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (response.ok) {
            toast.success('Updated details successfully');
            navigate(0);
        } else {
            toast.error(json.error);
        }
    }

    console.log(props)

    return (
        <form className="form-account-update" onSubmit={onSubmit}>
            <div className="form-element">
                <label>Activity name: </label>
                <input className="input" type="text" defaultValue={props.data[0].activity_name} placeholder="Activity name" onChange={onChange} name="activity_title" />
            </div>
            <div className="form-element">
                <label>Bank: </label>
                <input className="input" type="text" defaultValue={props.data[0].bank} placeholder="Bank" onChange={onChange} name="bank" />
            </div>
            <div className="form-element">
                <label>recipient's name: </label>
                <input className="input" type="text" defaultValue={props.data[0].recipient_name} placeholder="Recipient's name" onChange={onChange} name="recipient_name" />
            </div>
            <div className="form-element">
                <label>Account no.: </label>
                <input className="input" type="text" defaultValue={props.data[0].account_no} placeholder="Account no." onChange={onChange} name="bank_account" />
            </div>
            <div className="form-element">
                <label>Price: </label>
                <input className="input" type="text" defaultValue={props.data[0].price} placeholder="Price" onChange={onChange} name="price" />
            </div>
            <div className="form-element">
                <label>Teacher's name: </label>
                <input className="input" type="text" defaultValue={props.data[0].teacher_name} placeholder="Teacher's name" onChange={onChange} name="teacher_name" />
            </div>
            <div className="form-element">
                <label>Phone no: </label>
                <input className="input" type="text" defaultValue={props.data[0].phone} placeholder="Phone" onChange={onChange} name="phone" />
            </div>
            <button className="btn">Update</button>
        </form>
    );
}

export default UpdateDetails;