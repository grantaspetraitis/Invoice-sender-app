import { Link, useNavigate } from 'react-router-dom';

const FAQ = () => {

    return (
        <div>
            <h3 style={{ color: "#007655", marginTop: 50 }}>Frequently asked questions</h3>
            <ul>
                <li className="faq-heading">1. How do I start using this app?</li>
                <p>First, start by creating a free account. Next, navigate to the <Link style={{ textDecoration: "none" }} to='/details'>Account details</Link> page to fill out your personal info.</p>
            </ul>
            <ul>
                <li className="faq-heading">2. How do I add contacts?</li>
                <p>Navigate to your <Link style={{ textDecoration: "none" }} to='/profile'>profile</Link> page. Then go to the form at the bottom of the page and fill in your contacts' email addresses and names.</p>
            </ul>
            <ul>
                <li className="faq-heading">3. How do I send an invoice?</li>
                <p>There are two ways of sending invoices:</p>
                <p>1. You can send a single invoice from your profile page after adding a contact. Just fill in the details and hit send!</p>
                <p>2. It's also possible to send multiple invoices at once. Go to the <Link style={{ textDecoration: "none" }} to='/newinvoice'>Send an invoice</Link> page and select all recipients that you want. Fill in the details, pick a template and you're good to go! </p>
            </ul>
            <ul>
                <li className="faq-heading">4. Can't send invoice! What should I do?</li>
                <p>Make sure you've filled in your personal details in the <Link style={{ textDecoration: "none" }} to='/details'>Account details</Link> page. After you've done so, you should be able to send invoices which contain your details.</p>
            </ul>
        </div>
    );
}
 
export default FAQ;