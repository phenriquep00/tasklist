import ReactLoading from "react-loading";

interface LoadingProps {
  active: boolean;
  type?:
    | "balls"
    | "bars"
    | "blank"
    | "bubbles"
    | "cubes"
    | "spin"
    | "cylon"
    | "spinningBubbles"
    | "spokes";
  size?: number;
}

export function Loading({ active, type, size }: LoadingProps) {
  return active && type === undefined && size === undefined ? (
    <ReactLoading type={"spin"} color={"#939ab7"} height={40} width={40} />
  ) : active && type && size === undefined ? (
    <ReactLoading type={type} color={"#939ab7"} height={40} width={40} />
  ) : active && type && size ? (
    <ReactLoading type={type} color={"#939ab7"} height={size} width={size} />
  ) : null;
}
