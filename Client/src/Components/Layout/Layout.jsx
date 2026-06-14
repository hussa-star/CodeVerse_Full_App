import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

import { Outlet } from "react-router-dom";

// The "children" prop stands for whatever page is currently rendered inside the route
function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      {/* 1. Global Header always loaded */}
      <Header />
      <Outlet />

      {/* 2. Main content area where our individual pages render dynamic content */}
      <main className={styles.mainContent}>{children}</main>

      {/* 3. Global Footer always loaded */}
      <Footer />
    </div>
  );
}

export default Layout;
