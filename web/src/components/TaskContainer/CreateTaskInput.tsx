import { useContext, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { TasklistContext } from '../../hooks/TasklistContext';
import { UserContext } from '../../hooks/UserContext';
import { supabase } from '../../supabaseClient';
import { Loading } from '../Loading/Loading';

interface CreateTaskInputProps {
    forceTaskUpdate: () => void;
}

export function CreateTaskInput({ forceTaskUpdate }: CreateTaskInputProps) {

    const { tasklist, setTasklist } = useContext(TasklistContext);
    const { user, setUser } = useContext(UserContext);
    const data = JSON.parse(user);

    const [value, setValue] = useState('');
    const [isLoading, setIsloading] = useState(false);

    const reference = useRef<any>();

    useHotkeys('shift+space', () => {
        reference.current.focus();
    });

    //get all of the user's tasklists
    const getCurrentUserTasklists = async () => {

        let matchResult = ''

        await supabase
            .from('user')
            .select('tasklists')
            .eq('email', data.email)
            .then(({ data }) => {
                //@ts-ignore
                matchResult = data[0].tasklists;
            });

        return matchResult;
    };

    // get the current active tasklist data
    const getCurrentTasklistData = async () => {

        let totalTasklists = []
        let matchingTasklist = {}

        await supabase
            .from('user')
            .select('tasklists')
            .eq('email', data.email)
            .then(({ data }) => {
                //@ts-ignore
                totalTasklists = data[0].tasklists
                totalTasklists.map((tsklst: any) => (
                    tsklst !== null &&
                        tsklst.name == tasklist ? matchingTasklist = tsklst : null
                ))
            });

        return matchingTasklist;
    };

    // rewrite the json adding the new task data
    const rewriteTasklists = async (nameOfTheNewTask: string) => {

        const userTotalTasklists: any = await getCurrentUserTasklists();
        const currentActiveTasklist: any = await getCurrentTasklistData();

        let ModifyedTasklistWithNewlyCreatedTask: any = []

        userTotalTasklists.map((tsklst: any) => {
            // find the tasklist that has the same name as the current tasklist
            if (tsklst !== null) {
                if (tsklst.name === currentActiveTasklist.name) {
                    // if it is the same tasklist, append the new task to the end of it
                    tsklst.tasks.push(
                        {
                            name: nameOfTheNewTask,
                            createdAt: new Date(),
                            completed: false,
                        }
                    )

                    ModifyedTasklistWithNewlyCreatedTask = tsklst;
                }
            }


        });
        // console.log(ModifyedTasklistWithNewlyCreatedTask);

        // recreate the json
        const newTasklistsJson: any[] = [];
        userTotalTasklists.map((tsklst: any) => {
            if (tsklst !== null) {
                if (tsklst.name === currentActiveTasklist.name) {
                    newTasklistsJson.push(ModifyedTasklistWithNewlyCreatedTask);
                } else {
                    newTasklistsJson.push(tsklst);
                }
            }

        });

        return newTasklistsJson;

    };

    const handleCreateNewTask = async () => {
        setIsloading(true);
        // new data to return
        const newUserTotalTasklists: any = await rewriteTasklists(value);
        // console.log(newUserTotalTasklists);
        //post new task
        await supabase
            .from('user')
            .update({ tasklists: newUserTotalTasklists })
            .eq('email', data.email)
            .then(() => {
                console.log('tasks updated')
            })
        setIsloading(false);
        forceTaskUpdate();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            handleCreateNewTask();
        }
    };

    return (
        <>
            {
                isLoading
                    ?
                    <div className="flex flex-row items-center justify-center w-11/12 h-16 px-6 rounded-md border-4 border-ctp-mauve ring-ctp-sky ring-offset-ctp-lavender">
                        <Loading active={isLoading} type="cylon"/>
                    </div>
                    :
                    (
                        tasklist !== undefined && tasklist !== ''
                            ?
                            <input
                                ref={reference}
                                className="flex flex-row items-center bg-ctp-lavender w-11/12 h-16 placeholder-ctp-overlay0 px-6 py-4 rounded-md border-4 border-ctp-mauve text-ctp-crust text-lg font-bold ring-ctp-sky ring-offset-ctp-lavender"
                                onChange={(text) => setValue(text.target.value)}
                                onKeyDown={handleKeyDown}
                                type="text"
                                name=""
                                id=""
                                placeholder="Create a task [shift + space]"
                            />
                            :
                            <div className="flex flex-row items-center justify-center w-11/12 h-16 px-6 rounded-md border-4 border-ctp-mauve text-lg font-bold ring-ctp-sky ring-offset-ctp-lavender text-ctp-text">
                                <p>Select a tasklist</p>
                            </div>
                    )
            }
        </>
    )
}