import { useGetAllPlaylists } from "../../api/playlistApi";
import { useAtom, useAtomValue } from "jotai";
import { playlistAtom } from "../../atoms/PlaylistAtom";
import { NewPlaylistButton } from "./playlistComponents/newPlaylistButton";
import { NewSongButton } from "./songComponents/NewSongButton";
import { PlaylistCard } from "./playlistComponents/PlaylistCard";
import { SongCard } from "./songComponents/SongCard";
import { movingSongAtom } from "../../atoms/SongAtom";

export const MenuButton = () => {
  const { playlists } = useGetAllPlaylists();
  const [playlist, setPLaylist] = useAtom(playlistAtom);
  const isMovingSong = useAtomValue(movingSongAtom);

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer") as HTMLInputElement;
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn  btn-sm btn-square  drawer-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </label>
      </div>
      <div className="drawer-side z-50 h-screen">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="bg-gradient-to-r border-r border-base-300 from-base-100/50 to-base-200/90 backdrop-blur-lg text-base-content w-100  h-full flex flex-col">
          <div className="z-10 w-full flex items-center justify-between border-b-2 p-3 border-base-content/10 fixed top-0 left-0 bg-inherit backdrop-blur-lg">
            <div className="flex gap-5 items-center h-10">
              {playlist ? (
                <button onClick={() => setPLaylist(undefined)} className="btn btn-square btn-sm bg-transparent border-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                </button>
              ) : (
                <svg
                  onClick={() => closeDrawer()}
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
              )}
              <p className="text-lg font-bold text-base-content">
                {playlist?.name ? playlist.name : isMovingSong ? "Choose where to move " : "Your playlists"}
              </p>
            </div>
            {!playlist?.id && <NewPlaylistButton playlists={playlists} />}
            {playlist?.id && <NewSongButton id={playlist.id} />}
          </div>

          <div className="mt-18 overflow-y-auto  h-full">
            {playlists?.length === 0 ? (
              <div className="mt-5 mx-5">
                <p className="text-base-content/50 text-sm">You have no playlists. Press create playlist button to add one.</p>
              </div>
            ) : (
              <ul className="list bg-base-100 shadow-md">
                {playlist
                  ? playlist?.songs?.map((song, index) => <SongCard index={index} song={song} key={song.id} />)
                  : playlists?.map((playlist) => <PlaylistCard playlist={playlist} key={playlist.id} />)}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
