import { useMutation, useQuery } from "@tanstack/react-query";
import { CreatePlaylistData, PlaylistData } from "../types";
import { axiosInstance } from "../config/ApiClient";

export const useGetAllPlaylists = () => {
  const getAllPlaylistsApi = async () => {
    const response = await axiosInstance.get(`/playlists/`);

    return response.data as PlaylistData[];
  };

  const { data: playlists, isPending: playlistsLoading } = useQuery({
    queryKey: ["playlist"],
    queryFn: getAllPlaylistsApi,
  });

  return { playlists, playlistsLoading };
};

export const useGetSinglePlaylist = (id: string) => {
  const getSinglePlaylistsApi = async () => {
    const response = await axiosInstance.get(`/playlists/${id}`);

    return response.data;
  };

  const { data: playlist, isPending: playlistLoading } = useQuery({
    queryKey: ["playlist", id],
    queryFn: getSinglePlaylistsApi,
  });

  return { playlist, playlistLoading };
};

export const useCreatePlaylist = () => {
  const createPlaylistApi = async ({ name, userId }: CreatePlaylistData) => {
    const response = await axiosInstance.post(`/playlists/`, { name, userId });

    return response.data;
  };

  const { mutate: createPlaylist } = useMutation({
    mutationKey: ["playlist"],
    mutationFn: createPlaylistApi,
  });

  return { createPlaylist };
};
