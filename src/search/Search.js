import React from "react";
import { Link } from "react-router-dom";
import Card from "~/card/Card";
import "./style.css";
const Search = () => {
    return (
        <div className="search_container">
            <div className="grid wide">
                <div className="search_filter_container">
                    <select className="search_filter-select">
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                    </select>
                    <select className="search_filter-select">
                        <option>Thể Loại</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                    </select>
                    <select className="search_filter-select">
                        <option>Quốc Gia</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                    </select>
                    <select className="search_filter-select">
                        <option>Năm Phát Hành</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                        <option>Phim mới nhất</option>
                    </select>
                    <Link to="/">
                        <button className="search_button">Tìm Kiếm</button>
                    </Link>
                </div>
                <div className="search_items_container">
                    <div className="row">
                        <div className="col c-6 m-4 l-3">
                            <Card />
                        </div>
                        <div className="col c-6 m-4 l-3">
                            <Card />
                        </div>
                        <div className="col c-6 m-4 l-3">
                            <Card />
                        </div>
                        <div className="col c-6 m-4 l-3">
                            <Card />
                        </div>
                        <div className="col c-6 m-4 l-3">
                            <Card />
                        </div>
                        <div className="col c-6 m-4 l-3">
                            <Card />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
