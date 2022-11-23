import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TasklistContext } from "../../hooks/TasklistContext";
import { UserContext } from "../../hooks/UserContext";
import { Loading } from "../Loading/Loading";
import { CreateTaskInput } from "./CreateTaskInput";
import { Task } from "./Task";

export interface taskProps {
    description: string;
    createdAt: string;
    priority: boolean;
}

//'/tasks/:userEmail/:tasklist'
export function TaskContainer() {

    const { user, setUser } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const data = JSON.parse(user);

    const getTasks = async () => {
        setIsloading(true);
        //TODO: get all tasks from current tasklist
        setIsloading(false);
    }
    const { tasklist, setTasklist } = useContext(TasklistContext);

    useEffect(() => {
        getTasks();
    }, [tasklist]);

    return (
        <main className="flex flex-col w-3/4 h-screen items-center justify-between py-4">
            <h1 className="text-ctp-text text-4xl font-semibold mb-4">{tasklist}</h1>
            <Loading active={isLoading} />
            <div className="w-11/12 m-2 rounded-lg h-full flex p-2 flex-col gap-2 items-center overflow-y-scroll scrollbar border-2 border-ctp-overlay0">
                {
                    tasklist !== ''
                        ?
                        tasks.length !== 0
                            ?
                            tasks.map((task: taskProps, index) => (
                                <Task key={index} description={task.description} createdAt={task.createdAt} priority={task.priority} />

                            ))
                            :
                            <p>All tasks on this list have been completed!</p>
                        :
                        <p>Select a Tasklist and start creating tasks</p>
                }

            </div>

            <CreateTaskInput forceTaskUpdate={getTasks} />
        </main>
    )
}