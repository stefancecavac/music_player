import { useGetAllSongs } from "./api/songsApi";
import { MenuButton } from "./components/MenuButton";
import { MusicPlayer } from "./components/musicPlayer";
import { ThemeChangerComponent } from "./components/ThemeChangerComponent";

function App() {
  const { songs, songsLoading } = useGetAllSongs();

  if (songsLoading) return null;
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-primary to-secondary  p-2">
      <div className="bg-base-100 rounded-lg p-1  border border-base-200 flex items-center gap-2 w-fit">
        <MenuButton songs={songs} />
        <ThemeChangerComponent />
      </div>
      <div className=" flex h-full items-center justify-center mt-50">
        <MusicPlayer songs={songs} />
      </div>
    </div>
  );
}

export default App;
