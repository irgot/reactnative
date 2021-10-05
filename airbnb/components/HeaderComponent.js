import Image from "next/image";
function HeaderComponent() {
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 p-5 bg-white shadow-lg md:px-10">
            <div className="relative flex items-center h-10 my-auto cursor-pointer">
                <Image
                    src="https://links.papareact.com/qd3"
                    layout='fill'
                    objectFit='contain'
                    objectPosition="left"
                />
            </div>
            <div>
                <input type="text" />
            </div>
            <div></div>
        </header>
    )
}

export default HeaderComponent

