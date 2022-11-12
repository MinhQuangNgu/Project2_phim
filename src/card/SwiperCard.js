import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function SwiperCard({ item }) {
    return (
        <div className="swiperCard_container">
            <Link
                className="swiperCard_link-container"
                to={`/phim/${item?.slug}`}
            >
                <img className="swiperCard_image" src={item?.image} />
                <div className="swiperCard_title">
                    <p>{item?.title}</p>
                </div>
            </Link>
            <div className="cardSwiper_detail-container">
                <p style={{ margin: 0 }}>{item?.status}</p>
            </div>
        </div>
    );
}

export default SwiperCard;
