import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { publicRouter } from './routes/Routes';

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                {publicRouter.map(item => {
                    const Page = item.element;
                    return item.exact ? <Route 
                    element={<Page />}
                    path={item.path}
                    exact
                    /> : 
                    <Route 
                    element={<Page />}
                    path={item.path}
                    />
                })}
            </Routes>
        </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
