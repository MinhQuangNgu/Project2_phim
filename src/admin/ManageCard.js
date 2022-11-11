import React from "react";
import "./style.css";
const ManageCard = () => {
    return (
        <div className="manager_card_container">
            <div className="manager_card_image_container">
                <img src="https://cdn.popsww.com/blog/sites/2/2021/06/top-phim-hay-2020.jpg" />
            </div>
            <div className="manager_card_title_container">
                <h1>Chiếc điện thoại đen</h1>
            </div>
            <div className="manager_card_button_container">
                <button className="manager_update_button">Cập nhật</button>
                <button className="manager_delete_button">Xóa</button>
            </div>
        </div>
    );
};

export default ManageCard;
