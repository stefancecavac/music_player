import { useState } from "react";
import { AudioSlider } from "./AudioSlider";
import { MainControllButtons } from "./MainControllButtons";
import { RepeatButton } from "./RepeatButton";
import { ShuffleButton } from "./ShuffleButton";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentSongAtom, isPlayingAtom, songsAtom } from "../atoms/SongAtom";
import { PlayerAndProgressbar } from "./PlayerAndProgressBar";

export const MusicPlayer = () => {
  const songs = useAtomValue(songsAtom);

  console.log("songs", songs);

  const [volume, setVolume] = useState(1);

  const [isLooping, setIsLooping] = useState(false);

  const setCurrentSong = useSetAtom(currentSongAtom);
  const [audioPlaying, setAudioPlaying] = useAtom(isPlayingAtom);

  return (
    <div className="rounded-lg w-full max-w-md p-6 bg-base-100 shadow-2xl flex flex-col items-center gap-5 ">
      <PlayerAndProgressbar audioPlaying={audioPlaying} isLooping={isLooping} volume={volume} songs={songs} />
      <div className="flex items-center justify-center w-full my-5">
        <MainControllButtons songs={songs} audioPlaying={audioPlaying} setAudioPlaying={setAudioPlaying} setCurrentSong={setCurrentSong} />
      </div>
      <div className="flex items-center justify-between w-full">
        <RepeatButton isLooping={isLooping} setIsLooping={setIsLooping} />
        <AudioSlider volume={volume} setVolume={setVolume} />
        <ShuffleButton songCount={songs?.length} />
      </div>
    </div>
  );
};
