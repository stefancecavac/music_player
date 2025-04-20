import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatePlaylistData, DeletePlaylistData, PlaylistData, UpdatePlaylistData } from "../types";
import { axiosInstance } from "../config/ApiClient";
import { useSetAtom } from "jotai";
import { ToastAtom } from "../atoms/ToastAtom";

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
  const setToast = useSetAtom(ToastAtom);

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

      setToast({
        message: "Successfuly Created playlist!",
        type: "success",
        open: true,
      });
    },
  });

  return { createPlaylist };
};

export const useUpdatePlaylist = () => {
  const queryClient = useQueryClient();

  const updatePlaylistApi = async ({ name, id }: UpdatePlaylistData) => {
    const response = await axiosInstance.put(`/playlists/`, { name, id });

    return response.data;
  };

  const { mutate: updatePlaylist } = useMutation({
    mutationKey: ["playlist"],
    mutationFn: updatePlaylistApi,
    onSuccess: (data: PlaylistData) => {
      queryClient.setQueryData(["playlists"], (oldData: PlaylistData[]) => {
        return oldData.map((playlist) => (playlist.id === data.id ? data : playlist));
      });
    },
  });

  return { updatePlaylist };
};

export const useDeletePlaylist = () => {
  const queryClient = useQueryClient();
  const setToast = useSetAtom(ToastAtom);

  const deletePlaylistApi = async ({ id, userId }: DeletePlaylistData) => {
    const response = await axiosInstance.delete(`/playlists/`, { data: { userId, id } });

    return response.data;
  };

  const { mutate: deletePlaylist } = useMutation({
    mutationKey: ["playlist"],
    mutationFn: deletePlaylistApi,
    onSuccess: (data: PlaylistData) => {
      queryClient.setQueryData(["playlists"], (oldData: PlaylistData[]) => {
        return oldData.filter((oData) => oData.id !== data.id);
      });
      setToast({
        message: "Successfuly Deleted Playlist!",
        type: "success",
        open: true,
      });
    },
  });

  return { deletePlaylist };
};
