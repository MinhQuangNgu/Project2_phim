import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

const Comment = () => {
    const { slug } = useParams();
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "491580756073694",
                xfbml: true,
                version: "v14.0",
            });
            window.FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/vi_VN/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    }, [slug]);

    return (
        <div className="comment_container">
            <div
                className="fb-comments"
                data-href={`https://sttruyen.xyz?${slug}`}
                data-width="100%"
                data-numposts="8"
            ></div>
        </div>
    );
};

export default Comment;
