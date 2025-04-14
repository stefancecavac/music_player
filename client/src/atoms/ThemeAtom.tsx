import { atom } from "jotai";

export const changeThemeAtom = atom(JSON.parse(localStorage.getItem("theme")!));
