"use client";

// Player.tsx
import React, { useRef, useEffect } from 'react';
import { Song } from './types'; // Adjust the import path as necessary

interface PlayerProps {
    currentSong: Song | null; // Allow currentSong to be null
    onNext: () => void;
    onPrevious: () => void;
}

const Player: React.FC<PlayerProps> = ({ currentSong, onNext, onPrevious }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    // Play the audio when the current song changes
    useEffect(() => {
        if (audioRef.current && currentSong) {
            audioRef.current.load(); // Load the new song
            audioRef.current.play(); // Play the new song
        }
    }, [currentSong]);

    if (!currentSong) {
        return <p>No song is currently selected.</p>; // Fallback message if no song is available
    }

    return (
        <div>
            <h2>{currentSong.title} - {currentSong.author}</h2>
            <img src={currentSong.image_path} alt={currentSong.title} style={{ width: '100px', height: '100px' }} />
            <audio ref={audioRef} src={currentSong.song_path} controls />
            <div>
                <button onClick={onPrevious}>Previous</button>
                <button onClick={onNext}>Next</button>
            </div>
        </div>
    );
};

export default Player;


