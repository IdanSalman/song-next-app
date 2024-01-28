import { Song } from "../../components/Song";


export default function filterSongs(songsOptions: Song[], searchText: string, maxResults: number) {
    let result = songsOptions.filter(
        x => {
            if (x.album.toLowerCase().includes(searchText.toLowerCase()))
                return true;
            if (x.artist.toLowerCase().includes(searchText.toLowerCase()))
                return true;
            if (x.name.toLowerCase().includes(searchText.toLowerCase()))
                return true;
            return false;
        }
    );
    if (result.length > maxResults)
        return result.slice(result.length - maxResults);
    return result
}