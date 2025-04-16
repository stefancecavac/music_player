import { useState } from "react";
import { useCreateSong, useGetSongInformation } from "../api/songsApi";

export const NewSongButton = ({ id }: { id: string }) => {
  const { getSongInformation } = useGetSongInformation();
  const { createSong } = useCreateSong();

  const [songUrl, setSongUrl] = useState("");

  const handleCreateSong = async () => {
    const songInfo = await getSongInformation(songUrl);
    createSong({ title: songInfo.title, songHref: songUrl, lenght: 1, playlistId: id, thumbnailUrl: songInfo.thumbnail_url });
  };

  return (
    <div className="dropdown dropdown-center">
      <div tabIndex={0} role="button" className="btn btn-square btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      <div tabIndex={0} className="dropdown-content  bg-base-300 rounded-box z-1 p-2 shadow-lg flex items-center gap-5">
        <input onChange={(e) => setSongUrl(e.target.value)} placeholder="Song url" className="input w-70  input-sm "></input>
        <button onClick={handleCreateSong} className="btn bg-gradient-to-r from-primary to-secondary text-white btn-sm ">
          Add
        </button>
      </div>
    </div>
  );
};
