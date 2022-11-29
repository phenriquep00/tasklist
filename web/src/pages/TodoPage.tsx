import { useState } from "react";
import { SideBar } from "../components/SideBar/SideBar";
import { TaskContainer } from "../components/TaskContainer/TaskContainer";
import useWindowDimensions from "../hooks/useWindowDimensions";

export function TodoPage() {
    const {height, width} = useWindowDimensions();
    const [isSideBarOpen, setIsSideBarOpen] = useState(height >= 700 && width >= 641 ? true : false);
    return (
        <div className="flex w-screen h-screen flex-row items-center bg-ctp-base justify-center text-ctp-text">
            <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen}/>
            <TaskContainer isSideBarOpen={isSideBarOpen}/>
        </div>
    )
}