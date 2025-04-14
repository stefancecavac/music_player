import { useAtom } from "jotai";
import { SongData } from "../types";
import { currentSongAtom, isPlayingAtom } from "../atoms/SongAtom";

export const SongCard = ({ song, index }: { song: SongData; index: number }) => {
  const [currentSong, setCurrentSong] = useAtom(currentSongAtom);
  const [audioPlaying, setAudioPlaying] = useAtom(isPlayingAtom);

  return (
    <div
      onClick={() => {
        setCurrentSong(index);
        setAudioPlaying(currentSong === index ? (prev) => !prev : true);
      }}
      className="hover:bg-base-300/50 hover:cursor-pointer group/items  flex items-center gap-5 relative"
    >
      <div className="rounded size-10 flex items-center justify-center bg-base-300">
        <p className="text-base-100 text-3xl font-semibold">{index + 1}</p>
      </div>
      <p className="text-base-content ">{song.title}</p>

      {audioPlaying && currentSong === index && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 text-base-content/50 absolute right-3 bg-base-200  group-hover/items:bg-base-300/50  rounded"
        >
          <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
      )}
    </div>
  );
};
