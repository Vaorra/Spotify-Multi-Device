export interface Song {
    spotifyId: string;
    spotifyUri: string;
    name: string;
    artistNames: string[];
    duration: number; //in ms
    imageUrl: string;
}