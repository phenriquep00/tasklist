import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useState } from 'react';
import { TasklistContext } from '../../../hooks/TasklistContext';
import { UserContext } from '../../../hooks/UserContext';
import { supabase } from '../../../supabaseClient';
import { TasklistMenuProps } from '../../TasklistMenu/TasklistMenu';
import { DeleteModalConfirmButton } from './DeleteModalConfirmButton';

interface DeleteModalProps extends TasklistMenuProps { 
    forceTaskUpdate: () => void;
}

export function DeleteModal({ type, task, forceTaskUpdate }: DeleteModalProps) {

    const { tasklist, setTasklist } = useContext(TasklistContext);
    const { user, setUser } = useContext(UserContext);
    const data = JSON.parse(user);

    const [isLoading, setIsloading] = useState(false);

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

    const rewriteTasklists = async (idOfTheTaskToBeDeleted: string | undefined) => {

        const userTotalTasklists: any = await getCurrentUserTasklists();
        const currentActiveTasklist: any = await getCurrentTasklistData();

        let ModifyedTasklistWithNewlyCreatedTask: any = []

        userTotalTasklists.map((tsklst: any) => {
            // find the tasklist that has the same name as the current tasklist
            if (tsklst.name === currentActiveTasklist.name) {
                tsklst.tasks.map((task: any, index: number) => {
                    if (task !== null) {
                        if (String(task.name + task.createdAt) == idOfTheTaskToBeDeleted) {
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

    const handleDeleteTasklist = async () => {

    };

    const handleDeleteTask = async () => {
        // rewrite the json releting the old task data
        setIsloading(true);

        const newUserTotalTasklists: any = await rewriteTasklists(task);
        await supabase
            .from('user')
            .update({ tasklists: newUserTotalTasklists })
            .eq('email', data.email)
            .then(() => {
                console.log('tasks updated')
            });
        setIsloading(false);
        forceTaskUpdate();
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-80' />
            <Dialog.Content className='flex flex-col items-center justify-between text-ctp-text bg-ctp-crust rounded-xl fixed top-1/2 left-1/2 w-1/3 h-1/3 p-4 translate-x-[-50%] translate-y-[-50%]'>
                <Dialog.Title className='text-2xl text-ctp-text font-bold'>
                    {
                        type === "tasklist"
                            ?
                            /* the modal was opened from a tasklist  */
                            <p>Delete tasklist {tasklist}?</p>
                            :
                            /* the modal was opened from a task */
                            <p>Delete this task?</p>
                    }
                </Dialog.Title>
                <Dialog.Description asChild>
                    {
                        type === "tasklist"
                            ?
                            /* the modal was opened from a tasklist  */
                            <div className='flex flex-col items-center justify-center gap-4'>
                                <span className='text-lg'>
                                    You are about to delete the tasklist <span className='text-ctp-sky font-bold'>{tasklist}</span> permanently
                                </span>

                                <DeleteModalConfirmButton isLoading={isLoading} handleClick={handleDeleteTasklist}/>
                            </div>
                            :
                            /* the modal was opened from a task */
                            <div className='flex flex-col items-center justify-center gap-4'>
                                <span className='text-lg'>
                                    You are about to delete a task permanently
                                </span>

                                <DeleteModalConfirmButton isLoading={isLoading} handleClick={handleDeleteTask}/>
                            </div>
                    }
                </Dialog.Description>
                <Dialog.Close asChild>
                    <button className='p-2 bg-ctp-red rounded font-medium text-ctp-crust hover:ring-2 ring-ctp-peach'>
                        close
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    )
}