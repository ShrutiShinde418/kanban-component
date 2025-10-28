import React from "react";
import type { MenuItem, MenuProps } from "./types.ts";
import Button from "./Button.tsx";

const Menu: React.FC<MenuProps> = ({
  subMenuItems,
  classNames,
  menuItemClassNames,
  listStyles,
}) => {
  return (
    <div
      className={`absolute bg-white py-1 text-black font-normal border border-gray-300 rounded-sm z-50 mt-1 ${classNames} opacity-0 transition-all duration-100 rounded-md`}
    >
      <ul className={`flex flex-col ${listStyles}`}>
        {subMenuItems.map((subMenuItem: MenuItem) => {
          return (
            <li key={subMenuItem.id} className={`${menuItemClassNames}`}>
              <Button>{subMenuItem.title}</Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
