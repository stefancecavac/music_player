import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateSongData, SongData } from "../types";
import { axiosInstance } from "../config/ApiClient";
import axios from "axios";
import { useAtom, useSetAtom } from "jotai";
import { playlistAtom } from "../atoms/PlaylistAtom";
import { songsAtom } from "../atoms/SongAtom";
import { ToastAtom } from "../atoms/ToastAtom";

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

    return response.data as { title: string; thumbnail_url: string };
  };

  const { mutateAsync: getSongInformation, error: songInformationError } = useMutation({
    mutationKey: ["songInformation"],
    mutationFn: getSongInformationApi,
  });

  return { getSongInformation, songInformationError };
};

export const useCreateSong = () => {
  const setToast = useSetAtom(ToastAtom);

  const [playlist, setPlaylist] = useAtom(playlistAtom);
  const setSongs = useSetAtom(songsAtom);

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
      setSongs((prev) => [...prev, data]);
      setSongs(playlist?.songs || []);
      setToast({
        message: "Successfuly Created Song!",
        type: "success",
        open: true,
      });
    },
  });

  return { createSong, creatingSong };
};

export const useMoveSong = () => {
  const setToast = useSetAtom(ToastAtom);

  const moveSongApi = async ({ id, playlistId }: { id: string; playlistId: string }) => {
    const response = await axiosInstance.put(`/songs/`, { id, playlistId });

    return response.data as SongData;
  };

  const { mutateAsync: moveSong } = useMutation({
    mutationKey: ["songs"],
    mutationFn: moveSongApi,
    onSuccess: () => {
      setToast({
        message: "Successfuly Moved Song!",
        type: "success",
        open: true,
      });
    },
  });

  return { moveSong };
};

export const useDeleteSong = () => {
  const setPlaylist = useSetAtom(playlistAtom);
  const setToast = useSetAtom(ToastAtom);

  const deleteSongApi = async ({ id }: { id: string }) => {
    const response = await axiosInstance.delete(`/songs/`, { data: { id } });

    return response.data as SongData;
  };

  const { mutateAsync: deleteSong, isPending: deletingSong } = useMutation({
    mutationKey: ["songs"],
    mutationFn: deleteSongApi,
    onSuccess: (data) => {
      setPlaylist((prev) => {
        if (!prev) return prev;

        return {
          id: prev.id,
          name: prev.name,
          songs: prev.songs.filter((prevSong) => prevSong.id !== data.id),
        };
      });
      setToast({
        message: "Successfuly Deleted Song!",
        type: "success",
        open: true,
      });
    },
  });

  return { deleteSong, deletingSong };
};
