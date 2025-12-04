"use client"

interface AuthTabsProps {
    activeTab: "signin" | "signup"
    onTabChange: (tab: "signin" | "signup") => void
}

/**
 * Tab navigation component for switching between Sign In and Sign Up forms
 */
export default function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
    return (
        <div className="mb-8 flex">
            <div className="flex w-full rounded-lg bg-slate-100 p-1">
                <button
                    onClick={() => onTabChange("signin")}
                    className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        activeTab === "signin"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                    Sign In
                </button>
                <button
                    onClick={() => onTabChange("signup")}
                    className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        activeTab === "signup"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                    Sign Up
                </button>
            </div>
        </div>
    )
}
