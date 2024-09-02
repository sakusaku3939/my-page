import menu from "@/components/molecule/Menu/Menu.module.css";
import hamburger from "@/components/molecule/HamburgerMenu/HamburgerMenu.module.css";
import Link from "next/link";
import React from "react";

const Menu = () => {
  return <div className={menu.wrapper}>
    <MenuItem />
  </div>;
};

const FooterMenu = () => {
  return <div className={menu.footer}>
    <MenuItem />
  </div>;
};

type MenuItemProps = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>,
};

const MenuItem = ({ onClick }: MenuItemProps) => {
  return <>
    <Link className={hamburger.link} href="/" onClick={onClick}>HOME</Link>
    <Link className={hamburger.link} href="/profile" onClick={onClick}>プロフィール</Link>
    <Link className={hamburger.link} href="/posts" onClick={onClick}>制作物一覧</Link>
  </>;
};

export { Menu, FooterMenu, MenuItem };