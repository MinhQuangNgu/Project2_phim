import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { privateRouter, publicRouter } from "./routes/Routes";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HeaderSlice from "./components/header/HeaderSlice";
import HeaderSliceD from "./components/header/HeaderSliceD";
import { useState } from "react";
import { useSelector } from "react-redux";
import AdminManger from "./admin/AdminManger";
import NotFound from "./notfound/NotFound";

function App() {
    const [turnSlide, setTurnSlide] = useState(false);
    const auth = useSelector((state) => state.auth);
    return (
        <Router>
            <div className="App">
                <Header setTurnSlide={setTurnSlide} />
                {auth.user?.accessToken && <AdminManger />}
                <Routes>
                    {publicRouter.map((item) => {
                        const Page = item.element;
                        return item.exact ? (
                            <Route
                                key={item.path}
                                element={<Page />}
                                path={item.path}
                                exact
                            />
                        ) : (
                            <Route
                                key={item.path}
                                element={<Page />}
                                path={item.path}
                            />
                        );
                    })}
                    {auth?.user?.accessToken &&
                        privateRouter.map((item) => {
                            const Page = item.element;
                            return item.exact ? (
                                <Route
                                    key={item.path}
                                    element={<Page />}
                                    path={item.path}
                                    exact
                                />
                            ) : (
                                <Route
                                    key={item.path}
                                    element={<Page />}
                                    path={item.path}
                                />
                            );
                        })}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
                <div className="row">
                    <div className="col c-12 m-0 l-0">
                        <HeaderSlice
                            turnSlide={turnSlide}
                            setTurnSlide={setTurnSlide}
                        />
                        <HeaderSliceD
                            turnSlide={turnSlide}
                            setTurnSlide={setTurnSlide}
                        />
                    </div>
                </div>
            </div>
            <div className="app-pc">
                <ToastContainer
                    autoClose={1500}
                    style={{ fontSize: "1.5rem" }}
                />
            </div>
            <div className="app-mobile">
                <ToastContainer
                    autoClose={1500}
                    position="top-left"
                    style={{ fontSize: "1.5rem", width: "50%" }}
                />
            </div>
        </Router>
    );
}

export default App;
