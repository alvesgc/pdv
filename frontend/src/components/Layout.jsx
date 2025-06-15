import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

const Layout = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();

  const toogleSideBar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const closeSideBar = () => {
    setSidebarVisible(false);
  };

  const hideLayoutRoutes = ['/login', '/register'];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {!shouldHideLayout && (
        <SideBar visible={isSidebarVisible} onClose={closeSideBar} />
      )}
      <div className="flex-1">
        {!shouldHideLayout && <Header clickMenu={toogleSideBar} />}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
