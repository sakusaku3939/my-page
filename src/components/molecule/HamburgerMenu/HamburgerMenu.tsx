import menu from "@/components/molecule/HamburgerMenu/HamburgerMenu.module.css";
import React, { useEffect, useState } from "react";
import getWindowSize from "@/model/GetWindowSize";
import { MenuItem } from "@/components/molecule/Menu/Menu";

type HamburgerMenuProps = {
  lightMode?: boolean;
};

const HamburgerMenu = ({ lightMode = false }: HamburgerMenuProps) => {
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
    <div 
      className={`${menu.hamburgerMenu} ${isMenuOpen ? menu.active : ""} ${lightMode ? menu.light : ""}`} 
      onClick={toggleMenu}
    >
      <span></span>
      <span></span>
    </div>
    <div className={`${menu.content} ${isMenuOpen ? menu.open : ""}`} style={{ height: windowSize.height }}>
      <div className={menu.linkWrapper}>
        <MenuItem onClick={() => setIsMenuOpen(false)} />
      </div>
    </div>
  </>;
};

export default HamburgerMenu;