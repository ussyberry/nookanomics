const API_KEY = import.meta.env.VITE_NOOKIPEDIA_API_KEY;
const BASE_URL = 'https://api.nookipedia.com';

export interface Villager {
    id: string;
    name: string;
    url: string;
    species: string;
    personality: string;
    gender: string;
    birthday_month: string;
    birthday_day: string;
    sign: string;
    quote: string;
    phrase: string;
    clothing: string;
    islander: boolean;
    debut: string;
    image_url: string;
    nh_details?: {
        image_url: string;
        photo_url: string;
        icon_url: string;
        quote: string;
        "sub-personality": string;
        catchphrase: string;
        clothing: string;
        clothing_variation: string;
        fav_styles: string[];
        fav_colors: string[];
        hobby: string;
        house_interior_url: string;
        house_exterior_url: string;
        house_wallpaper: string;
        house_flooring: string;
        house_music: string;
        house_music_note: string;
    };
}

export const fetchVillagers = async (params: {
    name?: string;
    species?: string;
    personality?: string;
    game?: string[];
    birthmonth?: string;
    birthday?: string;
    nhdetails?: boolean;
    excludedetails?: boolean;
    thumbsize?: number;
} = {}): Promise<Villager[]> => {
    if (!API_KEY) {
        console.warn('Nookipedia API Key is missing. Please add VITE_NOOKIPEDIA_API_KEY to your .env file.');
        throw new Error('API Key missing');
    }

    const url = new URL(`${BASE_URL}/villagers`);

    // Add default params
    url.searchParams.append('game', 'NH');
    url.searchParams.append('nhdetails', 'true');

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            if (Array.isArray(value)) {
                value.forEach(v => url.searchParams.append(key, v));
            } else {
                url.searchParams.append(key, String(value));
            }
        }
    });

    const response = await fetch(url.toString(), {
        headers: {
            'X-API-KEY': API_KEY,
            'Accept-Version': '1.0.0'
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Invalid API Key');
        }
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
};

export interface NHFish {
    name: string;
    url: string;
    image_url: string;
    render_url: string;
    location: string;
    shadow_size: string;
    rarity: string;
    sell_nook: number;
    sell_cj: number;
    north: { months: string };
    south: { months: string };
}

export interface NHBug {
    name: string;
    url: string;
    image_url: string;
    render_url: string;
    location: string;
    weather: string;
    rarity: string;
    sell_nook: number;
    sell_flick: number;
    north: { months: string };
    south: { months: string };
}

export interface NHSeaCreature {
    name: string;
    url: string;
    image_url: string;
    render_url: string;
    shadow_size: string;
    shadow_movement: string;
    rarity: string;
    sell_nook: number;
    north: { months: string };
    south: { months: string };
}

export const fetchFish = async (params: { month?: string; excludedetails?: string; thumbsize?: number } = {}): Promise<NHFish[]> => {
    return fetchEndpoint<NHFish[]>('nh/fish', params);
};

export const fetchBugs = async (params: { month?: string; excludedetails?: string; thumbsize?: number } = {}): Promise<NHBug[]> => {
    return fetchEndpoint<NHBug[]>('nh/bugs', params);
};

export const fetchSeaCreatures = async (params: { month?: string; excludedetails?: string; thumbsize?: number } = {}): Promise<NHSeaCreature[]> => {
    return fetchEndpoint<NHSeaCreature[]>('nh/sea', params);
};

export interface NHArtwork {
    name: string;
    url: string;
    image_url: string;
    has_fake: boolean;
    art_name: string;
    art_type: string;
    author: string;
    year: string;
    art_style: string;
    buy: number;
    sell: number;
    availability: string;
    real_info: {
        image_url: string;
        description: string;
    };
    fake_info: {
        image_url: string;
        description: string;
    };
}

export const fetchArt = async (params: { thumbsize?: number } = {}): Promise<NHArtwork[]> => {
    // Add default thumbsize if not provided
    const defaultParams = { thumbsize: 128, ...params };
    return fetchEndpoint<NHArtwork[]>('nh/art', defaultParams);
};

export interface NHClothing {
    name: string;
    url: string;
    image_url: string;
    buy: number;
    sell: number;
    label_themes: string[];
    styles: string[];
    seasonality: string;
    variations: {
        variation: string;
        image_url: string;
    }[];
}

export const fetchClothing = async (params: {
    category?: string;
    color?: string[];
    style?: string[];
    labeltheme?: string;
    excludedetails?: string;
    thumbsize?: number
} = {}): Promise<NHClothing[]> => {
    // Add default thumbsize if not provided
    const defaultParams = { thumbsize: 128, ...params };
    return fetchEndpoint<NHClothing[]>('nh/clothing', defaultParams);
};

export interface NHFurniture {
    name: string;
    url: string;
    image_url: string;
    category: string;
    hha_base: number;
    buy: number | null;
    sell: number;
    themes: string[];
    tag: string;
    lucky: boolean;
}

export const fetchFurniture = async (params: {
    category?: string;
    color?: string[];
    thumbsize?: number
} = {}): Promise<NHFurniture[]> => {
    // Add default thumbsize if not provided
    const defaultParams = { thumbsize: 128, ...params };
    return fetchEndpoint<NHFurniture[]>('nh/furniture', defaultParams);
};

export interface NHRecipe {
    name: string;
    url: string;
    image_url: string;
    sell: number;
    materials: {
        name: string;
        count: number;
    }[];
    material_cost: number;
}

export const fetchRecipes = async (params: {
    material?: string;
    thumbsize?: number
} = {}): Promise<NHRecipe[]> => {
    // Add default thumbsize if not provided
    const defaultParams = { thumbsize: 128, ...params };
    return fetchEndpoint<NHRecipe[]>('nh/recipes', defaultParams);
};

// Generic fetch helper to avoid code duplication
const fetchEndpoint = async <T>(endpoint: string, params: Record<string, any>): Promise<T> => {
    if (!API_KEY) {
        console.warn('Nookipedia API Key is missing.');
        throw new Error('API Key missing');
    }

    const url = new URL(`${BASE_URL}/${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            url.searchParams.append(key, String(value));
        }
    });

    const response = await fetch(url.toString(), {
        headers: {
            'X-API-KEY': API_KEY,
            'Accept-Version': '1.0.0'
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Invalid API Key');
        }
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
};
