const SideBar = ({
    setIsSideBar,
    isSideBar,
    setIsSubscribe,
    setIsHistory
}) => {

    const handlerIsSuscribe = () => {
        setIsSubscribe(true)
        setIsHistory(false)
        setIsSideBar(false)
    }
    
    const handlerIsHistory = () => {
        setIsHistory(true)
        setIsSubscribe(false)
        setIsSideBar(false)
    }

    const handlerIsFund = () => {
        setIsHistory(false)
        setIsSubscribe(false)
        setIsSideBar(false)
    }

    return (
            <div className={`${isSideBar ? "left-0" : "-left-32"} bg-teal-400 h-full pt-16 w-32 absolute min-h-full transition-all shadow-md  pt-3 flex flex-col items-center text-white sm:left-0`}>
                <p className="p-2 w-full font-semibold cursor-pointer transition-all hover:bg-teal-600 shadow-md" onClick={handlerIsFund}>Funds</p>
                <p className="p-2 w-full font-semibold cursor-pointer transition-all hover:bg-teal-600 shadow-md" onClick={handlerIsSuscribe}>Subscribe / Cancel</p>
                <p className="p-2 w-full font-semibold cursor-pointer transition-all hover:bg-teal-600 shadow-md" onClick={handlerIsHistory}>History</p>
            </div>
    )
}

export default SideBar