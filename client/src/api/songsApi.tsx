import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateSongData, SongData } from "../types";
import { axiosInstance } from "../config/ApiClient";
import axios from "axios";
import { useSetAtom } from "jotai";
import { playlistAtom } from "../atoms/PlaylistAtom";

export const useGetAllSongs = () => {
  const getAllSongsApi = async () => {
    const response = await axiosInstance.get(`/songs/`);

    return response.data as SongData[];
  };

  const { data: songs, isPending: songsLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: getAllSongsApi,
  });

  return { songs, songsLoading };
};

export const useGetSongInformation = () => {
  const getSongInformationApi = async (url: string) => {
    const response = await axios.get(`https://noembed.com/embed?url=${url}`);
    console.log(response.data);

    return response.data as { title: string; thumbnail_url: string };
  };

  const { mutateAsync: getSongInformation } = useMutation({
    mutationKey: ["songInformation"],
    mutationFn: getSongInformationApi,
  });

  return { getSongInformation };
};

export const useCreateSong = (id: string) => {
  const setPlaylist = useSetAtom(playlistAtom);
  console.log("id", id);
  const postSongApi = async ({ lenght, songHref, title, playlistId, thumbnailUrl }: CreateSongData) => {
    const response = await axiosInstance.post(`/songs/`, { lenght, songHref, title, playlistId, thumbnailUrl });

    return response.data as SongData;
  };

  const { mutateAsync: createSong, isPending: creatingSong } = useMutation({
    mutationKey: ["songs"],
    mutationFn: postSongApi,
    onSuccess: (data) => {
      setPlaylist((prev) => {
        if (!prev) return prev;

        return {
          id: prev.id,
          name: prev.name,
          songs: [...prev.songs, data],
        };
      });
    },
  });

  return { createSong, creatingSong };
};
