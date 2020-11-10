import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logo from '../images/logo.svg'
import '../css/Footer.css'
const Footer = () => {
  return (
      <div className="footer">
        <MDBFooter color="blue" className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                <MDBCol md="6">
                    <Link to="/"><img src={ Logo }></img></Link>
                </MDBCol>
                <MDBCol md="6">
                    <h5 className="title">Links</h5>
                    <ul>
                    <li className="list-unstyled">
                        <a href="#!">Link 1</a>
                    </li>
                    <li className="list-unstyled">
                        <a href="#!">Link 2</a>
                    </li>
                    <li className="list-unstyled">
                        <a href="#!">Link 3</a>
                    </li>
                    <li className="list-unstyled">
                        <a href="#!">Link 4</a>
                    </li>
                    </ul>
                </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> Rapper Underground </a>
                </MDBContainer>
            </div>
        </MDBFooter>
      </div>
    
  );
}

export default Footer;