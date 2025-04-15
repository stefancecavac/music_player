import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useGetAllPlaylists = () => {
  const getAllPlaylistsApi = async () => {
    const response = await axios.get(`${BASE_URL}/playlists/`);

    return response.data;
  };

  const { data: playlists, isPending: playlistsLoading } = useQuery({
    queryKey: ["playlist"],
    queryFn: getAllPlaylistsApi,
  });

  return { playlists, playlistsLoading };
};

export const useGetSinglePlaylist = (id: string) => {
  const getSinglePlaylistsApi = async () => {
    const response = await axios.get(`${BASE_URL}/playlists/${id}`);

    return response.data;
  };

  const { data: playlist, isPending: playlistLoading } = useQuery({
    queryKey: ["playlist", id],
    queryFn: getSinglePlaylistsApi,
  });

  return { playlist, playlistLoading };
};
