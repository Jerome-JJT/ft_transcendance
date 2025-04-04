import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./components/Home/HomePage";
import LogPage from "./components/Log/LogPage";

import NavBar from "./components/NavBar/NavBar";
import ChatIcon from "./components/Chat/ChatIcon";

import LoginApi from "./components/Log/LoginApi";
import Logout from "./components/Log/Logout";

import SettingsPage from "./components/Settings/SettingsPage";
import { UseLoginDto } from "./components/Log/dto/useLogin.dto";
import useLogin from "./components/Log/useLogin";
import PlayersPage from "./components/Players/PlayersPage";
import ChatMenu from "./components/Chat/ChatMenu";
import GamePage from "./components/Game/GamePage";
import TfaCodePage from "./components/Log/TfaCodePage";
import CreateAccountPage from "./components/Log/CreateAccountPage";
import ChannelsPage from "./components/Channels/ChannelsPage";
import FriendsPage from "./components/Friends/FriendsPage";
import CreateChannelPage from "./components/CreateChannel/CreateChannelPage";
import PublicProfilePage from "./components/PublicProfile/PublicProfilePage";
import { UseChatDto } from "./components/Chat/dto/useChat.dto";
import { UseGameDto } from "./components/Game/dto/useGame.dto";
import useChat from "./components/Chat/useChat";
import useGame from "./components/Game/useGame";
import StartGamePage from "./components/Game/Start/StartGamePage";

import Colorer from "./assets/Colorer";

declare global {
  var colorTheme: string;
}

export default function App() {
  const loginer: UseLoginDto = useLogin();
  const [openedMenu, setOpenedMenu] = React.useState("");

  let chats: UseChatDto = useChat({
    logged: loginer.logged,
    token: loginer.token,
  });
  let gamer: UseGameDto = useGame({
    loginer: loginer,
  });

  globalThis.colorTheme = Colorer(loginer.userInfos?.login_name);

  return (
    <Router>
      <NavBar
        loginer={loginer}
        gamer={gamer}
        openedMenu={openedMenu}
        setOpenedMenu={setOpenedMenu}
      />

      <div className="grow bg-gray-100 dark:bg-gray-400">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {!loginer.logged && (
            <>
              <Route path="/start" element={<p></p>} />
              <Route path="/players/:id" element={<p></p>} />
              <Route path="/friends" element={<p></p>} />
              <Route path="/channels" element={<p></p>} />
              <Route path="/players" element={<p></p>} />
              <Route path="/channels/new" element={<p></p>} />
              <Route path="/settings" element={<p></p>} />
              <Route path="/game" element={<p></p>} />
            </>
          )}
          {loginer.logged && (
            <>
              <Route
                path="/start"
                element={<StartGamePage loginer={loginer} gamer={gamer} />}
              />
              <Route
                path="/players/:id"
                element={<PublicProfilePage loginer={loginer} chats={chats} />}
              />
              <Route
                path="/friends"
                element={
                  <FriendsPage loginer={loginer} chats={chats} gamer={gamer} />
                }
              />
              <Route
                path="/channels"
                element={<ChannelsPage loginer={loginer} chats={chats} />}
              />
              <Route
                path="/players"
                element={<PlayersPage loginer={loginer} chats={chats} />}
              />
              <Route
                path="/channels/new"
                element={<CreateChannelPage loginer={loginer} />}
              />
              <Route
                path="/settings"
                element={<SettingsPage loginer={loginer} />}
              />
              <Route path="/game" element={<GamePage gamer={gamer} />} />
            </>
          )}
          <Route path="/login" element={<LogPage loginer={loginer} />} />
          <Route path="/loginapi" element={<LoginApi loginer={loginer} />} />
          <Route
            path="/login_tfa"
            element={<TfaCodePage loginer={loginer} />}
          />
          <Route
            path="/logout"
            element={<Logout loginer={loginer} chats={chats} gamer={gamer} />}
          />

          {/* {process.env.BUILD_TYPE !== "Production" && ( */}
            <>
              <Route path="/createaccount" element={<CreateAccountPage />} />
            </>
          {/* )} */}
        </Routes>
      </div>

      <ChatIcon
        openedMenu={openedMenu}
        setOpenedMenu={setOpenedMenu}
        chats={chats}
      />

      <ChatMenu
        openedMenu={openedMenu}
        setOpenedMenu={setOpenedMenu}
        loginer={loginer}
        chats={chats}
        gamer={gamer}
      />
    </Router>
  );
}
