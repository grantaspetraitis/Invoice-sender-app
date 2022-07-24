const DetailsCard = (props) => {

    return (
        <div>
            <div>
                <span>Activity title: </span><span>{props.data.activity_name}</span>
            </div>
            <div>
                <span>Bank: </span><span>{props.data.bank}</span>
            </div>
            <div>
                <span>Recipient's name: </span><span>{props.data.recipient_name}</span>
            </div>
            <div>
                <span>Account no.: </span><span>{props.data.account_no}</span>
            </div>
            <div>
                <span>Price: </span><span>{props.data.price} Eur</span>
            </div>
            <div>
                <span>Teacher's name: </span><span>{props.data.teacher_name}</span>
            </div>
            <div>
                <span>Phone no.: </span><span>{props.data.phone}</span>
            </div>
        </div>
    );
}

export default DetailsCard;