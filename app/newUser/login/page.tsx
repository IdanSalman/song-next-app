"use client"
import "../DataForm.css";
import "@/app/styles.css";
import MainButtonAppBar from "@/components/ButtonAppBar";
import LoginForm from "./LoginForm";

/**
 * When you can complete the 
 * db connection and it works
 * go to https://clerk.com/blog/building-a-react-login-page-template
 * and copy the code written to implement
 * the verification process
 */

export default function App() {
    return (
        <div id="newUser-form">
            <MainButtonAppBar label="Login Page" displayRegister={true} displayLogin={false} displayProfile={false} />
            <LoginForm />
        </div>
    );
};