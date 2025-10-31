import React from "react";
import type { MenuItem, MenuProps } from "./types.ts";
import Button from "./Button.tsx";
import { useModalStore } from "../../store/useModalStore.ts";
import { useShallow } from "zustand/react/shallow";

const Menu: React.FC<MenuProps> = ({
  subMenuItems,
  classNames,
  menuItemClassNames,
  listStyles,
  columnDetails,
}) => {
  console.log(subMenuItems);
  const { openModalForColumnUpdate } = useModalStore(
    useShallow((state) => ({
      openModalForColumnUpdate: state.openModalForColumnUpdate,
    }))
  );
  const handleOnClick = (buttonTitle: string) => {
    if (buttonTitle === "Delete") return;

    console.log("Column details:", columnDetails);
    console.log("Calling openModalForColumnUpdate...");
    openModalForColumnUpdate({ option: buttonTitle, column: columnDetails });
    console.log("Done calling openModalForColumnUpdate");
  };

  return (
    <div
      className={`absolute bg-white py-1 text-black font-normal border border-gray-300 rounded-sm z-50 mt-1 ${classNames} opacity-0 transition-all duration-100 rounded-md`}
    >
      <ul className={`flex flex-col ${listStyles}`}>
        {subMenuItems.map((subMenuItem: MenuItem) => {
          console.log(subMenuItem);
          return (
            <li key={subMenuItem.id} className={`${menuItemClassNames}`}>
              <Button
                onClick={() => handleOnClick(subMenuItem.title)}
                type="button"
                className="px-5 py-2 w-full text-left"
              >
                {subMenuItem.title}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
