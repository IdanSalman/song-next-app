"use client"
import "../DataForm.css";
import "../styles.css";
import MainButtonAppBar from '@/components/ButtonAppBar';
import RegisterForm from "./RegisterForm";

export default function App() {
    return (
        <div id="newUser-form">
            <MainButtonAppBar label="Register Page" displayRegister={false} displayLogin={true} displayProfile={false} />
            <RegisterForm />
        </div>
    );
};