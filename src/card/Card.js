import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Card = () => {
    return (
        <div className="card_container">
            <Link className="card_image-container" to={`/phim/asdd`}>
                <img
                    className="card_image"
                    src="https://cdn.popsww.com/blog/sites/2/2021/06/top-phim-hay-2020.jpg"
                />
                <div className="card_title-container">
                    <p>Chiếc điện thoại đen</p>
                </div>
            </Link>
            <div className="card_detail-container">
                <p style={{ margin: 0 }}>HD | Vietsub</p>
            </div>
        </div>
    );
};

export default Card;
