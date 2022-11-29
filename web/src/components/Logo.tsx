import { ListChecks } from "phosphor-react";

export function Logo() {
  return (
    <span className="flex flex-row text-ctp-text transition-colors duration-1000 ease-in-out">
      <ListChecks weight="bold" size={50} color="#cdd6f4" />
      <div className="flex flex-row">
        <h1 className={`text-[30px] font-bold`}>TODO</h1>
        <h2 className={`text-[30px] font-thin`}>App</h2>
      </div>
    </span>
  );
}
