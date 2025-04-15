import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateSongData, SongData } from "../types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useGetAllSongs = () => {
  const getAllSongsApi = async () => {
    const response = await axios.get(`${BASE_URL}/songs/`);

    return response.data as SongData[];
  };

  const { data: songs, isPending: songsLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: getAllSongsApi,
  });

  return { songs, songsLoading };
};

export const useGetSongTitle = () => {
  const getSongTitleApi = async (url: string) => {
    const response = await axios.get(`https://noembed.com/embed?url=${url}`);
    console.log(response.data);

    return response.data as { title: string };
  };

  const { mutateAsync: getTitle } = useMutation({
    mutationKey: ["title"],
    mutationFn: getSongTitleApi,
  });

  return { getTitle };
};

export const useCreateSong = () => {
  const postSongApi = async ({ lenght, songHref, title }: CreateSongData) => {
    const response = await axios.post(`${BASE_URL}/songs/`, { lenght, songHref, title });

    return response.data as SongData[];
  };

  const { mutateAsync: createSong } = useMutation({
    mutationKey: ["songs"],
    mutationFn: postSongApi,
  });

  return { createSong };
};
