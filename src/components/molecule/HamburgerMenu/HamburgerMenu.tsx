import menu from "@/components/molecule/HamburgerMenu/HamburgerMenu.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import getWindowSize from "@/model/GetWindowSize";

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const windowSize = getWindowSize();

  useEffect(() => {
    isMenuOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  });

  return <>
    <div className={`${menu.hamburgerMenu} ${isMenuOpen ? menu.active : ""}`} onClick={toggleMenu}>
      <span></span>
      <span></span>
    </div>
    <div className={`${menu.content} ${isMenuOpen ? menu.open : ""}`} style={{ height: windowSize.height }}>
      <div className={menu.linkWrapper}>
        <Link className={menu.link} href="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>
        <Link className={menu.link} href="/posts" onClick={() => setIsMenuOpen(false)}>制作物</Link>
      </div>
    </div>
  </>;
};

export default HamburgerMenu;