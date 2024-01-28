"use client"
import { useLoggedInContext } from "@/app/LoginContext";
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
    const { loggedIn, setLoggedIn } = useLoggedInContext()
    if (loggedIn) {
        push("/")
    }


    const handleFormSubmit = (e: React.FormEvent<LoginFormElement>) => {
        // TODO Update this function later...
        // Need to check from the appropriate db table if:
        // username's db password equals hash(password)

        e.preventDefault()
        let username = e.currentTarget.elements["input-user"].value
        let password = e.currentTarget.elements["input-pass"].value

        if (username != "" && password != "") {
            setLoggedIn(true)
            push("/")
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