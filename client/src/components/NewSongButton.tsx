import { useState } from "react";
import { useCreateSong, useGetSongTitle } from "../api/songsApi";

export const NewSongButton = () => {
  const { getTitle } = useGetSongTitle();
  const { createSong } = useCreateSong();

  const [songUrl, setSongUrl] = useState("");

  const handleCreateSong = async () => {
    const title = await getTitle(songUrl);
    createSong({ title: title.title, songHref: songUrl, lenght: 1 });
  };

  return (
    <div className="dropdown dropdown-center">
      <div tabIndex={0} role="button" className="btn btn-square btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      <div tabIndex={0} className="dropdown-content  bg-base-100 rounded-box z-1 p-2 shadow-sm flex items-center gap-5">
        <input onChange={(e) => setSongUrl(e.target.value)} placeholder="Song url" className="input w-70  input-sm "></input>
        <button onClick={handleCreateSong} className="btn btn-primary btn-sm ">
          Add
        </button>
      </div>
    </div>
  );
};
