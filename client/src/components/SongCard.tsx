import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { SongData } from "../types";
import { currentSongAtom, currentSongPlayingAtom, isPlayingAtom, songsAtom } from "../atoms/SongAtom";
import { playlistAtom } from "../atoms/PlaylistAtom";

export const SongCard = ({ song, index }: { song: SongData; index: number }) => {
  const [currentSong, setCurrentSong] = useAtom(currentSongAtom);
  const [audioPlaying, setAudioPlaying] = useAtom(isPlayingAtom);
  const playlistData = useAtomValue(playlistAtom);
  const setSongs = useSetAtom(songsAtom);
  const [currentSongPlaying, setCurrentSongPlaying] = useAtom(currentSongPlayingAtom);

  return (
    <div
      onClick={() => {
        setCurrentSongPlaying(song);
        setCurrentSong(index);
        setAudioPlaying(currentSong === index ? (prev) => !prev : true);
        setSongs(playlistData?.songs || []);
      }}
      className=" hover:cursor-pointer group/items bg-gradient-to-tl from-base-100/10 to-base-200/90  backdrop-blur-xl flex items-center gap-5 h-15 relative list-row rounded-none p-0"
    >
      <div className=" h-full w-10 flex items-center justify-center bg-base-300">
        <img src={song.thumbnailUrl} className="w-full h-full"></img>
      </div>
      <p className="text-base-content truncate w-50 ">{song.title}</p>

      {audioPlaying && currentSongPlaying?.id === song.id && (
        <div className="p-1 rounded-lg bg-gradient-to-r from-primary to-secondary  group-hover/items:bg-base-300/50 absolute right-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 text-white"
          >
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </div>
      )}
    </div>
  );
};
