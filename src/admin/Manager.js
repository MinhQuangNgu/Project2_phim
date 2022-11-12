import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteMovie from "./DeleteMovie";
import ManageCard from "./ManageCard";
import "./style.css";
const Manager = () => {
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [deleteMovie, setDeleteMovie] = useState("");

    useEffect(() => {
        let here = true;
        let url = "/movie";
        if (here) {
            axios
                .get(url)
                .then((res) => {
                    if (!here) {
                        return;
                    }
                    setMovies(res.data?.movies);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.msg);
                });
        }
        return () => {
            here = false;
        };
    }, []);
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
                <form className="manager_searching">
                    <input
                        name="searching"
                        type="text"
                        placeholder="Tìm phim"
                    />
                </form>
                <div className="row">
                    {movies?.map((item) => (
                        <div
                            key={item?._id + "manager"}
                            className="col c-6 m-4 l-3"
                        >
                            <ManageCard
                                setDeleteMovie={setDeleteMovie}
                                item={item}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {deleteMovie && (
                <DeleteMovie
                    deleteMovie={deleteMovie}
                    setDeleteMovie={setDeleteMovie}
                />
            )}
        </div>
    );
};

export default Manager;
