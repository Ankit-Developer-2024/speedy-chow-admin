import { useSelector } from "react-redux"
import { user } from "../../features/sideBar/sideBarSlice"

export const PageHeading = function ({ pageName }) {
    const userData = useSelector(user)
    return (
        <>
            <h1 className="text-3xl font-bold">{pageName}</h1>
            <p className="text-sm text-gray-400">Hi, {userData.name}. Welcome back to Sppedy Chow Admin panel</p>
        </>
    )
}