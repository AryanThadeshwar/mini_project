import React from "react";
import "../Styles/Footer.scss"
import { MdEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPayment } from "react-icons/md";
const Footer = () => {
    return (
        <div className="footer" style={{background:"#0c2761ff",padding:"100px 80px"}}>
            <div style={styles.logoContainer} className="footer_left">
                <Link to='/' style={styles.link}> <FaHome style={styles.logo} /> <span style={styles.logoText}>PG</span><span style={styles.logoText2}>Wale</span></Link>
            </div>

            <div className="footer_center" >
                <ul style={{color:"#c7c7c7"}}>
                    <li>About Us</li>
                    <li>Terms and Conditions</li>
                    <li>Return and Refund Policy</li>
                </ul>
            </div>

            <div className="footer_right">
                <h3>Contact</h3>
                <div className="footer_right_info">
                    <MdLocalPhone />
                    <p>+91 9510487561</p>
                </div>
                <div className="footer_right_info">
                    <MdEmail />
                    <p>PGWale@support.com</p>
                </div>
            </div>
        </div>
    )
}
const styles = {
    logoContainer: {
        marginRight: 'auto',
        display: "flex",
        alignItems: "baseline",
        gap: "5px"
    },
    link: {
        textDecoration: 'none',
    },
    logo: {
        cursor: 'pointer',
        color: "#fff",
        fontSize: "3.2rem"
    },
    logoText: {
        fontSize: "2.4rem",
        color: "#76ABAE",
        fontWeight: "900"
    },
    logoText2: {
        fontSize: "1.8rem",
        color: "#fff"
    },
}
export default Footer