import ReactLoading from "react-loading";

interface LoadingProps {
    active: boolean;
}

export function Loading({ active }: LoadingProps) {
    return (
        active ? <ReactLoading type={"spin"} color={"#ffffff"} height={40} width={40}/> : null 
    )
}