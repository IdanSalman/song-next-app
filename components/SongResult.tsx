import { Song, BasicCard } from "./Song";

function handleCart(songID: string) { } // TODO Implement me

export default function SongResult(songData: Song) {
    let songID = songData.id

    return <>
        <BasicCard {...songData} />
    </ >;
}