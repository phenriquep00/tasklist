import * as Dialog from '@radix-ui/react-dialog';

export function SettingsModal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-80'/>
      <Dialog.Content className='flex flex-col items-center justify-between text-ctp-text bg-ctp-crust rounded-xl fixed top-1/2 left-1/2 w-auto h-auto gap-6 p-6 translate-x-[-50%] translate-y-[-50%]'>
        <Dialog.Title >
          <h1 className='text-xl font-bold'>
            Settings
          </h1>
        </Dialog.Title>   
        <Dialog.Description >
          <h1>
            In progress
          </h1>
        </Dialog.Description>
        <Dialog.Close >
          <button className='p-2 bg-ctp-red rounded font-medium text-ctp-crust hover:ring-2 ring-ctp-peach'>
            close
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}