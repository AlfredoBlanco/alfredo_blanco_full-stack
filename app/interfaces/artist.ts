export interface Artist {
    external_urls: { spotify: string };
    followers: { href: null, total: number };
    genres: string[];
    href: string;
    id: string;
    images: { url: string, height: number, width: number }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface SearchArtistsResponse {
    artists: {
        href: string;
        items: Artist[];
        limit: number;
        next: string;
        offset: number;
        previus: number;
        total: number;
    }
}
