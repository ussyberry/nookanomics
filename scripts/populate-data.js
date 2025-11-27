import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get API key from command line argument or environment
const API_KEY = process.argv[2] || process.env.VITE_NOOKIPEDIA_API_KEY || '';

if (!API_KEY) {
    console.error('❌ API key not provided');
    console.error('Usage: node scripts/populate-data.js YOUR_API_KEY');
    console.error('Or set VITE_NOOKIPEDIA_API_KEY environment variable');
    process.exit(1);
}

const BASE_URL = 'https://api.nookipedia.com';

async function fetchFromAPI(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            url.searchParams.append(key, String(value));
        }
    });

    console.log(`📡 Fetching: ${endpoint}...`);

    const response = await fetch(url.toString(), {
        headers: {
            'X-API-KEY': API_KEY,
            'Accept-Version': '1.0.0'
        }
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}

function saveToFile(filename, data) {
    const filePath = path.join(__dirname, '..', 'src', 'data', filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    console.log(`✅ Saved ${data.length} items to ${filename}`);
}

async function populateClothing() {
    console.log('\n🎨 Fetching clothing data...');

    const clothing = await fetchFromAPI('nh/clothing', {});

    console.log(`   Found ${clothing.length} total clothing items`);

    // Filter to get a good variety (50 items)
    const themes = ['Formal', 'Party', 'Goth', 'Sporty', 'Comfy', 'Fairy tale', 'Everyday', 'Vacation', 'Work'];
    const selected = [];

    // Get items from each theme
    themes.forEach(theme => {
        const themeItems = clothing.filter(item =>
            item.label_themes?.includes(theme)
        ).slice(0, 6);
        selected.push(...themeItems);
    });

    // Remove duplicates and limit to 50
    const unique = Array.from(new Map(selected.map(item => [item.name, item])).values()).slice(0, 50);

    saveToFile('clothing.json', unique);
}

async function populateFurniture() {
    console.log('\n🪑 Fetching furniture data...');

    const furniture = await fetchFromAPI('nh/furniture', {});

    console.log(`   Found ${furniture.length} total furniture items`);

    // Get a variety of furniture (30 items)
    const selected = furniture
        .filter(item => item.buy !== null || item.sell > 1000)
        .slice(0, 30);

    saveToFile('furniture.json', selected);
}

async function populateRecipes() {
    console.log('\n🔨 Fetching recipe data...');

    const recipes = await fetchFromAPI('nh/recipes', {});

    console.log(`   Found ${recipes.length} total recipes`);

    // Get high-value recipes (30 items) - lowered threshold to 500
    const selected = recipes
        .filter(item => item.sell > 500)
        .sort((a, b) => (b.sell - (b.material_cost || 0)) - (a.sell - (a.material_cost || 0)))
        .slice(0, 30);

    saveToFile('recipes.json', selected);
}

async function populateArt() {
    console.log('\n🎭 Fetching art data...');

    const art = await fetchFromAPI('nh/art', {});

    console.log(`   Found ${art.length} total artworks`);

    saveToFile('art.json', art);
}

async function populateFish() {
    console.log('\n🐟 Fetching fish data...');

    const fish = await fetchFromAPI('nh/fish', {});

    console.log(`   Found ${fish.length} total fish`);

    // Get a variety of fish (30 items)
    const selected = fish
        .filter(item => item.sell_nook > 1000)
        .slice(0, 30);

    saveToFile('fish.json', selected);
}

async function populateBugs() {
    console.log('\n🦋 Fetching bug data...');

    const bugs = await fetchFromAPI('nh/bugs', {});

    console.log(`   Found ${bugs.length} total bugs`);

    // Get a variety of bugs (30 items)
    const selected = bugs
        .filter(item => item.sell_nook > 1000)
        .slice(0, 30);

    saveToFile('bugs.json', selected);
}

async function main() {
    console.log('🚀 Starting data population from Nookipedia API...\n');
    console.log('This will fetch comprehensive data and populate all JSON files.\n');

    try {
        await populateClothing();
        await populateFurniture();
        await populateRecipes();
        await populateArt();
        await populateFish();
        await populateBugs();

        console.log('\n✨ All data populated successfully!');
        console.log('📦 Your website now has rich, comprehensive data.');
        console.log('👥 Users can enjoy the full experience without needing API keys!');
    } catch (error) {
        console.error('\n❌ Error populating data:', error.message);
        process.exit(1);
    }
}

main();
