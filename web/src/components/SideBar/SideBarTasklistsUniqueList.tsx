import { useContext, useEffect, useState } from "react";
import { TasklistContext } from "../../hooks/TasklistContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";

interface SideBarTasklistsUniqueListProps {
  name: string;
  numberOfTasks: () => number;
  isSideBarOpen: (arg0: boolean) => void;
}

export function SideBarTasklistsUniqueList({
  name,
  numberOfTasks,
  isSideBarOpen,
}: SideBarTasklistsUniqueListProps) {
  const { height, width } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState(
    height >= 700 && width >= 641 ? false : true
  );

  const { tasklist, setTasklist } = useContext(TasklistContext);

  const handleSideBarTasklistsUniqueListClick = () => {
    setTasklist(name);
    if (isMobile) isSideBarOpen(false);
  };

  return (
    <button
      tabIndex={0}
      onClick={handleSideBarTasklistsUniqueListClick}
      className="w-[95%] flex flex-row justify-between items-center bg-ctp-surface1 p-2 rounded hover:ring-2 ring-offset-1 ring-ctp-flamingo"
    >
      <p className="font-medium text-base truncate">{name}</p>
      <p className="bg-ctp-surface0 rounded px-2">{numberOfTasks()}</p>
    </button>
  );
}
