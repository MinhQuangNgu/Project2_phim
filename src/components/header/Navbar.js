import React from "react";
import { Link } from "react-router-dom";

function Navbar({ name }) {
    return (
        <div className="header_navbar-link-wrap">
            <Link className="header_navbar-link-wrap" to="/">
                <li>{name}</li>
            </Link>
            <div className="header_navbar-link-item-container">
                <ul className="header_navbar-link-item-wrap">
                    <Link className="header_navbar-link-item" to="/asdds">
                        <li>Phim hành động</li>
                    </Link>
                    <Link className="header_navbar-link-item" to="/">
                        <li>Phim hành động</li>
                    </Link>
                    <Link className="header_navbar-link-item" to="/">
                        <li>Phim hành động</li>
                    </Link>
                    <Link className="header_navbar-link-item" to="/">
                        <li>Phim hành động</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
