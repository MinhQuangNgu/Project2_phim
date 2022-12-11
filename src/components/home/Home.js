import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Categary from "~/categary/Categary";
import Recommend from "./Recommend";
import "./style.css";

function Home({ cache }) {
    return (
        <div className="home_container">
            <HelmetProvider>
                <Helmet>
                    <title>Thế Giới Phim</title>
                    <link rel="canonical" href="https//sttruyen.xyz" />
                    <meta content="Sttruyen là web xem phim mọi thể loại.Chúng tôi hy vọng rằng bạn sẽ có 1 buổi xem phim thật tuyệt vời." />
                </Helmet>
            </HelmetProvider>
            <div className="grid wide">
                <Recommend cache={cache} />
                <Categary
                    cache={cache}
                    urlAl="/tim-kiem?sort=-watching"
                    name="Phim Top"
                    url="/movie?sort=-watching&limit=8"
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
