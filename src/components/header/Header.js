import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./style.css";
function Header({ setTurnSlide }) {
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
                                    <Navbar name="Thể Loại" />
                                    <Navbar name="Quốc gia" />
                                    <Navbar name="Năm Phát Hành" />
                                </ul>
                            </div>
                            <div className="col c-0 m-3 l-3">
                                <div className="header_search-container">
                                    <div className="header_search-wrap">
                                        <input
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
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <div className="icon_bar_container">
                                        <i
                                            onClick={() => {
                                                setTurnSlide(true);
                                            }}
                                            className="fa-solid fa-bars"
                                        ></i>
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
