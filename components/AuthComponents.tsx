import { signIn, signOut } from "@/auth"
// import { Button } from "./ui/button"

export function SignIn({
    provider,
}: { provider?: string }) {
    return (
        <form
            action={async () => {
                "use server"
                await signIn(provider)
            }}
        >
            <button>Sign In</button>
        </form>
    )
}

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
            className="w-full"
        >
            <button className="w-full p-0">
                Sign Out
            </button>
        </form>
    )
}
