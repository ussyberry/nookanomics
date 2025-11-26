import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Directory from './pages/Directory';
import Videos from './pages/Videos';
import Merchandise from './pages/Merchandise';
import Villagers from './pages/Villagers';
import Critters from './pages/Critters';
import Art from './pages/Art';
import Fashion from './pages/Fashion';
import RealEstate from './pages/RealEstate';
import Manufacturing from './pages/Manufacturing';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/villagers" element={<Villagers />} />
                    <Route path="/critters" element={<Critters />} />
                    <Route path="/art" element={<Art />} />
                    <Route path="/fashion" element={<Fashion />} />
                    <Route path="/real-estate" element={<RealEstate />} />
                    <Route path="/manufacturing" element={<Manufacturing />} />
                    <Route path="/directory" element={<Directory />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/merchandise" element={<Merchandise />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
