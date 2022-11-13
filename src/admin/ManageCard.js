import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
const ManageCard = ({ item, setDeleteMovie }) => {
    const navigate = useNavigate();
    return (
        <div className="manager_card_container">
            <div className="manager_card_image_container">
                <img src={item?.image} />
            </div>
            <div className="manager_card_title_container">
                <h1>{item?.title}</h1>
            </div>
            <div className="manager_card_button_container">
                <button
                    onClick={() => {
                        navigate(`/admin/movie/update/${item?.slug}`);
                    }}
                    className="manager_update_button"
                >
                    Cập nhật
                </button>
                {item?.type !== "phim-le" && (
                    <button
                        onClick={() => {
                            navigate(`/admin/chapter/update/${item?.slug}`);
                        }}
                        className="manager_update_button"
                    >
                        Chapter
                    </button>
                )}
                <button
                    onClick={() => {
                        setDeleteMovie(item);
                    }}
                    className="manager_delete_button"
                >
                    Xóa
                </button>
            </div>
        </div>
    );
};

export default ManageCard;
