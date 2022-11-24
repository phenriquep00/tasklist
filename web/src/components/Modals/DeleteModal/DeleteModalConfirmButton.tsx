import { Loading } from "../../Loading/Loading"

interface DeleteModalConfirmButtonProps {
    isLoading: boolean,
    handleClick: () => void | void
}

export function DeleteModalConfirmButton({isLoading, handleClick}: DeleteModalConfirmButtonProps) {
    return (
        <button
            onClick={handleClick}
            className='flex flex-1 bg-ctp-peach rounded font-bold p-4 text-ctp-crust hover:ring-2 ring-ctp-peach'
        >   
        {
            isLoading ?
            <Loading active={isLoading}/>
            :
            <p>
               CONFIRM 
            </p>
        }
            
        </button>
    )
}