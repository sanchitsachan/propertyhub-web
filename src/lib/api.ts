const API_BASE =  process.env.NEXT_PUBLIC_API_URL;

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...options?.headers,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export interface Property {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    purpose: 'sale' | 'rent';
    bedrooms: number;
    bathrooms: number;
    size_sqft: number;
    status: string;
    featured: boolean;
    address: string;
    latitude: number;
    longitude: number;
    meta_title: string;
    meta_description: string;
    created_at: string;
    city_id: number;
    area_id: number | null;
    type_id: number;
    agent_id: number;
    type: PropertyType;
    city: City;
    area: Area | null;
    agent: Agent;
    images: PropertyImage[];
    amenities: Amenity[];
}

export interface PropertyType {
    id: number;
    name: string;
    slug: string;
    properties_count?: number;
}

export interface City {
    id: number;
    name: string;
    slug: string;
    properties_count?: number;
}

export interface Area {
    id: number;
    city_id: number;
    name: string;
    slug: string;
}

export interface Amenity {
    id: number;
    name: string;
    slug: string;
}

export interface Agent {
    id: number;
    name: string;
    email: string;
    phone: string;
    profile_photo: string | null;
    properties_count?: number;
    properties?: Property[];
}

export interface PropertyImage {
    id: number;
    image_url: string;
    sort_order: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export interface PropertyFilters {
    [key: string]: string | undefined;
    purpose?: string;
    city_id?: string;
    area_id?: string;
    type_id?: string;
    min_price?: string;
    max_price?: string;
    bedrooms?: string;
    bathrooms?: string;
    featured?: string;
    keyword?: string;
    sort?: string;
    page?: string;
}

export async function getProperties(filters: PropertyFilters = {}): Promise<PaginatedResponse<Property>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
    });
    return fetchApi(`/properties?${params.toString()}`);
}

export async function getProperty(slug: string): Promise<Property> {
    return fetchApi(`/properties/${slug}`);
}

export async function getPropertyTypes(): Promise<PropertyType[]> {
    return fetchApi('/property-types');
}

export async function getCities(): Promise<City[]> {
    return fetchApi('/cities');
}

export async function getAreas(cityId?: string): Promise<Area[]> {
    const params = cityId ? `?city_id=${cityId}` : '';
    return fetchApi(`/areas${params}`);
}

export async function getAmenities(): Promise<Amenity[]> {
    return fetchApi('/amenities');
}

export async function getAgents(): Promise<Agent[]> {
    return fetchApi('/agents');
}

export async function getAgent(id: number): Promise<Agent> {
    return fetchApi(`/agents/${id}`);
}

export async function submitInquiry(data: {
    property_id: number;
    name: string;
    email: string;
    phone?: string;
    message?: string;
}): Promise<{ message: string }> {
    return fetchApi('/inquiries', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getSettings(): Promise<Record<string, string>> {
    return fetchApi('/settings');
}

export async function submitContact(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}): Promise<{ message: string }> {
    return fetchApi('/contact', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// Dummy property images — real Unsplash photos of Indian apartments/villas/offices
const dummyImages: string[] = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', // modern villa
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', // luxury house
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', // villa exterior
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', // modern home
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', // luxury pool villa
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', // house front
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', // apartment interior
    'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80', // living room
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', // apartment room
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80', // villa pool
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', // house garden
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', // luxury interior
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', // modern house
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80', // house exterior
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', // kitchen
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80', // bedroom
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80', // bathroom
    'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80', // balcony view
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', // commercial building
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', // office space
];

export interface BlogPost {
    id: number; title: string; slug: string; excerpt: string | null; content: string;
    featured_image: string | null; category: string; meta_title: string | null;
    meta_description: string | null; is_published: boolean; created_at: string;
    author?: { id: number; name: string };
}

export async function getBlogPosts(params?: { category?: string; limit?: string }): Promise<BlogPost[] | PaginatedResponse<BlogPost>> {
    const p = new URLSearchParams();
    if (params?.category) p.set('category', params.category);
    if (params?.limit) p.set('limit', params.limit);
    return fetchApi(`/blog?${p.toString()}`);
}

export async function getBlogPost(slug: string): Promise<BlogPost> { return fetchApi(`/blog/${slug}`); }

export async function trackPropertyView(propertyId: number): Promise<void> {
    try { await fetchApi('/property-views', { method: 'POST', body: JSON.stringify({ property_id: propertyId }) }); } catch {}
}

export async function saveSearch(data: { name: string; email: string; filters: Record<string, string>; email_alerts?: boolean }): Promise<{ message: string }> {
    return fetchApi('/saved-searches', { method: 'POST', body: JSON.stringify(data) });
}

export async function compareProperties(ids: number[]): Promise<Property[]> {
    return fetchApi(`/compare?ids=${ids.join(',')}`);
}

export interface SeoPage {
    id: number; title: string; slug: string; meta_title: string; meta_description: string;
    meta_keywords: string | null; h1_heading: string; content: string | null;
    city_id: number | null; area_id: number | null; type_id: number | null;
    purpose: string | null; target_keywords: string | null; canonical_url: string | null;
    og_image: string | null; is_published: boolean;
    city?: City; area?: Area; type?: PropertyType;
}

export async function getSeoPages(): Promise<SeoPage[]> { return fetchApi('/seo-pages'); }
export async function getSeoPage(slug: string): Promise<SeoPage> { return fetchApi(`/seo-pages/${slug}`); }

export function getImageUrl(path: string): string {
    // If the path is a placeholder, return a dummy property image
    if (path.includes('placeholder') || path.includes('properties/')) {
        // Extract a number from the path to get a consistent image per property
        const nums = path.match(/\d+/g);
        if (nums && nums.length >= 1) {
            const propertyId = parseInt(nums[0]);
            const imageIdx = nums.length >= 2 ? parseInt(nums[1]) - 1 : 0;
            // Each property gets 3 different images based on id + image index
            const idx = ((propertyId - 1) * 3 + imageIdx) % dummyImages.length;
            return dummyImages[idx];
        }
        return dummyImages[0];
    }
    const storageBase = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage';
    return `${storageBase}/${path}`;
}

export function formatPrice(price: number, purpose: string, currency = '₹'): string {
    if (price >= 10000000) {
        return purpose === 'rent' ? `${currency}${(price / 100000).toFixed(0)}L/mo` : `${currency}${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
        return purpose === 'rent' ? `${currency}${(price / 1000).toFixed(0)}K/mo` : `${currency}${(price / 100000).toFixed(2)} Lac`;
    }
    const formatted = new Intl.NumberFormat('en-IN').format(price);
    return purpose === 'rent' ? `${currency}${formatted}/mo` : `${currency}${formatted}`;
}
