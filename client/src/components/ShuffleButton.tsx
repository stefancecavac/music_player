import { useAtomValue, useSetAtom } from "jotai";
import { currentSongAtom } from "../atoms/SongAtom";

export const ShuffleButton = ({ songCount }: { songCount: number }) => {
  const setCurrentSong = useSetAtom(currentSongAtom);
  const currentSong = useAtomValue(currentSongAtom);

  console.log(currentSong);

  const handleShuffle = () => {
    const randomNumber = Math.floor(Math.random() * songCount);
    setCurrentSong(randomNumber);
  };

  return (
    <button onClick={handleShuffle} className="btn btn-sm btn-circle text-base-content/50">
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
        <path d="m18 14 4 4-4 4" />
        <path d="m18 2 4 4-4 4" />
        <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
        <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
        <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
      </svg>
    </button>
  );
};
