import React from "react";
import Categary from "~/categary/Categary";
import Recommend from "./Recommend";
import "./style.css";

function Home() {
    return (
        <div className="home_container">
            <div className="grid wide">
                <Recommend />
                <Categary
                    urlAl="/tim-kiem?sort=watch"
                    name="Phim Top"
                    url="/movie?sort=watch&limit=8"
                />
                <Categary
                    urlAl="/tim-kiem?type=phim-le"
                    name="Phim lẻ"
                    url="/movie?type=phim-le&limit=8"
                />
                <Categary
                    urlAl="/tim-kiem?type=phim-bo"
                    name="Phim bộ"
                    url="/movie?type=phim-bo&limit=8"
                />
                <Categary
                    urlAl="/tim-kiem?sort=anime"
                    name="Anime"
                    url="/movie?type=anime&limit=8"
                />
            </div>
        </div>
    );
}

export default Home;
