import { useContext } from "react";
import FAQ from "../components/FAQ";
import { AppContext } from "../Context";
import Register from "./Register";

const Home = () => {

    const { login } = useContext(AppContext);
    return (
        <div className="home-container">
            <div className="hero-rect">
                <p className="hero-paragraph">Sending invoices has never been so easy! Sign up for a new account and start getting paid.</p>
            </div>
            <div className="form-container-home">
                {
                    !login && <Register />
                }
            </div>
            <div className="faq-container">
                <FAQ />
            </div>
        </div>
    );
}
 
export default Home;