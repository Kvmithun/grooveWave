"use client";

import { useRouter } from "next/navigation";
import { useSessionContext } from '@supabase/auth-helpers-react';
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";

interface LikeButtonProps {
    songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();
    const authModal = useAuthModal();
    const { user } = useUser();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('song_id', songId)
                .eq('user_id', user.id) // Ensure you check for the user_id
                .single();

            if (!error && data) {
                setIsLiked(true);
            }
        };

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        try {
            if (isLiked) {
                const { error } = await supabaseClient
                    .from('liked_songs')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('song_id', songId);

                if (error) throw error;

                setIsLiked(false);
                toast.success('Unliked!');
            } else {
                const { error } = await supabaseClient
                    .from('liked_songs')
                    .insert({
                        song_id: songId,
                        user_id: user.id
                    });

                if (error) throw error;

                setIsLiked(true);
                toast.success('Liked!');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            router.refresh();
        }
    };

    return (
        <button
            onClick={handleLike}
            className="hover:opacity-75 transition"
            aria-label={isLiked ? "Unlike song" : "Like song"} // Accessibility
        >
            <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
        </button>
    );
};

export default LikeButton;