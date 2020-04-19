import { Song } from "./song";
import { User } from "./user";

export interface QueuedSong extends Song {
    queuer: User;
}