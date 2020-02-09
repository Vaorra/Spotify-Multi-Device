export interface Lobby {
  id: string; // 12-byte Id
  leaderSpotifyId: string;
  participantUsers: User[];
  currentSongId: string; // spotify Id
  currentPlayerPosition: number; // in seconds
  queuedSongs: Song[];
  version: number;
}

export interface User {
  spotifyId: string;
  spotifyDisplayName: string | undefined;
  spotifyProfilePictureUrl: string | undefined;
}

export interface Song {
  spotifyId: string;
  queuer: User;
  name: string;
  artistNames: string[];
  duration: number; // in seconds,
  imageUrl: string;
}
