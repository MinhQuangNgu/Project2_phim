import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { publicRouter } from "./routes/Routes";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HeaderSlice from "./components/header/HeaderSlice";
import HeaderSliceD from "./components/header/HeaderSliceD";
import { useState } from "react";

function App() {
    const [turnSlide, setTurnSlide] = useState(false);
    return (
        <Router>
            <div className="App">
                <Header setTurnSlide={setTurnSlide} />
                <Routes>
                    {publicRouter.map((item) => {
                        const Page = item.element;
                        return item.exact ? (
                            <Route element={<Page />} path={item.path} exact />
                        ) : (
                            <Route element={<Page />} path={item.path} />
                        );
                    })}
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
            <ToastContainer />
        </Router>
    );
}

export default App;
