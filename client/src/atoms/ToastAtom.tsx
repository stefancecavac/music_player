import { atom } from "jotai";

type ToastState = {
  message: string;
  type?: "success" | "error" | "info";
  open: boolean;
};

export const ToastAtom = atom<ToastState>({
  message: "",
  type: "info",
  open: false,
});
