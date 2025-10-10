import { useNavigate } from "react-router"

export default function NotFound404() {

    const navigate = useNavigate()

    return <>
        <div className="flex flex-col justify-center gap-3 items-center w-svw h-svh">
            <div className="flex flex-row justify-center items-end">
                <h1 className="text-9xl font-bold text-red-600">O</h1>
                <h1 className="text-8xl font-bold">ops!</h1>
            </div>
            <h2 className="text-xl font-bold ">404 -  PAGE NOT FOUND</h2>
            <p className="text-md font-medium w-[32%] text-center">The page you are looking for might have been removed had its name changed or temporarily unavailable.</p>

            <button
                onClick={() => navigate('/')}
                className="bg-orange-400 p-2 px-5 rounded-md font-medium text-white hover:bg-amber-500"
            >GO TO HOMEPAGE</button>
        </div>
    </>
}