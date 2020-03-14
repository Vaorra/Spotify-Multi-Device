export interface Lobby {
  id: string; //12-byte Id
  leaderSpotifyId: string;
  participantUsers: User[];
  currentSongIndex: number;
  queuedSongs: Song[];
  playerId: string;
  version: number;
}

export interface LocalUser extends User {
  isPremium: boolean;
}

export interface User {
  spotifyId: string;
  displayName: string | undefined;
  profilePictureUrl: string | undefined;
}

export interface Song {
  spotifyId: string;
  spotifyUri: string;
  queuer: User;
  name: string;
  artistNames: string[];
  duration: number; //in ms
  imageUrl: string;
}
