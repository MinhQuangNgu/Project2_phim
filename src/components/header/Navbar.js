import React from "react";
import { Link } from "react-router-dom";

function Navbar({ name, item, isType, sea }) {
    return (
        <div className="header_navbar-link-wrap">
            <Link className="header_navbar-link-wrap" to="/">
                <li>{name}</li>
            </Link>
            <div className="header_navbar-link-item-container">
                <ul className="header_navbar-link-item-wrap">
                    {item?.map((infor) => (
                        <Link
                            key={infor?._id}
                            className="header_navbar-link-item"
                            to={`/tim-kiem?${sea}=${infor?.slug}`}
                        >
                            {isType ? (
                                <li>{infor?.title}</li>
                            ) : (
                                <li>{infor?.name}</li>
                            )}
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
