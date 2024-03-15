"use client"

import { logout } from "@/action/user"

export default function LogoutButton() {
    return (
        <button onClick={() => logout()} className="btn btn-primary">Logout</button>
    )
}