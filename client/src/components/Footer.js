import React from "react";
import "../App.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          {/* <div className="col">
            <h4>AclProject</h4>
            <h1 className="list-unstyled">
              <li>01099887766</li>
              <li>Cairo, Egypt</li>
              <li>GUC</li>
            </h1>
          </div> */}
          {/* Column2 */}
          <div className="col">
            <h4>AclProject</h4>
            <ui className="list-unstyled">
              <li>About</li>
              <li>Blog</li>
              <li>Contact</li>
            </ui>
          </div>
          <div className="col">
            <h4>Top Regional Destinations</h4>
            <ui className="list-unstyled">
              <li>Cairo</li>
              <li>France</li>
              <li>Rome</li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Connect</h4>
            <ui className="list-unstyled">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} AclProject | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
