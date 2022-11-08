import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Watch = () => {
    return (
        <div className="watch_container">
            <div className="grid wideS">
                <div className="watch_wrap">
                    <ul className="watch_top_content">
                        <Link className="watch_top-items" to="/">
                            <li>Home /</li>
                        </Link>
                        <Link className="watch_top-items" to="/">
                            <li>Hành động /</li>
                        </Link>
                        <Link className="watch_top-items" to="/">
                            <li>Phi Cơ Siêu Đẳng /</li>
                        </Link>
                        <Link className="watch_top-items" to="/">
                            <li>Tập full</li>
                        </Link>
                    </ul>
                    <div className="watcher_container">
                        <div className="row">
                            <div className="col c-12 m-0 l-0">
                                <iframe
                                    width="100%"
                                    height="200"
                                    src="https://short.ink/fU4n6-aTxq"
                                    frameborder="0"
                                    scrolling="0"
                                    allowfullscreen
                                ></iframe>
                            </div>
                            <div className="col c-0 m-12 l-0">
                                <iframe
                                    width="100%"
                                    height="450"
                                    src="https://short.ink/fU4n6-aTxq"
                                    frameborder="0"
                                    scrolling="0"
                                    allowfullscreen
                                ></iframe>
                            </div>
                            <div className="col c-0 m-0 l-12">
                                <iframe
                                    width="100%"
                                    height="550"
                                    src="https://short.ink/fU4n6-aTxq"
                                    frameborder="0"
                                    scrolling="0"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </div>
                        <div className="watcher_name_wrap">
                            <h3>Phi Cơ Siêu Đẳng (Mavel Rick 2022)</h3>
                        </div>
                        <div className="episode_container">
                            <Link className="link_episode" to="/">
                                <div className="episode_items">Tập 1</div>
                            </Link>
                            <Link className="link_episode" to="/">
                                <div className="episode_items">Tập 1</div>
                            </Link>
                            <Link className="link_episode" to="/">
                                <div className="episode_items">Tập 1</div>
                            </Link>
                            <Link className="link_episode" to="/">
                                <div className="episode_items">Tập 1</div>
                            </Link>
                            <Link className="link_episode" to="/">
                                <div className="episode_items active">
                                    Tập 1
                                </div>
                            </Link>
                            <Link className="link_episode" to="/">
                                <div className="episode_items">Tập 1</div>
                            </Link>
                            <Link className="link_episode" to="/">
                                <div className="episode_items">Tập 1</div>
                            </Link>
                            <Link className="link_episode" to="/">
                                <div className="episode_items">Tập 1</div>
                            </Link>
                            <Link className="link_episode" to="/">
                                <div className="episode_items">Tập 1</div>
                            </Link>
                            <Link className="link_episode" to="/">
                                <div className="episode_items">Tập 1</div>
                            </Link>
                            <Link className="link_episode" to="/">
                                <div className="episode_items">Tập 1</div>
                            </Link>
                            <Link className="link_episode" to="/">
                                <div className="episode_items">Tập 1</div>
                            </Link>
                            <Link className="link_episode" to="/">
                                <div className="episode_items">Tập 1</div>
                            </Link>
                        </div>
                    </div>
                    <div className="comment_container"></div>
                </div>
            </div>
        </div>
    );
};

export default Watch;
