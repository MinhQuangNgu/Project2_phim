import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "~/card/Card";
import { isFailing, isLoading, isSuccess } from "~/redux/slice/auth";
import "./style.css";
const Search = () => {
    const { search } = useLocation();
    const [movies, setMovies] = useState({});
    const dispatch = useDispatch();
    const [kinds, setKinds] = useState([]);
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        let here = true;
        if (here) {
            const url = "/kind";
            axios
                .get(url)
                .then((res) => {
                    setKinds(res.data.kinds);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.msg);
                });
        }
        return () => {
            here = false;
        };
    }, []);
    useEffect(() => {
        let here = true;
        if (here) {
            const url = "/country";
            axios
                .get(url)
                .then((res) => {
                    setCountries(res.data.countries);
                })
                .catch((err) => {
                    dispatch(isFailing());
                    toast.error(err?.response?.data?.msg);
                });
        }
        return () => {
            here = false;
        };
    }, []);

    useEffect(() => {
        let here = true;
        const url = `/movie`;

        if (here) {
            dispatch(isLoading());
            axios
                .get(url)
                .then((res) => {
                    dispatch(isSuccess());
                    setMovies(res.data);
                })
                .catch(() => {
                    dispatch(isFailing());
                });
        }
        return () => {
            here = false;
        };
    }, [search]);

    return (
        <div className="search_container">
            <div className="grid wide">
                <div className="search_filter_container">
                    <select name="sort" className="search_filter-select">
                        <option value="">Phim mới</option>
                        <option value="createdAt">Phim cũ</option>
                        <option value="-watching">Xem nhiều nhất</option>
                        <option value="watching">Xem ít nhất</option>
                    </select>
                    <select name="the-loai" className="search_filter-select">
                        <option value="">Thể Loại</option>
                        {kinds?.map((item) => (
                            <option
                                value="item?.slug"
                                key={item?._id + "kinds"}
                            >
                                {item?.title}
                            </option>
                        ))}
                    </select>
                    <select name="quoc-gia" className="search_filter-select">
                        <option value="">Quốc gia</option>
                        {countries?.map((item) => (
                            <option
                                value="item?.slug"
                                key={item?._id + "kinds"}
                            >
                                {item?.name}
                            </option>
                        ))}
                    </select>
                    <select name="isseries" className="search_filter-select">
                        <option value="">Loại Phim</option>
                        <option value="false">Phim lẻ</option>
                        <option value="true">Phim bộ</option>
                    </select>
                    <button className="search_button">Tìm Kiếm</button>
                </div>
                <div className="search_items_container">
                    <div className="row">
                        {movies?.movies?.map((item) => (
                            <div
                                key={item?._id + "Searching"}
                                className="col c-6 m-4 l-3"
                            >
                                <Card item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
