
const Strawberry = () => {

    return (
        <div className="preview">
            <h3 style={{ color: "#007655" }}>Hello, (<span className="italic">child's name</span>) parents,</h3>
            <p>I'm sending you an invoice for this year's (<span className="italic">month</span>)  after school activity (<span className="italic">activity title</span>). Thank you for allowing your child to attend to (<span className="italic">activity title</span>)</p>
            <p>Bank: (<span className="italic">bank name</span>)</p>
            <p>Recipient: (<span className="italic">recipient's full name</span>)</p>
            <p>Account no.: (<span className="italic">account no.</span>)</p>
            <p>To pay: (<span className="italic">price</span>)</p>
            <p>Please enter your child's name and the month you're paying for in the details of the transaction.</p>
            <p>Sincerely,</p>
            <p>(<span className="italic">activity title</span>) teacher (<span className="italic">teacher's name</span>)</p>
            <p>Phone no.: (<span className="italic">phone no.</span>)</p>
        </div>
    );
}
 
export default Strawberry;