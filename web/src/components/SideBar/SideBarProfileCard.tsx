import axios from "axios";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { IsValidHttpUrl } from "../../utils/isValidHttpUrl";
import { Loading } from "../Loading/Loading";
import userPic from "/user.png";

interface SideBarProfileCardProps {
  name: string;
  email: string;
}

export function SideBarProfileCard({ name, email }: SideBarProfileCardProps) {
  const [profilePic, setProfilePic] = useState("");
  const [isLoadingActive, setIsloadingActive] = useState(false);

  const getProfilePic = async () => {
    setIsloadingActive(true);
    //TODO: get pictureUrl from database
    await supabase
      .from("user")
      .select("pictureUrl")
      .eq("email", email)
      .then(({ data }) => {
        //@ts-ignore
        let profileUrlFromDb = data[0].pictureUrl;
        IsValidHttpUrl(profileUrlFromDb)
          ? setProfilePic(profileUrlFromDb)
          : setProfilePic(userPic);
      });

    setIsloadingActive(false);
  };

  useEffect(() => {
    getProfilePic();
  }, []);

  return (
    <>
      <div className="flex flex-row items-center md:gap-4 gap-2 w-11/12 h-[12vh] border-2 border-ctp-overlay0 rounded p-4">
        {isLoadingActive ? (
          <Loading active={isLoadingActive} />
        ) : (
          <img
            src={profilePic}
            alt="profile picture"
            className="rounded-full md:w-16 md:h-16 w-6 h-6 border-2 border-ctp-overlay0"
          />
        )}

        <div className="flex flex-col truncate">
          <p className="md:text-lg font-medium text-ctp-text ">{name}</p>
          <p className="md:text-sm text-[10px] font-light text-ctp-subtext0 ">
            {email}
          </p>
        </div>
      </div>
    </>
  );
}
