import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { formatTime } from "../util/FormatTime";
import { SongData } from "../types";
import { useAtomValue } from "jotai";
import { currentSongAtom } from "../atoms/SongAtom";

type PlayerAndProgressBarProps = {
  YT_URL: string[];
  songs: SongData[];
  isLooping: boolean;
  audioPlaying: boolean;
  volume: number;
};

export const PlayerAndProgressbar = ({ audioPlaying, isLooping, volume, songs, YT_URL }: PlayerAndProgressBarProps) => {
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const currentSong = useAtomValue(currentSongAtom);

  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    playerRef.current?.seekTo(parseFloat((e.target as HTMLInputElement).value));
  };

  return (
    <>
      <ReactPlayer
        loop={isLooping}
        ref={playerRef}
        url={YT_URL[currentSong]}
        playing={audioPlaying}
        volume={volume}
        onProgress={handleProgress}
        onDuration={(dur) => setDuration(dur)}
        width={0}
        height={0}
      />
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-xl font-medium text-base-content mx-auto mb-10 h-5">{songs[currentSong]?.title}</h2>
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
          className=" w-full  rounded-lg range range-neutral range-xs  "
        />
        <div className="flex items-center justify-between text-base-content/30 mx-2 font-medium text-sm">
          <p>{formatTime(played * duration)}</p>
          <p>{formatTime(duration)}</p>
        </div>
      </div>
    </>
  );
};
