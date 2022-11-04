import Home from "~/components/home/Home"
import MovieDetail from "~/movieDetail/MovieDetail"
import Watch from "~/watchDetail/Watch"

 
export const publicRouter = [
    {
        element:Home,
        path:'/',
        exact:true
    },
    {
        element:MovieDetail,
        path:'/phim/:slug'
    },
    {
        element:Watch,
        path:'/xem-phim/:slug'
    }
]

export const privateRouter = [

]