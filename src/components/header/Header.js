import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import "./style.css";
function Header({ setTurnSlide }) {
    const searchingRef = useRef();
    const searchingPcRef = useRef();
    const [searching, setSearching] = useState(true);
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
                    toast.error(err?.response?.data?.msg);
                });
        }
        return () => {
            here = false;
        };
    }, []);
    const navigate = useNavigate();
    return (
        <div className="header_container">
            <div className="grid wide">
                <div className="row">
                    <div className="col c-0 m-12 l-12">
                        <div className="row">
                            <div className="col c-0 m-1 l-1">
                                <Link
                                    className="header_brandImage-container"
                                    to="/"
                                >
                                    <img src="https://res.cloudinary.com/sttruyen/image/upload/v1660379654/295631243_1022629278418391_936904009150532582_n_rdsnbh.png" />
                                </Link>
                            </div>
                            <div className="col c-0 m-8 l-8">
                                <ul className="header_navbar-container">
                                    <Link
                                        className="header_navbar-link-wrap"
                                        to="/"
                                    >
                                        <li>Phim Mới</li>
                                    </Link>
                                    <Link
                                        className="header_navbar-link-wrap"
                                        to="/"
                                    >
                                        <li>Phim Bộ</li>
                                    </Link>
                                    <Link
                                        className="header_navbar-link-wrap"
                                        to="/"
                                    >
                                        <li>Phim Hot</li>
                                    </Link>
                                    <Link
                                        className="header_navbar-link-wrap"
                                        to="/"
                                    >
                                        <li>Phim Anime</li>
                                    </Link>
                                    <Navbar
                                        sea="the-loai"
                                        item={kinds}
                                        isType={true}
                                        name="Thể Loại"
                                    />
                                    <Navbar
                                        sea="quoc-gia"
                                        item={countries}
                                        isType={false}
                                        name="Quốc gia"
                                    />
                                </ul>
                            </div>
                            <div className="col c-0 m-3 l-3">
                                <div className="header_search-container">
                                    <div className="header_search-wrap">
                                        <input
                                            onKeyDown={(e) => {
                                                if (e.code === "Enter") {
                                                    navigate(
                                                        `/tim-kiem?searching=${searchingPcRef.current.value}`
                                                    );
                                                    searchingPcRef.current.value =
                                                        "";
                                                }
                                            }}
                                            ref={searchingPcRef}
                                            placeholder="Tìm Phim"
                                            type="text"
                                        />
                                        <div className="header_search-icons">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{ padding: "0 3rem" }}
                        className="col c-12 m-0 l-0"
                    >
                        <div className="row">
                            <div className="col c-6">
                                <Link to="/">
                                    <div className="image_mobile_container">
                                        <img src="https://res.cloudinary.com/sttruyen/image/upload/v1660379654/295631243_1022629278418391_936904009150532582_n_rdsnbh.png" />
                                    </div>
                                </Link>
                            </div>
                            <div className="col c-6">
                                <div className="icon_container">
                                    <div className="icon_searching_container">
                                        <i
                                            onClick={() => {
                                                setTurnSlide(false);
                                                setSearching(!searching);
                                                searchingRef.current.value = "";
                                            }}
                                            style={{ cursor: "pointer" }}
                                            className="fa-solid fa-magnifying-glass"
                                        ></i>
                                    </div>
                                    <div className="icon_bar_container">
                                        <i
                                            onClick={() => {
                                                setTurnSlide(true);
                                            }}
                                            className="fa-solid fa-bars"
                                        ></i>
                                    </div>
                                    <div
                                        className={
                                            searching
                                                ? "searching_mobile_input_container"
                                                : "searching_mobile_input_container searching_mobie_input-appear"
                                        }
                                    >
                                        <input
                                            ref={searchingRef}
                                            onKeyDown={(e) => {
                                                if (e.code === "Enter") {
                                                    navigate(
                                                        `/tim-kiem?searching=${searchingRef.current.value}`
                                                    );
                                                    searchingRef.current.value =
                                                        "";
                                                }
                                            }}
                                            name="searching"
                                            placeholder="Tìm phim"
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
