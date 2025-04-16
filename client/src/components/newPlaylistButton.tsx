import { useState } from "react";
import { useCreatePlaylist } from "../api/playlistApi";
import { UseAuthContext } from "../context/AuthContext";

export const NewPlaylistButton = () => {
  const { createPlaylist } = useCreatePlaylist();
  const [playlistName, setPlaylistName] = useState("");
  const { user } = UseAuthContext();

  const handleCreatePlaylist = () => {
    createPlaylist({ name: playlistName, userId: user!.id });
  };

  return (
    <div className="dropdown dropdown-center">
      <div tabIndex={0} role="button" className="btn btn-square btn-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
        >
          <path d="M10.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v8.4" />
          <path d="M8 18v-7.7L16 9v7" />
          <circle cx="14" cy="16" r="2" />
          <circle cx="6" cy="18" r="2" />
        </svg>
      </div>
      <div tabIndex={0} className="dropdown-content  bg-base-300 rounded-box z-1 p-2 shadow-lg flex items-center gap-5">
        <input onChange={(e) => setPlaylistName(e.target.value)} placeholder="Song url" className="input w-70  input-sm "></input>
        <button onClick={handleCreatePlaylist} className="btn bg-gradient-to-r from-primary to-secondary text-white btn-sm ">
          Add
        </button>
      </div>
    </div>
  );
};
