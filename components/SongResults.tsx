import * as React from "react";
import SongResult from "./SongResult";
import { Song } from "./Song";

type SongLists = {
    songList: Song[]
}

export default function SongResults({ songList }: SongLists) {

    return <ul>
        {songList.map(songData => {
            return <SongResult key={songData.id} {...songData} />
        })}
    </ul>;
}