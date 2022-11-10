import Login from "~/admin/Login";
import MovieCreate from "~/admin/MovieCreate";
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
    {
        element: Login,
        path: "/admin/login",
    },
];

export const privateRouter = [
    {
        element: MovieCreate,
        path: "/admin/create",
    },
];
