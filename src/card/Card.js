import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Card = ({ item }) => {
    return (
        <div className="card_container">
            <Link className="card_image-container" to={`/phim/${item?.slug}`}>
                <img className="card_image" src={item?.image} />
                <div className="card_title-container">
                    <p>{item?.title}</p>
                </div>
            </Link>
            <div className="card_detail-container">
                <p style={{ margin: 0 }}>{item?.status}</p>
            </div>
        </div>
    );
};

export default Card;
