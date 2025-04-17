import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatePlaylistData, PlaylistData } from "../types";
import { axiosInstance } from "../config/ApiClient";

export const useGetAllPlaylists = () => {
  const getAllPlaylistsApi = async () => {
    const response = await axiosInstance.get(`/playlists/`);

    return response.data as PlaylistData[];
  };

  const { data: playlists, isPending: playlistsLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: getAllPlaylistsApi,
  });

  return { playlists, playlistsLoading };
};

export const useGetSinglePlaylist = (id: string, enabled = true) => {
  return useQuery<PlaylistData>({
    queryKey: ["playlist", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/playlists/${id}`);
      return response.data;
    },
    enabled,
    staleTime: 0,
  });
};

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient();

  const createPlaylistApi = async ({ name, userId }: CreatePlaylistData) => {
    const response = await axiosInstance.post(`/playlists/`, { name, userId });

    return response.data;
  };

  const { mutate: createPlaylist } = useMutation({
    mutationKey: ["playlist"],
    mutationFn: createPlaylistApi,
    onSuccess: (data: PlaylistData) => {
      queryClient.setQueryData(["playlists"], (oldData: PlaylistData[]) => {
        return [...oldData, data];
      });
    },
  });

  return { createPlaylist };
};
