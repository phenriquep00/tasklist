import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TasklistContext } from "../../hooks/TasklistContext";
import { UserContext } from "../../hooks/UserContext";
import { supabase } from "../../supabaseClient";
import { Loading } from "../Loading/Loading";
import { CreateTaskInput } from "./CreateTaskInput";
import { Task } from "./Task";

export interface TaskProps {
    name: string;
    createdAt: string;

}

export function TaskContainer() {

    const { user, setUser } = useContext(UserContext);
    const { tasklist, setTasklist } = useContext(TasklistContext);

    const [tasks, setTasks] = useState<any>([]);
    const [isLoading, setIsloading] = useState(false);
    const data = JSON.parse(user);

    const getCurrentTasklistData = async () => {

        let totalTasklists = []
        let matchingTasklist = {}
        
        await supabase
        .from('user')
        .select('tasklists')
        .eq('email', data.email)
        .then(({data}) => {
            //@ts-ignore
            totalTasklists = data[0].tasklists
            totalTasklists.map((tsklst: any) => (
                tsklst.name == tasklist ? matchingTasklist = tsklst.tasks : null
            ))
        });

        return matchingTasklist;
    }

    const getTasks = async () => {
        setIsloading(true);
        //TODO: get all tasks from current tasklist
        const currentTasklist = await getCurrentTasklistData();
        setTasks(currentTasklist);
        setIsloading(false);
    }

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
                            tasks.map((task: TaskProps, index: any) => (
                                <Task key={index} name={task.name} createdAt={task.createdAt} />

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