import React from "react";
import Categary from "~/categary/Categary";
import Recommend from "./Recommend";
import "./style.css";

function Home({ cache }) {
    return (
        <div className="home_container">
            <div className="grid wide">
                <Recommend cache={cache} />
                <Categary
                    cache={cache}
                    urlAl="/tim-kiem?sort=watch"
                    name="Phim Top"
                    url="/movie?sort=watch&limit=8"
                />
                <Categary
                    cache={cache}
                    urlAl="/tim-kiem?type=phim-le"
                    name="Phim lẻ"
                    url="/movie?type=phim-le&limit=8"
                />
                <Categary
                    cache={cache}
                    urlAl="/tim-kiem?type=phim-bo"
                    name="Phim bộ"
                    url="/movie?type=phim-bo&limit=8"
                />
                <Categary
                    cache={cache}
                    urlAl="/tim-kiem?sort=anime"
                    name="Anime"
                    url="/movie?type=anime&limit=8"
                />
            </div>
        </div>
    );
}

export default Home;
