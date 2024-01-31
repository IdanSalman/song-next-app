import * as React from "react";
import SongResult from "./SongResult";

type SongLists = {
    songList: { tracks: any, artists: any, albums: any }[]
}

export default function SongResults({ songList }: SongLists) {

    return <ul>
        {songList.map(songData => {

            return <SongResult key={songData.tracks.trackId} {...{
                id: songData.tracks.trackId,
                name: songData.tracks.name,
                album: songData.albums.title,
                artist: songData.artists.name,
                price: songData.tracks.unitPrice
            }} />
        })}
    </ul>;
}