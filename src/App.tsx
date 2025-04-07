import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { VeteransPage } from './pages/VeteransPage';
import { VeteranDetailsPage } from './pages/VeteranDetailsPage';
import { NewsPage } from './pages/NewsPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/veterans" element={<VeteransPage />} />
                <Route path="/veterans/:id" element={<VeteranDetailsPage />} />
                <Route path="/news" element={<NewsPage />} />
                {/* Здесь будут другие маршруты */}
            </Routes>
        </Router>
    );
}

export default App;
