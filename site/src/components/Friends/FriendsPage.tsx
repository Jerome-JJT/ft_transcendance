import FriendsList from "./FriendsList";
import BannedList from "./BannedList";
import AddFriend from "./AddFriend";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import PendingList from "./PendingList";
import React from "react";

interface UserListPageProps {
  loginer: UseLoginDto;
  //   refreshUserInfos: Function;
}

export default function FriendsPage({ loginer }: UserListPageProps) {
  function doReload() {
    setReload((old) => !old);
  }

  const [reload, setReload] = React.useState(false);

  return (
    <div className=" mx-auto h-full max-w-md bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white md:h-max">
      <h1 className="pb-4 text-center text-3xl">Friends List</h1>
      <div className="flex flex-col px-4">
        <FriendsList loginer={loginer} doReload={doReload} />
        <PendingList loginer={loginer} doReload={doReload} />
        <BannedList loginer={loginer} doReload={doReload} />
        <AddFriend loginer={loginer} doReload={doReload} />
      </div>
    </div>
  );
}
