import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";  // Ensure you're using the correct import
import { Song } from "@/types";

const getSongsByUserId = async (limit?: number): Promise<Song[]> => {
  // Call cookies() to retrieve cookies on the server side
  const cookieStore = cookies();  // Invoke cookies() here

  const supabase = createServerComponentClient({
    cookies,  // Pass the cookies object to the Supabase client
  });

  // Authenticate the user
  const { data: { user }, error: userError } = await supabase.auth.getUser ();

  if (userError) {
    console.error("Error fetching user:", userError);
    return [];
  }

  if (!user) {
    console.warn("No authenticated user found.");
    return [];
  }

  // Fetch songs for the authenticated user
  const { data: songs, error: songsError } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", user.id) // Replace "user_id" with the correct column in your table
    .limit(limit || 10);

  if (songsError) {
    console.error("Error fetching songs:", songsError);
    return [];
  }

  return songs || [];
};

export default getSongsByUserId;