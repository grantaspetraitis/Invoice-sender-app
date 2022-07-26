
const Strawberry = (props) => {

    return (
        <div className="preview">
            <h3 style={{ color: "#007655" }}>Hello, parents,</h3>
            <p>I'm sending you an invoice for this year's (<span className="italic">month</span>)  after school activity (<span className="italic">{props.data[0].activity_name}</span>). Thank you for allowing your child to attend to (<span className="italic">{props.data[0].activity_name}</span>)</p>
            <p>Bank: (<span className="italic">{props.data[0].bank}</span>)</p>
            <p>Recipient: (<span className="italic">{props.data[0].recipient_name}</span>)</p>
            <p>Account no.: (<span className="italic">{props.data[0].account_no}</span>)</p>
            <p>To pay: (<span className="italic">{props.data[0].price}</span>)</p>
            <p>Please enter your child's name and the month you're paying for in the details of the transaction.</p>
            <p>Sincerely,</p>
            <p>(<span className="italic">{props.data[0].activity_name}</span>) teacher (<span className="italic">{props.data[0].teacher_name}</span>)</p>
            <p>Phone no.: (<span className="italic">{props.data[0].phone}</span>)</p>
        </div>
    );
}
 
export default Strawberry;