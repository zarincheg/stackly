import { redirect } from "next/navigation"
import Image from "next/image";
import { signIn, auth, providerMap } from "@/auth"
import { AuthError } from "next-auth"

export default async function SignInPage() {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col pt-32">
                <div className="mx-auto bg-white p-20 rounded-2xl shadow-lg">
                    <h2 className="text-4xl font-bold text-slate-600">Stackly</h2>
                    <h3 className="text-m font-light text-slate-600">NextJS-based boilerplate with auto deployment to your own server</h3>
                
                {Object.values(providerMap).map(
                    (provider) => {
                        return (<form
                            className="mx-auto pt-8"
                            key={provider.id}
                            action={async () => {
                                "use server"
                                try {
                                    await signIn(provider.id, {
                                        redirectTo: '/'
                                    })
                                } catch (error) {
                                    console.error("Auth error")
                                    if (error instanceof AuthError) {
                                        return redirect(`/auth?error=${error.type}`)
                                    }

                                    throw error
                                }
                            }}>
                            <button type="submit" className="flex flex-row gap-3 bg-transparent border border-slate-200 hover:bg-slate-50 px-8 py-3 text-sm leading-5 rounded-md font-semibold text-black">
                                <Image
                                    src="/google.svg"
                                    alt="Google Logo"
                                    className="dark:invert"
                                    width={24}
                                    height={24}
                                    priority
                                />
                                <span className="leading-6">Sign in with {provider.name}</span>
                            </button>
                        </form>)
                    }
                    )}
                </div>
            </div>
        </div>
    )
}