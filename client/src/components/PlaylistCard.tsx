import { PlaylistData } from "../types";
import { useSetAtom } from "jotai";
import { playlistAtom } from "../atoms/PlaylistAtom";
import { axiosInstance } from "../config/ApiClient";

export const PlaylistCard = ({ playlist }: { playlist: PlaylistData }) => {
  const setPLaylist = useSetAtom(playlistAtom);

  const hanldePlaylistClick = async (id: string) => {
    try {
      const response = await axiosInstance.get<PlaylistData>(`/playlists/${id}`);
      const data = response.data as PlaylistData;
      setPLaylist(data);
    } catch (err) {
      console.error("Error loading playlist", err);
    }
  };

  return (
    <div
      onClick={() => hanldePlaylistClick(playlist.id)}
      className=" hover:cursor-pointer group/items   bg-gradient-to-tl from-base-100/10 to-base-200/90  backdrop-blur-xl flex items-center gap-5 h-15 relative list-row rounded-none p-0"
    >
      <div className=" h-full w-12 flex items-center justify-center bg-gradient-to-r from-primary to-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6 text-base-content"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
          />
        </svg>
      </div>
      <p className="text-base-content truncate w-50 ">{playlist.name}</p>
    </div>
  );
};
