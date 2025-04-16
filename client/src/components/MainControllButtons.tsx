import { SongData } from "../types";

type MainControllButtonsProps = {
  setCurrentSong: (value: (prev: number) => number) => void;
  setAudioPlaying: (value: boolean | ((prev: boolean) => boolean)) => void;
  audioPlaying: boolean;
  songs: SongData[];
};

export const MainControllButtons = ({ setCurrentSong, setAudioPlaying, audioPlaying, songs }: MainControllButtonsProps) => {
  return (
    <div className="flex items-center gap-5">
      <button
        className="text-base-content/50 hover:text-base-content hover:cursor-pointer"
        onClick={() => setCurrentSong((prev) => (prev === 0 ? prev : prev - 1))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className=""
        >
          <polygon points="19 20 9 12 19 4 19 20" />
          <line x1="5" x2="5" y1="19" y2="5" />
        </svg>
      </button>

      <button
        className="btn btn-circle btn-xl bg-gradient-to-r from-primary to-secondary  text-white"
        onClick={() => setAudioPlaying((prev) => !prev)}
      >
        {audioPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-8"
          >
            <rect x="14" y="4" width="4" height="16" rx="1" />
            <rect x="6" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-8"
          >
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        )}
      </button>

      <button
        className="text-base-content/50 hover:text-base-content hover:cursor-pointer"
        onClick={() => setCurrentSong((prev) => (prev === songs.length - 1 ? prev : prev + 1))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-skip-forward-icon lucide-skip-forward"
        >
          <polygon points="5 4 15 12 5 20 5 4" />
          <line x1="19" x2="19" y1="5" y2="19" />
        </svg>
      </button>
    </div>
  );
};
