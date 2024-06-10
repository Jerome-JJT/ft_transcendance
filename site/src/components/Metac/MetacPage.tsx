import React, { useEffect } from "react";
import { UseGameDto } from "./dto/useGame.dto";
import PlayerCard from "./PlayerCard";
import { createPortal } from "react-dom";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import classNames from "classnames";

interface MetacPageProps {
  gamer: UseGameDto;
}

export default function MetacPage({ gamer }: MetacPageProps) {
  const rootEl = document.getElementById("around");
  const [effect, setEffect] = React.useState(false);

  const gridItems = Array.from({ length: 9 }, (_, index) => index + 1);
  console.log(gridItems);

  return (
    <div id="around" className="h-full px-3">
      {((gamer.myGame && gamer.amReady === false) || effect === true) &&
        rootEl !== null &&
        createPortal(
          <div
            className={classNames(
              "absolute top-2/4 left-2/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-100 p-4 text-center shadow-lg dark:bg-gray-700 dark:text-white sm:w-auto",
              { "animate-fadeOut opacity-0": effect },
              { "opacity-1 animate-fadeIn": !effect }
            )}
            onAnimationEnd={() => {
              setEffect(false);
            }}
          >
            <h2 className="text-2xl">How to play ?</h2>
            <ul className="inline-block text-left">
              <li>
                W and <FiArrowUp className="inline" />: Move to UP
              </li>
              <li>
                S and <FiArrowDown className="inline" />: Move to DOWN
              </li>
            </ul>
            <p className="pt-3">
              You have 3 powers, press to numbers to active it
            </p>
            <ul className="inline-block text-left">
              <li>1: Add a ball</li>
              <li>2: Paddle Dash</li>
              <li>3: Reduce paddle</li>
            </ul>
            <button
              type="button"
              className="mx-auto mt-3 block rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                setEffect(true);
                gamer.playGame(["ready"]);
              }}
            >
              Ready
            </button>
          </div>,
          rootEl
        )}
      <div
        id="playersCard"
        className="mx-auto grid max-w-[1200px] grid-cols-1 flex-col py-3 md:grid-cols-2"
      >
        <PlayerCard
          user={gamer.user1}
          status={gamer.user1?.status || ""}
          isRight={false}
        />
        <PlayerCard
          user={gamer.user2}
          status={gamer.user2?.status || ""}
          isRight={true}
        />
      </div>

      {gridItems.map((item) => (
          <div
            key={item}
            className="bg-blue-500 h-24 flex items-center justify-center"
          >
            {item}
          </div>
        ))}
      {gamer.gameId !== -1 && (
        <div className="mx-auto mt-3 px-4 py-2 text-center text-sm font-medium text-black">
          Game id : {gamer.gameId}
        </div>
      )}

      {gamer.myGame === true &&
        gamer.amReady === true &&
        gamer.gameArea.current?.started !== true && (
          <button
            type="button"
            className="mx-auto mt-3 flex rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              setEffect(false);
              gamer.playGame(["unready"]);
            }}
          >
            Show rules
          </button>
        )}
    </div>
  );
}
