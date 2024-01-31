"use client"
import MainButtonAppBar from '@/components/ButtonAppBar'
import SearchEngine from "@/components/SearchEngine"
import getJsonDB from "./dbLogic/jsonDBClass"
import { useLoggedInContext } from "./LoginContext"
import { useState } from "react"

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
    const [data, setData] = useState([]);

    const { loggedIn } = useLoggedInContext()
    let displayedSongs = <h3>You should Login/Register in order to open the full site</h3>
    let mainParams = {
        label: "Main Page",
        displayRegister: true,
        displayLogin: true,
        displayProfile: false,
    }
    if (loggedIn == true) {
        mainParams["displayRegister"] = false
        mainParams["displayLogin"] = false
        mainParams["displayProfile"] = true

        const fetchData = async () => {
            const result = await getJsonDB().findAll("tracks");
            return result
        };
        fetchData().then((result) => {
            if (data.length == 0)
                setData(result)
        })
        displayedSongs = <SearchEngine songList={dictToList(data)} />
    } else {
        displayedSongs = <h3>You should Login/Register in order to open the full site</h3>
    }

    return (<div>
        <MainButtonAppBar {...mainParams} />
        {displayedSongs}
    </div>);
}