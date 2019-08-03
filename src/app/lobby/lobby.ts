export interface Lobby {
    id: string, //12-byte Id
    leaderSpotifyId: string,
    participantUsers: User[],
    currentSongId: string, //spotify Id
    currentPlayerPosition: number, //in seconds
    queuedSongs: Song[]
}

export interface User {
    spotifyId: string,
    spotifyDisplayName: string,
    spotifyProfilePictureUrl: string
}

export interface Song {
    spotifyId: string,
    queuerId: string,
    name: string,
    artistNames: string[],
    duration: number //in seconds,
    imageUrl: string
}
