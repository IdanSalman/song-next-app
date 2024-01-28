"use client"
import { useState, ChangeEvent } from 'react';
import songList from "../app/songList.json";
import SongResults from "./SongResults";
import filterSongs from "../app/songs/filterSongs";

const MAX_RESULTS = 10;

// TODO https://medium.com/@jamischarles/what-is-debouncing-2505c0648ff1 
// Add Debouncing to the song filter.

export default function SearchEngine() {
    const [message, setMessage] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);

        console.log('value is:', event.target.value);
    };

    let filteredSongList = filterSongs(songList, message, MAX_RESULTS);
    return (
        <div id="search-bar">
            <input type="text" name="searchBar" onChange={handleChange} />
            <SongResults songList={filteredSongList} />
        </div>
    );
}