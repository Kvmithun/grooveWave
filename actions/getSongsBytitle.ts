import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "@/types";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({ 
    cookies :cookies,
 });

  // Authenticate the user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("User authentication error:", userError);
    return [];
  }

  // Fetch songs if user is authenticated
  const { data: songs, error: songsError } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`);

  if (songsError) {
    console.error("Error fetching songs:", songsError);
    return [];
  }

  return songs || [];
};
  

export default getSongsByTitle;