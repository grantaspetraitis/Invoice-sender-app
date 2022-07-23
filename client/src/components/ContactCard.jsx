const ContactCard = (props) => {
    return (
        <div>
            <div className="contact-card">
                <h3>{props.data.contact_name}</h3>
                <p>{props.data.contact_email}</p>
                <button className="btn">Send email to this contact</button>
            </div>
        </div>
    );
}

export default ContactCard;