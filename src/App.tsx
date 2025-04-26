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
import { NewsAdminPage } from './pages/admin/NewsAdminPage';
import { AddNewsPage } from './pages/admin/AddNewsPage';
import { EditNewsPage } from './pages/admin/EditNewsPage';
import AdminLoginPage from './pages/admin/LoginPage';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                {/* Публичные маршруты */}
                <Route path="/" element={<HomePage />} />
                <Route path="/veterans" element={<VeteransPage />} />
                <Route path="/veterans/:id" element={<VeteranDetailsPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetailsPage />} />
                
                {/* Маршрут для входа в админ панель */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                
                {/* Защищенные маршруты для админ панели */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/admin/dashboard" element={<DashboardPage />} />
                    
                    {/* Маршруты для управления ветеранами */}
                    <Route path="/admin/veterans" element={<VeteransAdminPage />} />
                    <Route path="/admin/veterans/add" element={<AddVeteranPage />} />
                    <Route path="/admin/veterans/edit/:id" element={<EditVeteranPage />} />
                    
                    {/* Маршруты для управления новостями */}
                    <Route path="/admin/news" element={<NewsAdminPage />} />
                    <Route path="/admin/news/add" element={<AddNewsPage />} />
                    <Route path="/admin/news/edit/:id" element={<EditNewsPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
