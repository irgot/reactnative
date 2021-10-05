import Image from "next/image";
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UserIcon } from "@heroicons/react/solid";
function HeaderComponent() {
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 p-5 bg-white shadow-sm md:px-10">
            <div className="relative flex items-center h-10 my-auto cursor-pointer">
                <Image
                    src="https://links.papareact.com/qd3"
                    layout='fill'
                    objectFit='contain'
                    objectPosition="left"
                />
            </div>
            <div className="flex items-center  rounded-full py-2 md:border-2 md:shadow-lg">
                <input className=" flex-grow pl-5 bg-transparent outline-none mr-2 text-gray-600 placeholder-gray-400" type="text" placeholder="Start your search" />
                <SearchIcon
                    className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer hidden md:inline-flex mx-auto md:mx-2"
                />
            </div>
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6" />
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
                    <MenuIcon className='h-6' />
                    <UserCircleIcon className='h-6' />
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent

