import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteMovie from "./DeleteMovie";
import ManageCard from "./ManageCard";
import "./style.css";
const Manager = ({ cache }) => {
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [deleteMovie, setDeleteMovie] = useState("");

    const searchRef = useRef();

    const { search } = useLocation();

    useEffect(() => {
        const searching = new URLSearchParams(search).get("searching") || "";

        let url = searching ? `/movie?searching=${searching}` : "/movie";
        if (cache.current[url]) {
            return setMovies(cache.current[url]);
        }
        axios
            .get(url)
            .then((res) => {
                setMovies(res.data?.movies);
                cache.current[url] = res.data?.movies;
            })
            .catch((err) => {
                toast.error(err?.response?.data?.msg);
            });
    }, [search]);
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
                    <input
                        ref={searchRef}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (searchRef.current.value) {
                                    navigate(
                                        `?searching=${searchRef.current?.value}`
                                    );
                                } else {
                                    navigate("?");
                                }
                            }
                        }}
                        name="searching"
                        type="text"
                        placeholder="Tìm phim"
                    />
                </div>
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
