import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DetailsCard from "../components/DetailsCard";
import UpdateDetails from "../components/UpdateDetails";
import { AppContext } from "../Context";

const Details = () => {

    const { login } = useContext(AppContext);
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);

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

        const response = await fetch('https://invoice-sender-app.herokuapp.com/details', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (response.ok) {
            toast.success('Added details successfully');
            navigate('/profile');
        } else {
            toast.error(json.error);
        }
    }

    const fetchDetails = async e => {
        const response = await fetch('https://invoice-sender-app.herokuapp.com/details', {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${login.token}`
            }
        })
        const json = await response.json();
        setDetails(json);
    }


    useEffect(() => {
        if (details === null) fetchDetails();
    })



    return (
        login ?
            <div className="details-page">
                {
                    details && details.length === 0 ?

                        <h1 style={{ color: "#007655", marginTop: 200 }}>Add account details</h1>

                        :

                        details &&

                        <div className="details">
                            <h3 style={{ color: "#007655" }}>Your account details</h3>
                            {details.map((detail, i) => <DetailsCard key={i} data={detail} />)}
                        </div>
                }
                {
                    details && details.length > 0 ? <UpdateDetails data={details} /> :

                        <form className="form-account" onSubmit={onSubmit}>
                            <div className="form-element">
                                <input required className="input" type="text" alue={activity_title} placeholder="Activity name" onChange={onChange} name="activity_title" />
                            </div>
                            <div className="form-element">
                                <input required className="input" type="text" value={bank} placeholder="Bank" onChange={onChange} name="bank" />
                            </div>
                            <div className="form-element">
                                <input required className="input" type="text" value={recipient_name} placeholder="Recipient's name" onChange={onChange} name="recipient_name" />
                            </div>
                            <div className="form-element">
                                <input required className="input" type="text" value={bank_account} placeholder="Account no." onChange={onChange} name="bank_account" />
                            </div>
                            <div className="form-element">
                                <input required className="input" type="text" value={price} placeholder="Price" onChange={onChange} name="price" />
                            </div>
                            <div className="form-element">
                                <input required className="input" type="text" value={teacher_name} placeholder="Teacher's name" onChange={onChange} name="teacher_name" />
                            </div>
                            <div className="form-element">
                                <input required className="input" type="text" value={phone} placeholder="Phone" onChange={onChange} name="phone" />
                            </div>
                            <button className="btn">Submit</button>
                        </form>
                }

            </div> :

            <h1 style={{ color: "#007655", marginTop: 200, marginBottom: 200, padding: 50 }}>Please login or register to view this page</h1>
    );
}

export default Details;