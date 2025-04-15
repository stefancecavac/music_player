import { atom } from "jotai";
import { SongData } from "../types";

export const currentSongAtom = atom(0);

export const songsAtom = atom<SongData[]>([]);

export const isPlayingAtom = atom(false);
