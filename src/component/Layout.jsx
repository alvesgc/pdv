import React, {useState} from "react";
import SideBar from "./SideBar";
import Header from "./Header";

const Layout = ({ children }) => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const toogleSideBar = () => {
        setSidebarVisible(!isSidebarVisible);
    }

    return (
     <div className="flex">
        <SideBar visible={isSidebarVisible} />
        <div className="flex-1">
            <Header clickMenu={toogleSideBar}>
                <main className="p-6">{children}</main>
            </Header>
        </div>
     </div>   
    )
}

export default Layout;