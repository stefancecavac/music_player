import { useAtom } from "jotai";
import { ToastAtom } from "../atoms/ToastAtom";
import { useEffect } from "react";

export const ToastComponent = () => {
  const [toastState, setToastState] = useAtom(ToastAtom);

  useEffect(() => {
    if (!toastState) return;

    const timeout = setTimeout(() => {
      setToastState({ ...toastState, open: false });
    }, 4000);

    return () => clearTimeout(timeout);
  }, [toastState, setToastState]);

  return (
    toastState.open && (
      <div className="bg-secondary z-200 slide-in-bottom border border-base-200  font-medium text-white px-4 py-2 rounded-md absolute bottom-5 left-1/2 transform -translate-x-1/2">
        <p>{toastState.message}</p>
      </div>
    )
  );
};
