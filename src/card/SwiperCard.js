import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function SwiperCard() {
    return (
        <div className="swiperCard_container">
            <Link className="swiperCard_link-container" to={`/phim/asds`}>
                <img
                    className="swiperCard_image"
                    src="https://anhdephd.vn/wp-content/uploads/2022/05/background-dep.jpg"
                />
                <div className="swiperCard_title">
                    <p>Siêu Anh Hùng Trở Lại</p>
                </div>
            </Link>
            <div className="cardSwiper_detail-container">
                <p style={{ margin: 0 }}>HD | Vietsub</p>
            </div>
        </div>
    );
}

export default SwiperCard;
