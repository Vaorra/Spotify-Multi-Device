export interface Lobby {
  id: string; //12-byte Id
  leaderSpotifyId: string;
  participantUsers: User[];
  currentSongIndex: number;
  queuedSongs: Song[];
  playerId: string;
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
  duration: number; //in ms
  imageUrl: string;
}
