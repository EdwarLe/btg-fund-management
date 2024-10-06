const TopBar = ({ setIsSideBar }) => {
    const handlerShowSideBar = () => {
        setIsSideBar((prev) => !prev)
    }
    return (
        <div className="bg-blue-500 max-w-[1200px] h-16 shadow-md flex justify-between items-center p-2 text-white fixed w-full z-10">
            <i className='bx bx-menu text-2xl cursor-pointer px-2 sm:hidden sm:none' onClick={handlerShowSideBar}></i>
            <h4 className="font-bold text-2xl">BTG</h4>
            <div className="h-full flex justify-center items-center gap-2">
                <p>User Name</p>
                <div className="h-full">
                    <img src="/user-img.png" alt="user image" className="h-full"/>
                </div>
            </div>
        </div>
    )
}

export default TopBar