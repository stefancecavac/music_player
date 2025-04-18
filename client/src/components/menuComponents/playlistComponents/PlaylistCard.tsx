import { useSetAtom } from "jotai";
import { playlistAtom } from "../../../atoms/PlaylistAtom";
import { PlaylistData } from "../../../types";
import { useGetSinglePlaylist } from "../../../api/playlistApi";

export const PlaylistCard = ({ playlist }: { playlist: PlaylistData }) => {
  const setPLaylist = useSetAtom(playlistAtom);

  const { refetch, isFetching: loading } = useGetSinglePlaylist(playlist.id, false);

  const hanldePlaylistClick = async () => {
    const result = await refetch();
    if (result.data) {
      setPLaylist(result.data);
    } else {
      console.error("Playlist not found");
    }
  };

  return (
    <div
      onClick={hanldePlaylistClick}
      className={`${
        loading && "animate-pulse"
      } hover:cursor-pointer group/items slide-in-left  bg-primary/20 transition-all hover:bg-primary/50  backdrop-blur-xl flex items-center gap-5 h-15 relative list-row rounded-none p-0`}
    >
      <div className=" h-full w-12 flex items-center justify-center bg-gradient-to-r from-primary to-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-base-content"
        >
          <path d="M21 15V6" />
          <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path d="M12 12H3" />
          <path d="M16 6H3" />
          <path d="M12 18H3" />
        </svg>
      </div>
      <p className="text-base-content truncate w-50 font-medium font-stretch-extra-expanded ">{playlist.name}</p>
    </div>
  );
};
