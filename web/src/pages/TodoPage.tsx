import { SideBar } from "../components/SideBar/SideBar";
import { TaskContainer } from "../components/TaskContainer/TaskContainer";

export function TodoPage() {
    return (
        <div className="flex w-screen h-screen flex-row items-center bg-ctp-base justify-center text-ctp-text">
            <SideBar />
            <TaskContainer />
        </div>
    )
}