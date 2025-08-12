import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer.jsx";
function Layout({ children }) {
    return (
        <div className="h-dvh flex flex-col">
            <NavBar />
            <section className="m-4 flex-grow">{children}</section>
            <Footer />
        </div>
    );
}

export default Layout;
