import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { formatTime } from "../util/FormatTime";
import { SongData } from "../types";
import { useAtomValue } from "jotai";
import { currentSongAtom, currentSongPlayingAtom } from "../atoms/SongAtom";

type PlayerAndProgressBarProps = {
  songs: SongData[];
  isLooping: boolean;
  audioPlaying: boolean;
  volume: number;
};

export const PlayerAndProgressbar = ({ audioPlaying, isLooping, volume, songs }: PlayerAndProgressBarProps) => {
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const currentSong = useAtomValue(currentSongAtom);
  const currentSongPlaying = useAtomValue(currentSongPlayingAtom);

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

  const calculateBackground = () => {
    const percentage = played * 100;
    return `linear-gradient(to right, var(--color-primary) 0%, var(--color-secondary, #662d91) ${percentage}%, var(--color-base-300, #662d91) ${percentage}%, var(--color-base-300, #662d91) 100%)`;
  };

  return (
    <>
      <ReactPlayer
        loop={isLooping}
        ref={playerRef}
        url={songs[currentSong]?.songHref}
        playing={audioPlaying}
        volume={volume}
        onProgress={handleProgress}
        onDuration={(dur) => setDuration(dur)}
        width={0}
        height={0}
      />
      <div className="flex flex-col gap-2 w-full items-center">
        {currentSongPlaying ? (
          <div className="flex items-center gap-5 mb-5">
            <img src={currentSongPlaying?.thumbnailUrl} className="size-20 rounded-lg shadow-lg "></img>
            <h2 className="text-xl font-medium text-base-content mx-auto ">{songs[currentSong]?.title}</h2>
          </div>
        ) : (
          <p className="text-base-content mb-2">Select a song to start playing</p>
        )}

        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer "
          style={{
            background: calculateBackground(),
            WebkitAppearance: "none",
            appearance: "none",
            outline: "none",
          }}
        />
        <div className="flex items-center justify-between text-base-content/30 mx-2 font-medium text-sm w-full">
          <p>{formatTime(played * duration)}</p>
          <p>{formatTime(duration)}</p>
        </div>
      </div>
    </>
  );
};
