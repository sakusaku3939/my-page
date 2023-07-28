import menu from "@/components/molecule/HamburgerMenu/HamburgerMenu.module.css";
import React, { useState } from "react";
import Link from "next/link";
import getWindowSize from "@/model/GetWindowSize";

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const windowSize = getWindowSize();

  return <>
    <div className={menu.wrapper}>
      <div className={`${menu.hamburgerMenu} ${isMenuOpen ? menu.active : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
      </div>
    </div>
    <div className={`${menu.content} ${isMenuOpen ? menu.open : ""}`} style={{ height: windowSize.height }}>
      <div className={menu.linkWrapper}>
        <Link className={menu.link} href="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>
        <Link className={menu.link} href="/posts" onClick={() => setIsMenuOpen(false)}>記事一覧</Link>
      </div>
    </div>
  </>;
};

export default HamburgerMenu;