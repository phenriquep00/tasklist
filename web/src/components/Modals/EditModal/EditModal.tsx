import * as Dialog from '@radix-ui/react-dialog';

export function EditModal() {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-80' />
            <Dialog.Content className='flex flex-col items-center justify-between text-ctp-text bg-ctp-crust rounded-xl fixed top-1/2 left-1/2 w-1/2 h-1/2 p-4 translate-x-[-50%] translate-y-[-50%]'>
                <Dialog.Title> Edit task/tasklist </Dialog.Title>
                <Dialog.Description />
                <Dialog.Close />
            </Dialog.Content>
        </Dialog.Portal>
    )
}