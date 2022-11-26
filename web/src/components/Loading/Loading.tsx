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
    <ReactLoading type={"spin"} color={"#ffffff"} height={40} width={40} />
  ) : active && type && size === undefined ? (
    <ReactLoading type={type} color={"#ffffff"} height={40} width={40} />
  ) : active && type && size ? (
    <ReactLoading type={type} color={"#ffffff"} height={size} width={size} />
  ) : null;
}
