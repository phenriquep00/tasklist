import { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar/SideBar";
import { TaskContainer } from "../components/TaskContainer/TaskContainer";
import useWindowDimensions from "../hooks/useWindowDimensions";

export function TodoPage() {
  // get window dimensions
  const { width, height } = useWindowDimensions();
  // sidebar activity  state controller
  const [isSideBarOpen, setIsSideBarOpen] = useState(
    height < width ? true : false
  );

  // check if the viewport is mobile
  const [isMobile, setIsMobile] = useState(height > width ? true : false);
  // force update on tasklist state
  const [forceTasklistUpdate, setForceTasklistUpdate] = useState(false);

  // update viewport when the window dimension change
  useEffect(() => {
    setIsMobile(height > width ? true : false);
  }, [width, height]);

  return (
    <div className="flex w-screen h-screen flex-row items-center bg-ctp-base justify-center text-ctp-text">
      <SideBar
        isOpen={isSideBarOpen}
        isMobile={isMobile}
        setIsOpen={setIsSideBarOpen}
        forceTasklistUpdate={forceTasklistUpdate}
        setForceTasklistUpdate={setForceTasklistUpdate}
      />
      <TaskContainer
        isSideBarOpen={isSideBarOpen}
        isMobile={isMobile}
        forceTasklistUpdate={setForceTasklistUpdate}
      />
    </div>
  );
}
