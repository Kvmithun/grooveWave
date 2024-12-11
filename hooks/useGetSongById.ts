import { useEffect, useMemo, useState } from "react";
import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      try {
        // Fetch song from the "songs" table
        const { data, error } = await supabaseClient
          .from("songs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        // Optional: Fetch related file from the "Songs" bucket
        const { data: fileData, error: fileError } = await supabaseClient.storage
          .from("Songs")
          .download(data?.file_path); // Adjust "file_path" field based on your schema

        if (fileError) {
          console.warn("File not found in bucket:", fileError.message);
        }

        // Set the song data along with the file (if available)
        setSong({ ...data, file: fileData } as Song);
      } catch (err: any) {
        toast.error(err.message || "An error occurred while fetching the song.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
