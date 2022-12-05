import { useContext, useRef, useState } from "react";
import { TasklistContext } from "../../hooks/TasklistContext";
import { UserContext } from "../../hooks/UserContext";
import { supabase } from "../../supabaseClient";

export function TaskContainerHeaderSearchBar() {
  const { tasklist, setTasklist } = useContext(TasklistContext);
  const { user, setUser } = useContext(UserContext);
  const data = JSON.parse(user);
  const searchBarRef = useRef<any>();
  const [value, setValue] = useState("");

  //get all of the user's tasklists
  const getCurrentUserTasklists = async () => {
    let matchResult = "";

    await supabase
      .from("user")
      .select("tasklists")
      .eq("email", data.email)
      .then(({ data }) => {
        //@ts-ignore
        matchResult = data[0].tasklists;
      });

    return matchResult;
  };

  // get the current active tasklist data
  const getCurrentTasklistData = async () => {
    let totalTasklists = [];
    let matchingTasklist = {};

    await supabase
      .from("user")
      .select("tasklists")
      .eq("email", data.email)
      .then(({ data }) => {
        //@ts-ignore
        totalTasklists = data[0].tasklists;
        totalTasklists.map((tsklst: any) =>
          tsklst !== null && tsklst.name == tasklist
            ? (matchingTasklist = tsklst)
            : null
        );
      });

    return matchingTasklist;
  };

  const handleSearch = async () => {
    //TODO: find a task in the user's current active tasklist that 
    // has the same name as --value--
    console.log('searchinnnnnn')
    const currentTasklist:any = await getCurrentTasklistData();

    // loop through the current tasklist
    currentTasklist.tasks.map((tsk: any) => {
      console.log(tsk);
    })

  }

  const handleSearchBarKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    event.key === 'Enter' && handleSearch();
  }

  return (
    <input
      type="text"
      disabled
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
