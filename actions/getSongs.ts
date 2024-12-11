import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongs = async (limit?: number): Promise<Song[]> => {
    try{
    const supabase = createServerComponentClient({ cookies });

        // Build the query
        let query = supabase
            .from("songs")
            .select("*")
            .order("created_at", { ascending: false });

        // Add optional limit
        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Error fetching songs:", error.message, error.details);
            return [];
        }

        // Return data if available, or an empty array as a fallback
        return data ?? [];
    } catch (err: unknown) {
        console.error("Unexpected error:", (err as Error).message);
        return [];
    }
};

export default getSongs;
