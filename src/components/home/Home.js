import React from "react";
import Categary from "~/categary/Categary";
import Recommend from "./Recommend";
import "./style.css";

function Home() {
    return (
        <div className="home_container">
            <div className="grid wide">
                <Recommend />
                <Categary name="Phim Top" url="/movie?sort=watch&limit=8" />
                <Categary name="Phim lẻ" url="/movie?sort=watch&limit=8" />
                <Categary name="Phim bộ" url="/movie?sort=watch&limit=8" />
                <Categary name="Anime" url="/movie?sort=watch&limit=8" />
            </div>
        </div>
    );
}

export default Home;
