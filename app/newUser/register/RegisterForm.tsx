"use client"
import { useRouter } from "next/navigation";
import { LoginFormElements } from "../login/LoginForm";
import getJsonDB from "@/app/dbLogic/jsonDBClass";


// Inspired from https://stackoverflow.com/questions/56322667/how-to-type-a-form-component-with-onsubmit
interface RegisterFormElements extends LoginFormElements {
    "input-email": HTMLInputElement
    // ...
}
interface RegisterFormElement extends HTMLFormElement {
    readonly elements: RegisterFormElements
}

export default function RegisterForm() {
    const { push } = useRouter();

    function handleFormSubmit(e: React.FormEvent<RegisterFormElement>) {
        e.preventDefault()
        let username = e.currentTarget.elements["input-user"].value
        let password = e.currentTarget.elements["input-pass"].value

        if (username != "" && password != "") {
            const insertData = async () => {
                console.log("Reached inside")
                await getJsonDB().createRecord("users", '{ "username":"' + username + '", "password": "' + await getJsonDB().hashString(password) + '" }')
            }
            insertData()
            push("/newUser/login")
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
            value={"Register"} />
    </form>
}