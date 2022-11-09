import React from "react";
import { Link } from "react-router-dom";

const SlideSideMobile = ({ typeCheck }) => {
    return (
        <ul
            className={
                typeCheck
                    ? "type_mobile_container"
                    : "type_mobile_container type_mobile_container-hidden"
            }
        >
            <Link className="type_mobile-itemstype" to="/">
                <li className="type_mobile-item_type">Hành động</li>
            </Link>
            <Link className="type_mobile-itemstype" to="/">
                <li className="type_mobile-item_type">Hành động</li>
            </Link>
            <Link className="type_mobile-itemstype" to="/">
                <li className="type_mobile-item_type">Hành động</li>
            </Link>
            <Link className="type_mobile-itemstype" to="/">
                <li className="type_mobile-item_type">Hành động</li>
            </Link>
            <Link className="type_mobile-itemstype" to="/">
                <li className="type_mobile-item_type">Hành động</li>
            </Link>
            <Link className="type_mobile-itemstype" to="/">
                <li className="type_mobile-item_type">Hành động</li>
            </Link>
        </ul>
    );
};

export default SlideSideMobile;
