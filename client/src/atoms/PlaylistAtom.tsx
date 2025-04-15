import { atom } from "jotai";
import { PlaylistData } from "../types";

export const playlistAtom = atom<PlaylistData | undefined>();
