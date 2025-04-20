import { useAtom, useSetAtom } from "jotai";
import { SongData } from "../../../types";
import { currentSongAtom, currentSongPlayingAtom, isPlayingAtom, movingSongAtom, songsAtom, songToBeMoved } from "../../../atoms/SongAtom";
import { playlistAtom } from "../../../atoms/PlaylistAtom";
import { useDeleteSong } from "../../../api/songsApi";

export const SongCard = ({ song, index }: { song: SongData; index: number }) => {
  const { deleteSong, deletingSong } = useDeleteSong();

  const [currentSong, setCurrentSong] = useAtom(currentSongAtom);
  const [audioPlaying, setAudioPlaying] = useAtom(isPlayingAtom);
  const [playlistData, setPlaylistData] = useAtom(playlistAtom);
  const setSongs = useSetAtom(songsAtom);
  const [currentSongPlaying, setCurrentSongPlaying] = useAtom(currentSongPlayingAtom);

  const setIsMovingSong = useSetAtom(movingSongAtom);
  const setSongToBeMoved = useSetAtom(songToBeMoved);

  const handleSelectSong = () => {
    setCurrentSongPlaying(song);
    setCurrentSong(index);
    setAudioPlaying(currentSong === index ? (prev) => !prev : true);
    setSongs(playlistData?.songs || []);
  };

  const handleMoveSong = () => {
    setPlaylistData(undefined);
    setIsMovingSong(true);
    setSongToBeMoved(song);
  };

  return (
    <div
      onClick={handleSelectSong}
      className=" hover:cursor-pointer   justify-between pr-5 slide-in-left group/items bg-primary/20 hover:bg-primary/50 transition-all  backdrop-blur-xl flex items-center gap-5 h-15 relative list-row rounded-none p-0"
    >
      <div className="flex items-center gap-3 h-full">
        {audioPlaying && currentSongPlaying?.id === song.id ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 text-secondary  w-12    "
          >
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        ) : (
          <div className=" h-full w-12 flex items-center justify-center bg-base-300">
            <img src={song.thumbnailUrl} className="w-full h-full"></img>
          </div>
        )}

        <p className="text-base-content truncate w-50 font-medium font-stretch-extra-expanded">{song.title}</p>
      </div>

      <div className="dropdown dropdown-end" onClick={(e) => e.stopPropagation()}>
        <div tabIndex={0} role="button" className="btn btn-square btn-sm bg-transparent border-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
        <div tabIndex={0} className="dropdown-content flex flex-col gap-1 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteSong({ id: song.id });
            }}
            className="btn btn-sm flex items-center bg-base-200 justify-start gap-3 font-medium text-base-content"
          >
            {deletingSong ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                <p>Delete song</p>
              </>
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMoveSong();
            }}
            className="btn btn-sm flex items-center bg-base-200 justify-start gap-3 font-medium text-base-content"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
            </svg>

            <p>Move song</p>
          </button>
        </div>
      </div>
    </div>
  );
};
