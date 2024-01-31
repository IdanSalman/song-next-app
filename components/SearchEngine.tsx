"use client"
import "@/app/styles.css"
import SongResults from "./SongResults";
import { useState } from "react";
import { findAllTracksFiltered } from "@/drizzle";

const MAX_RESULTS = 10;
interface LoginFormElements extends HTMLFormControlsCollection {
    "message-submit": HTMLInputElement
}
interface LoginFormElement extends HTMLFormElement {
    readonly elements: LoginFormElements
}
// TODO https://medium.com/@jamischarles/what-is-debouncing-2505c0648ff1 
// Add Debouncing to the song filter.

export default function SearchEngine() {
    const [data, setData] = useState<any[]>([]);

    const fetchData = async (message: string) => {
        const results = await findAllTracksFiltered(message)
        if (results.length > MAX_RESULTS)
            results.slice(0, MAX_RESULTS)
        return results
    };
    if (data.length == 0)
        fetchData("").then((result) => {
            setData(result)
        })

    // TODO Change to onSubmit instead :)
    const handleFormSubmit = (e: React.FormEvent<LoginFormElement>) => {
        e.preventDefault()
        let message = e.currentTarget.elements["message-submit"].value

        fetchData(message).then((result) => {
            setData(result)
        })
    };

    let filteredSongList = data
    return (
        <div id="search-bar">
            <form onSubmit={handleFormSubmit}>
                <input id="message-submit" type="text" name="searchBar" />
            </form>
            <SongResults songList={filteredSongList} />
        </div>
    );

}