import axios from "axios";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./style.css";
const DeleteMovie = ({ setDeleteMovie, deleteMovie }) => {
    const auth = useSelector((state) => state.auth);
    const confirmRef = useRef();
    const handleDeleteMovie = async () => {
        // if (confirmRef.current.value !== "aquangdepzai") {
        //     setDeleteMovie("");
        //     return;
        // }
        try {
            const data = await axios.delete(
                `/movie/delete/${deleteMovie?._id}`,
                {
                    headers: {
                        token: `Bearer ${auth?.user?.accessToken}`,
                    },
                }
            );
            toast.success(data?.data?.msg);
            setDeleteMovie("");
        } catch (err) {
            toast.error(err?.message);
        }
    };
    return (
        <div className="movie-delete_container">
            <div className="movie-delete_wrap">
                <div className="movie-delete_icons">
                    <i
                        onClick={() => {
                            setDeleteMovie("");
                        }}
                        style={{ cursor: "pointer" }}
                        className="fa-regular fa-circle-xmark"
                    ></i>
                </div>
                <div className="movie-delete_title">
                    <span>
                        Bạn có thực sự muốn xóa {deleteMovie?.title} không ?
                    </span>
                </div>
                <div className="movie-delete_input">
                    <input ref={confirmRef} type="password" />
                </div>
                <div className="movie-delete_button">
                    <button
                        onClick={handleDeleteMovie}
                        className="movie-delete_button-confirm"
                    >
                        Xóa
                    </button>
                    <button
                        onClick={() => {
                            setDeleteMovie("");
                        }}
                        className="movie-delete_button-cancel"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteMovie;
