import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Directory', path: '/directory' },
        { name: 'Videos', path: '/videos' },
        { name: 'Merchandise', path: '/merchandise' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/70 backdrop-blur-md">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 px-6 py-3 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-green-700 font-bold text-xl tracking-tight">
                        <Leaf className="w-6 h-6 fill-current" />
                        <span>Nookanomics</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative text-sm font-medium transition-colors hover:text-green-600 ${location.pathname === item.path ? 'text-green-700' : 'text-gray-600'}`}
                            >
                                {item.name}
                                {location.pathname === item.path && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-500 rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-6 right-6 md:hidden"
                    >
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-4 flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`p-3 rounded-xl text-center font-medium transition-colors ${location.pathname === item.path ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
