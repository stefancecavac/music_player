import { useEffect, useRef, useState } from "react";
import { useCreatePlaylist, useDeletePlaylist, useUpdatePlaylist } from "../../../api/playlistApi";
import { UseAuthContext } from "../../../context/AuthContext";
import { PlaylistData } from "../../../types";

export const NewPlaylistButton = ({ playlists }: { playlists?: PlaylistData[] }) => {
  const { createPlaylist } = useCreatePlaylist();
  const { deletePlaylist } = useDeletePlaylist();
  const { updatePlaylist } = useUpdatePlaylist();

  const editRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});

  const [playlistName, setPlaylistName] = useState("");
  const { user } = UseAuthContext();

  const [editableId, setEditableId] = useState("");

  const [creatingPlaylist, setCreatingPlaylist] = useState(false);

  useEffect(() => {
    if (editableId && editRefs.current[editableId]) {
      const el = editRefs.current[editableId];
      el.focus();
      document.execCommand("selectAll", false);
    }
  }, [editableId]);

  const handleEditTitle = (id: string) => {
    setEditableId(id);
  };

  const handleUpdatePlaylist = ({ playlistId, e }: { playlistId: string; e: React.FocusEvent<HTMLSpanElement, Element> }) => {
    updatePlaylist({ id: playlistId, name: e.target.textContent || "" });
    setEditableId("");
  };

  const handleCreatePlaylist = () => {
    createPlaylist({ name: playlistName, userId: user!.id });
  };
  if (!user) return null;

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-square border-0 hover:border-2  hover:border-secondary btn-sm bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full p-1 shadow-[_0px_1px_25px] shadow-base-300 hover:shadow-secondary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 text-base-content"
        >
          <path d="M21 15V6" />
          <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path d="M12 12H3" />
          <path d="M16 6H3" />
          <path d="M12 18H3" />
        </svg>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content w-70  bg-gradient-to-tl from-base-100/60 to-base-200 backdrop-blur-lg rounded-box z-1 p-2 shadow-lg flex  flex-col  "
      >
        <p className="text-base-content/50 text-xs  p-2">Your playlists</p>
        <div className="flex-col items-center gap-5 my-1">
          {playlists?.map((playlist) => (
            <div
              key={playlist.id}
              className="p-2 flex items-center gap-3 justify-between text-sm hover:cursor-pointer hover:bg-gradient-to-r from-primary/30 to-secondary/30 transition-all rounded"
            >
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-base-content"
                >
                  <path d="M21 15V6" />
                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path d="M12 12H3" />
                  <path d="M16 6H3" />
                  <path d="M12 18H3" />
                </svg>

                <span
                  onBlur={(e) => handleUpdatePlaylist({ playlistId: playlist.id, e })}
                  ref={(el) => {
                    editRefs.current[playlist.id] = el;
                  }}
                  contentEditable={editableId === playlist.id}
                  suppressContentEditableWarning
                  className={` ${editableId === playlist.id && "focus:bg-base-300 hover:cursor-text outline-primary "} text-sm w-35 truncate`}
                >
                  {playlist.name}
                </span>
              </div>

              <div className="flex items-center gap-3 ">
                <button onClick={() => handleEditTitle(playlist.id)} className="btn btn-xs btn-square hover:bg-secondary bg-transparent border-none ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => deletePlaylist({ id: playlist.id, userId: user?.id })}
                  className="btn btn-xs btn-square bg-transparent border-none  hover:bg-secondary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="divider m-0 my-1"></div>

        {creatingPlaylist ? (
          <div className="flex items-center gap-2 p-2">
            <input
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Enter playlist title "
              className="input focus-within:outline-none   input-sm "
            ></input>
            <button
              onClick={handleCreatePlaylist}
              className="btn bg-gradient-to-r  border-0 hover:border-2  hover:border-secondary from-primary to-secondary text-white btn-sm btn-square shadow-[_0px_1px_25px] shadow-base-300 hover:shadow-secondary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setCreatingPlaylist(true);
            }}
            className="text-base-content/50 btn btn-sm"
          >
            Create new playlist
          </button>
        )}
      </div>
    </div>
  );
};
