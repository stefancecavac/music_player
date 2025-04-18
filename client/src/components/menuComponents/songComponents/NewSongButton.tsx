import { useState } from "react";
import { useCreateSong, useGetSongInformation } from "../../../api/songsApi";

export const NewSongButton = ({ id }: { id: string }) => {
  const { getSongInformation } = useGetSongInformation();
  const { createSong, creatingSong } = useCreateSong(id);

  const [songUrl, setSongUrl] = useState("");

  const handleCreateSong = async () => {
    const songInfo = await getSongInformation(songUrl);
    createSong({ title: songInfo.title, songHref: songUrl, lenght: 1, playlistId: id, thumbnailUrl: songInfo.thumbnail_url });
  };

  return (
    <div className="dropdown dropdown-center">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle   border-0 hover:border-2  hover:border-secondary btn-sm shadow-[_0px_1px_25px] shadow-base-300 hover:shadow-secondary"
      >
        <div className="rounded-full p-1 bg-gradient-to-r from-primary/50 to-secondary/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-base-content"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
            />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 rounded-full bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 text-primary"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content  bg-gradient-to-tl from-base-100/60 to-base-200 backdrop-blur-lg rounded-box z-1 p-2 shadow-lg flex  flex-col  "
      >
        <p className="text-base-content/50 text-sm  p-2">Add a Song to playlist</p>
        <div className="flex items-center gap-5 p-2">
          <input onChange={(e) => setSongUrl(e.target.value)} placeholder="Song url" className="input w-70  input-sm "></input>
          <button
            onClick={handleCreateSong}
            className="btn bg-gradient-to-r from-primary to-secondary text-white btn-sm border-2 hover:border-2  hover:border-secondary shadow-[_0px_1px_25px] shadow-base-300 hover:shadow-secondary "
          >
            {creatingSong ? <span className="loading loading-spinner size-3 " /> : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};
