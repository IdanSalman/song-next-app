"use client"
import MainButtonAppBar from '@/components/ButtonAppBar'
import { useLoggedInContext } from "./LoginContext"
import SearchEngine from "@/components/SearchEngine"

export default function App() {
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

        displayedSongs = <SearchEngine />
    }

    return (<div>
        <MainButtonAppBar {...mainParams} />
        {displayedSongs}
    </div>);
}