import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateSongData, SongData } from "../types";
import { axiosInstance } from "../config/ApiClient";
import axios from "axios";

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

export const useCreateSong = () => {
  const postSongApi = async ({ lenght, songHref, title, playlistId, thumbnailUrl }: CreateSongData) => {
    const response = await axiosInstance.post(`/songs/`, { lenght, songHref, title, playlistId, thumbnailUrl });

    return response.data as SongData[];
  };

  const { mutateAsync: createSong } = useMutation({
    mutationKey: ["songs"],
    mutationFn: postSongApi,
  });

  return { createSong };
};
