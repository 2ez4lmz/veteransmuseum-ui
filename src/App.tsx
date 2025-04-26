import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { VeteransPage } from './pages/VeteransPage';
import { VeteranDetailsPage } from './pages/VeteranDetailsPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailsPage } from './pages/NewsDetailsPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { VeteransAdminPage } from './pages/admin/VeteransAdminPage';
import { AddVeteranPage } from './pages/admin/AddVeteranPage';
import { EditVeteranPage } from './pages/admin/EditVeteranPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/veterans" element={<VeteransPage />} />
                <Route path="/veterans/:id" element={<VeteranDetailsPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetailsPage />} />
                
                {/* Маршруты для админ панели */}
                <Route path="/admin/dashboard" element={<DashboardPage />} />
                <Route path="/admin/veterans" element={<VeteransAdminPage />} />
                <Route path="/admin/veterans/add" element={<AddVeteranPage />} />
                <Route path="/admin/veterans/edit/:id" element={<EditVeteranPage />} />
                
                {/* Здесь будут другие маршруты */}
            </Routes>
        </Router>
    );
}

export default App;
