import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer.jsx";
function Layout({ children }) {
    return (
        <div>
            <NavBar />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
