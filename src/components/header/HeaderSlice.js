import React, { useState } from "react";
import { Link } from "react-router-dom";
import SlideSideMobile from "./SlideSideMobile";
import "./style.css";

const HeaderSlice = ({ turnSlide, setTurnSlide }) => {
    const [typeCheck, setTypeCheck] = useState(false);
    const [countryCheck, setCountryCheck] = useState(false);
    const [yearCheck, setYearCheck] = useState(false);
    return (
        <div
            className={
                turnSlide
                    ? "mobile_slide_container"
                    : "mobile_slide_container header_slice_change"
            }
        >
            <div className="mobile_slide_wrap">
                <div className="times_icons_container">
                    <i
                        onClick={() => {
                            setTurnSlide(false);
                        }}
                        className="fa-regular fa-circle-xmark"
                    ></i>
                </div>
                <ul className="list_mobile_container">
                    <Link
                        onClick={() => {
                            setTurnSlide(false);
                        }}
                        className="list_mobile_items"
                        to="/"
                    >
                        <li className="mobile_list_item">Phim Mới</li>
                    </Link>
                    <Link className="list_mobile_items" to="/">
                        <li className="mobile_list_item-bottom">Phim Bộ</li>
                    </Link>
                    <Link className="list_mobile_items" to="/">
                        <li className="mobile_list_item-bottom">Phim Hot</li>
                    </Link>
                    <li
                        onClick={() => {
                            setTypeCheck(!typeCheck);
                        }}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingRight: "2rem",
                            cursor: "pointer",
                            position: "relative",
                        }}
                        className="mobile_list_item-bottom-select"
                    >
                        Thể loại
                        {typeCheck ? (
                            <i
                                style={{
                                    marginLeft: "0.5rem",
                                    marginTop: "0.6rem",
                                    fontSize: "2rem",
                                }}
                                class="fa-solid fa-angle-up"
                            ></i>
                        ) : (
                            <i
                                style={{
                                    marginLeft: "0.5rem",
                                    marginTop: "0.6rem",
                                    fontSize: "2rem",
                                }}
                                class="fa-solid fa-angle-down"
                            ></i>
                        )}
                    </li>
                    <SlideSideMobile typeCheck={typeCheck} />
                    <li
                        onClick={() => {
                            setCountryCheck(!countryCheck);
                        }}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingRight: "2rem",
                            cursor: "pointer",
                            position: "relative",
                        }}
                        className="mobile_list_item-bottom-select"
                    >
                        Quốc Gia
                        {countryCheck ? (
                            <i
                                style={{
                                    marginLeft: "0.5rem",
                                    marginTop: "0.6rem",
                                    fontSize: "2rem",
                                }}
                                class="fa-solid fa-angle-up"
                            ></i>
                        ) : (
                            <i
                                style={{
                                    marginLeft: "0.5rem",
                                    marginTop: "0.6rem",
                                    fontSize: "2rem",
                                }}
                                class="fa-solid fa-angle-down"
                            ></i>
                        )}
                    </li>
                    <SlideSideMobile typeCheck={countryCheck} />
                    <li
                        onClick={() => {
                            setYearCheck(!yearCheck);
                        }}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingRight: "2rem",
                            cursor: "pointer",
                            position: "relative",
                        }}
                        className="mobile_list_item-bottom-select"
                    >
                        Năm Phát Hành
                        {yearCheck ? (
                            <i
                                style={{
                                    marginLeft: "0.5rem",
                                    marginTop: "0.6rem",
                                    fontSize: "2rem",
                                }}
                                class="fa-solid fa-angle-up"
                            ></i>
                        ) : (
                            <i
                                style={{
                                    marginLeft: "0.5rem",
                                    marginTop: "0.6rem",
                                    fontSize: "2rem",
                                }}
                                class="fa-solid fa-angle-down"
                            ></i>
                        )}
                    </li>
                    <SlideSideMobile typeCheck={yearCheck} />
                </ul>
            </div>
        </div>
    );
};

export default HeaderSlice;
