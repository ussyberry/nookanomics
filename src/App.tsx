import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Directory from './pages/Directory';
import Videos from './pages/Videos';
import Merchandise from './pages/Merchandise';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/directory" element={<Directory />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/merchandise" element={<Merchandise />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
