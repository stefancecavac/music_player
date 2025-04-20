import { atom } from "jotai";
import { SongData } from "../types";

export const currentSongAtom = atom(0);
export const currentSongPlayingAtom = atom<SongData>();

export const songsAtom = atom<SongData[]>([]);
export const movingSongAtom = atom<boolean>(false);
export const songToBeMoved = atom<SongData>();

export const isPlayingAtom = atom(false);
