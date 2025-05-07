import {atom} from "recoil"

export type User = {
    name: string,
    email: string,
    photo: string,
    rooms: [],
    chats: []
}

export const userAtom = atom<User | null>({
    key: "userAtom",
    default: null,
  });