import { Artist } from "./artist";

export interface Album {
    album_group: string;
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: { url: string, height: number, width: number }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}   

export interface AlbumsResponse {
    href: string;
    items: Album[];
    limit: number;
    next: string | null;
    offset: number;
    previus: number | null;
    total: number;
}

export interface SavedAlbumsResponse extends Omit<AlbumsResponse, 'items'> {
    items: {
        added_at: string;
        album: Album
    }[];
}