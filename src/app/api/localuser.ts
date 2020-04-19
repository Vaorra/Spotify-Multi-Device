import { User } from "./user";

// LocalUser Object storing data of a local user
export interface LocalUser extends User {
    footprint: string; // spotify login state
    isPremium: boolean;
}