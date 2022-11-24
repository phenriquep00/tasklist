import * as Dialog from '@radix-ui/react-dialog';
import { Trash } from 'phosphor-react';

export function DeleteModalButton() {
    return (
        <Dialog.Trigger asChild>
            <button
                title='delete'
                className="flex gap-2 items-center justify-center border-2 border-ctp-overlay0 rounded-full p-1 hover:ring-2 ring-ctp-flamingo hover:bg-opacity-80"
            >
                <Trash size={16} weight="regular" color='#f38ba8'/>
            </button>
        </Dialog.Trigger>
    )
}