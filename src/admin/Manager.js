import React from "react";
import { useNavigate } from "react-router-dom";
import ManageCard from "./ManageCard";
import "./style.css";
const Manager = () => {
    const navigate = useNavigate();

    return (
        <div className="grid wide">
            <div className="manager_container">
                <div className="manager_title">
                    <h1>Quản lí phim</h1>
                </div>
                <div className="manager_create_container">
                    <button
                        onClick={() => {
                            navigate("/admin/movie/create");
                        }}
                    >
                        Tạo phim
                    </button>
                </div>
                <div className="manager_searching">
                    <input type="text" placeholder="Tìm phim" />
                </div>
                <div className="row">
                    <div className="col c-6 m-4 l-3">
                        <ManageCard />
                    </div>
                    <div className="col c-6 m-4 l-3">
                        <ManageCard />
                    </div>
                    <div className="col c-6 m-4 l-3">
                        <ManageCard />
                    </div>
                    <div className="col c-6 m-4 l-3">
                        <ManageCard />
                    </div>
                    <div className="col c-6 m-4 l-3">
                        <ManageCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manager;
