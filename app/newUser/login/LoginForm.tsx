"use client"
import { useLoggedInContext } from "@/app/LoginContext";
import getJsonDB from "@/app/dbLogic/jsonDBClass";
import { dictToList } from "@/app/page";
import { useRouter } from "next/navigation";

// Inspired from https://stackoverflow.com/questions/56322667/how-to-type-a-form-component-with-onsubmit
export interface LoginFormElements extends HTMLFormControlsCollection {
    "input-pass": HTMLInputElement
    "input-user": HTMLInputElement
}
interface LoginFormElement extends HTMLFormElement {
    readonly elements: LoginFormElements
}

export default function LoginForm() {
    const { push } = useRouter();
    const { setLoggedIn } = useLoggedInContext()

    const handleFormSubmit = (e: React.FormEvent<LoginFormElement>) => {
        e.preventDefault()
        let username = e.currentTarget.elements["input-user"].value
        let password = e.currentTarget.elements["input-pass"].value

        if (username != "" && password != "") {
            const insertData = async () => {
                console.log("Reached inside")
                const results = (await getJsonDB().findAll("users"))
                console.log(results)
                let result = dictToList(results).filter((user: { username: string, password: string }) => {
                    if (user.username == username)
                        return true
                    return false
                })[0]
                if (result == undefined || result.length == 0) {
                    console.log("Unknown username, consider registering")
                }
                else if (await getJsonDB().verifyHashedString(result.password, password)) {
                    console.log("Correct password")
                    setLoggedIn(true)
                    push("/")
                }
                else
                    console.log("Incorrect password")
            }
            insertData()
        }
    }
    return <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username:</label>
        <input
            id="input-user"
            type="text" />
        <label htmlFor="password">Password:</label>
        <input
            id="input-pass"
            type="password" />
        <input
            type="submit"
            value={"Log In"} />
    </form>
}