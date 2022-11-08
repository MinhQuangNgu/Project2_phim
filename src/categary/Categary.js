import React from "react";
import { Link } from "react-router-dom";
import Card from "~/card/Card";
import "./style.css";

function Categary({ name }) {
    return (
        <div className="categary_container">
            <div className="categary_title">
                <Link className="categary_title-link" to="/">
                    <h1>{name}</h1>
                </Link>
                <Link to="/" className="categary_watchAll-container">
                    <div className="categary_watchAll-wrap">
                        <p style={{ margin: 0 }}>Xem tất cả</p>
                    </div>
                </Link>
            </div>
            <div className="categary_card-container">
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
                    <div className="col c-6 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-6 m-4 l-3">
                        <Card />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categary;
