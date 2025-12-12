import menu from "@/components/molecule/HamburgerMenu/HamburgerMenu.module.css";
import React, { memo, useEffect, useState } from "react";
import { MenuItem } from "@/components/molecule/Menu/Menu";

type HamburgerMenuProps = {
  lightMode?: boolean;
};

const HamburgerMenu = memo(({ lightMode = false }: HamburgerMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // 初回のみwindowの高さを取得
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  useEffect(() => {
    isMenuOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isMenuOpen]);

  return <>
    <div 
      className={`${menu.hamburgerMenu} ${isMenuOpen ? menu.active : ""} ${lightMode ? menu.light : ""}`} 
      onClick={toggleMenu}
    >
      <span></span>
      <span></span>
    </div>
    <div className={`${menu.content} ${isMenuOpen ? menu.open : ""}`} style={{ height: windowHeight || "100vh" }}>
      <div className={menu.linkWrapper}>
        <MenuItem onClick={() => setIsMenuOpen(false)} />
      </div>
    </div>
  </>;
});

HamburgerMenu.displayName = "HamburgerMenu";

export default HamburgerMenu;