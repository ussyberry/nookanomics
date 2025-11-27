import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Coins, Palette, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import artData from '../data/art.json';
import { fetchArt, NHArtwork } from '../services/nookipedia';

const Art = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [artworks, setArtworks] = useState<NHArtwork[]>([]);
    const [loading, setLoading] = useState(true);
    const [usingLocalData, setUsingLocalData] = useState(false);
    const [selectedArt, setSelectedArt] = useState<NHArtwork | null>(null);

    useEffect(() => {
        const loadArt = async () => {
            setLoading(true);
            try {
                const data = await fetchArt();
                setArtworks(data);
                setUsingLocalData(false);
            } catch (error) {
                console.warn('Failed to fetch from API, falling back to local data:', error);
                setUsingLocalData(true);
                // @ts-ignore - local data might not match exact API shape perfectly but is close enough for demo
                setArtworks(artData);
            } finally {
                setLoading(false);
            }
        };

        loadArt();
    }, []);

    const filteredArt = artworks.filter(art =>
        art.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.art_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
                >
                    Fine Art <span className="text-purple-600">Investment</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                >
                    Secure your portfolio with genuine masterpieces.
                    Avoid forgeries and maximize your museum's value.
                </motion.p>
            </div>

            {/* Controls */}
            <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name or real art title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none shadow-sm"
                    />
                </div>
            </div>

            {/* Content Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredArt.map((art) => (
                            <motion.div
                                layout
                                key={art.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                                onClick={() => setSelectedArt(selectedArt?.name === art.name ? null : art)}
                            >
                                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                                    <img
                                        src={art.real_info?.image_url || art.image_url}
                                        alt={art.name}
                                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://dodo.ac/np/images/thumb/a/ac/Leaf_NH_Icon.png/120px-Leaf_NH_Icon.png';
                                        }}
                                    />
                                    {art.has_fake && (
                                        <div className="absolute top-4 right-4 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3" />
                                            Has Forgery
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{art.name}</h3>
                                            <p className="text-sm text-gray-500 italic">{art.art_name}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="flex items-center gap-1 text-yellow-600 font-bold bg-yellow-50 px-3 py-1 rounded-full text-sm">
                                                <Coins className="w-3 h-3" />
                                                {art.sell?.toLocaleString()}
                                            </div>
                                            <span className="text-xs text-gray-400 mt-1">Buy: {art.buy?.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Palette className="w-4 h-4 text-purple-500" />
                                            <span>{art.author} ({art.year})</span>
                                        </div>

                                        {/* Expandable Details */}
                                        <AnimatePresence>
                                            {selectedArt?.name === art.name && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="pt-4 border-t border-gray-100 space-y-4 overflow-hidden"
                                                >
                                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                                        <div className="flex items-center gap-2 text-green-800 font-bold mb-2">
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            Real
                                                        </div>
                                                        <p className="text-sm text-green-900">{art.real_info?.description}</p>
                                                    </div>

                                                    {art.has_fake && (
                                                        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                                            <div className="flex items-center gap-2 text-red-800 font-bold mb-2">
                                                                <AlertTriangle className="w-4 h-4" />
                                                                Fake
                                                            </div>
                                                            <div className="flex gap-4">
                                                                <img
                                                                    src={art.fake_info?.image_url}
                                                                    alt="Fake version"
                                                                    className="w-16 h-16 object-contain bg-white rounded-lg border border-red-100"
                                                                />
                                                                <p className="text-sm text-red-900">{art.fake_info?.description}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {selectedArt?.name !== art.name && (
                                            <p className="text-xs text-center text-purple-600 font-medium pt-2">
                                                Tap to view authentication guide
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default Art;
