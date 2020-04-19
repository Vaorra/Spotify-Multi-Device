import { User } from './user';
import { QueuedSong } from './queuedsong';

// Lobby Object storing data of lobbies
export interface Lobby {
    id: string; //12-byte Id
    leaderSpotifyId: string;
    participantUsers: User[];
    currentSongIndex: number;
    queuedSongs: QueuedSong[];
    playerId: string;
    version: number;
}
