import Home from "~/components/home/Home";
import MovieDetail from "~/movieDetail/MovieDetail";
import Search from "~/search/Search";
import Watch from "~/watchDetail/Watch";

export const publicRouter = [
    {
        element: Home,
        path: "/",
        exact: true,
    },
    {
        element: MovieDetail,
        path: "/phim/:slug",
    },
    {
        element: Watch,
        path: "/xem-phim/:slug",
    },
    {
        element: Search,
        path: "/tim-kiem",
    },
];

export const privateRouter = [];
