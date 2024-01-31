"use client"
import "@/app/styles.css"
import SongResults from "./SongResults";
import filterSongs from "../app/songs/filterSongs";
import { Song } from "./Song";
import { ChangeEvent, useState } from "react";

const MAX_RESULTS = 10;

// TODO https://medium.com/@jamischarles/what-is-debouncing-2505c0648ff1 
// Add Debouncing to the song filter.

type SongRequest = {
    songList: Song[]
}

export default function SearchEngine({ songList }: SongRequest) {
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