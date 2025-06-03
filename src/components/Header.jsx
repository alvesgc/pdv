const Header = ({clickMenu}) => {
    return (
        <header className=" bg-gray-900 text-white flex item-center p-4 shadow-md fixed top-0 left-0 w-full z-50 ">
            <button onClick={clickMenu} className="mr-4 text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
            <h1 className="text-2xl font-semibold">NeoPDV</h1>
        </header>
    )
}

export default Header;