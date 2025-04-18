import { Dispatch, SetStateAction } from "react";

export const RepeatButton = ({ setIsLooping, isLooping }: { isLooping: boolean; setIsLooping: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <button
      onClick={() => setIsLooping((prev) => !prev)}
      className={` text-base-content/50 hover:text-base-content hover:cursor-pointer p-1 " ${
        isLooping && "bg-gradient-to-r from-primary to-secondary rounded-full "
      }  `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="m17 2 4 4-4 4" />
        <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
        <path d="m7 22-4-4 4-4" />
        <path d="M21 13v1a4 4 0 0 1-4 4H3" />
      </svg>
    </button>
  );
};
