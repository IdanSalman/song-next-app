"use client"
import SearchEngine from "@/components/SearchEngine"
import { useLoggedInContext } from "@/app/LoginContext"
import { getSessionData } from "./cookiesLogic/actions";

interface DbTableDict {
    [id: string]: any;
}

export function dictToList(dataDict: DbTableDict) {
    let songList = []
    for (var key in dataDict) {
        var value = dataDict[key];
        songList.push(value)
    }
    return songList
}

export default function App() {
    const { loggedIn, setLoggedIn } = useLoggedInContext()
    let displayedSongs
    let seshData = async () => {
        const data = await getSessionData()
        if (data != null)
            setLoggedIn(true)
    }

    if (loggedIn == false)
        seshData()
    if (loggedIn == true) {
        displayedSongs = <SearchEngine />
    } else {
        displayedSongs = <h3>You should Login/Register in order to open the full site</h3>
    }

    return (<div>
        {displayedSongs}
    </div>);
}
