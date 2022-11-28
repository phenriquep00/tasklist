import * as Checkbox_ from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useContext, useRef, useState } from 'react';
import { TasklistContext } from '../../hooks/TasklistContext';
import { UserContext } from '../../hooks/UserContext';
import { supabase } from '../../supabaseClient';
import { Loading } from '../Loading/Loading';

interface CheckboxProps {
    taskId: string;
    forceTaskUpdate: () => void;
}

export function Checkbox({ taskId, forceTaskUpdate }: CheckboxProps) {

    const { tasklist, setTasklist } = useContext(TasklistContext);
    const { user, setUser } = useContext(UserContext);
    const data = JSON.parse(user);
    const [isLoading, setIsloading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

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
                    tsklst.name == tasklist ? matchingTasklist = tsklst : null
                ))
            });

        return matchingTasklist;
    };

    // rewrite the json adding the new task data
    const rewriteTasklists = async (idOfTheTaskToBeCompleted: string) => {

        const userTotalTasklists: any = await getCurrentUserTasklists();
        const currentActiveTasklist: any = await getCurrentTasklistData();

        let ModifyedTasklistWithNewlyCreatedTask: any = []

        userTotalTasklists.map((tsklst: any) => {
            // find the tasklist that has the same name as the current tasklist
            if (tsklst.name === currentActiveTasklist.name) {
                tsklst.tasks.map((task: any, index: number) => {
                    if (task !== null) {
                        if (String(task.name + task.createdAt) == idOfTheTaskToBeCompleted) {
                            console.log(tsklst.tasks[index])
                            delete tsklst.tasks[index]
                        };
                    }
                })

                ModifyedTasklistWithNewlyCreatedTask = tsklst;
            }
        });
        // console.log(ModifyedTasklistWithNewlyCreatedTask);

        // recreate the json
        const newTasklistsJson: any[] = [];
        userTotalTasklists.map((tsklst: any) => {
            if (tsklst.name === currentActiveTasklist.name) {
                newTasklistsJson.push(ModifyedTasklistWithNewlyCreatedTask);
            } else {
                newTasklistsJson.push(tsklst);
            }
        });

        return newTasklistsJson;

    };

    const handleCompleteTask = async () => {
        setIsloading(true);
        // new data to return
        const newUserTotalTasklists: any = await rewriteTasklists(taskId);
        console.log(newUserTotalTasklists);
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

    return (
        <Checkbox_.Root
            checked={isChecked}
            onCheckedChange={(checked) => {
                if (checked) {
                    setIsChecked(true);
                    handleCompleteTask();
                } else {
                    setIsChecked(false);
                }
            }}
            className='flex items-center justify-center bg-ctp-surface0 w-8 h-8 rounded-full hover:bg-ctp-surface1 hover:ring-2 ring-offset-1 ring-ctp-sky'
        >
            <Checkbox_.Indicator>
                {
                    isLoading
                        ?
                        <Loading active={isLoading} />
                        :
                        <Check size={24} color="#fff" weight='bold' />
                }
            </Checkbox_.Indicator>
        </Checkbox_.Root >
    )
}