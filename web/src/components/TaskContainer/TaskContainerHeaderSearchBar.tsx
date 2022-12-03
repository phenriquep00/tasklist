import { useRef, useState } from "react";

export function TaskContainerHeaderSearchBar() {
  const searchBarRef = useRef<any>();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    console.log('searchinnnnnn')
  }

  const handleSearchBarKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    event.key === 'Enter' && handleSearch();
  }

  return (
    <input
      type="text"
      name=""
      className="bg-ctp-surface2 flex flex-1 p-2 md:min-w-[400px] rounded hover:cursor-not-allowed truncate"
      id=""
      placeholder="search for a task [comming soon]"
      ref={searchBarRef}
      onChange={(text)=> setValue(text.currentTarget.value)}
      onKeyDown={handleSearchBarKeyDown}
    />
  );
}
