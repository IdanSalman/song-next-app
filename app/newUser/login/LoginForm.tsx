"use client"
import { handleLogin } from "@/app/cookiesLogic/actions";
import { verifyString } from "@/app/dbLogic/utils";
import { useLoggedInContext } from "@/app/LoginContext";
import { findUser } from "@/drizzle";
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
                const result = (await findUser(username))
                if (result == undefined || result.length == 0) {
                    console.log("Unknown username, consider registering")
                }
                else if (await verifyString(result[0].password, password)) {
                    console.log("Correct password")
                    setLoggedIn(true)
                    handleLogin(JSON.stringify(result[0]))
                    push("/")
                }
                else
                    console.log("Incorrect password")
            }
            insertData()
        }
    }
    // TODO Add tailwind that functions properly
    return <form className={"login-form"} onSubmit={handleFormSubmit}>
        <div className={"titleContainer"}>Login</div>
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
            value={"LOGIN"} />
    </form>
}