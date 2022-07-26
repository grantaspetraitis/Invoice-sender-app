import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import FAQ from "../components/FAQ";
import { AppContext } from "../Context";
import Register from "./Register";

const Home = () => {

    const ref = useRef(null)
    const { hash } = useLocation();

    useEffect(() => {
        if(hash === ''){
            window.scrollTo(0, 0);
        } else {
            setTimeout(() => {
                ref.current.scrollIntoView({ behavior: "smooth" });
              }, 0);
        }
    }, [hash]);

    const { login } = useContext(AppContext);
    console.log(hash)

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
            <div ref={ref} className="faq-container">
                <FAQ id="faq" />
            </div>
        </div>
    );
}

export default Home;