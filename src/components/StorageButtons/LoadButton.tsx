"use client";

import { addPlayer, clearAllPlayers } from "@/redux/features/all-players-slice";
import { useDispatch } from "react-redux";
import ClassicButton from "../ui/ClassicButton";
import { IPlayer } from "@/types";

const LoadButton = () => {
  const dispatch = useDispatch();
  const loadHandle = () => {
    const rawPlayers = localStorage.getItem('players');
    if (!rawPlayers)
      return;
    const players = JSON.parse(rawPlayers);
    dispatch(clearAllPlayers());
    for (const player of players) {
      const playerInfo: IPlayer = {
        name: player.name,
        roles: {
          tank: player.roles.tank,
          damage: player.roles.damage,
          support: player.roles.support
        }
      };
      dispatch(
        addPlayer(playerInfo)
      );
    };
  };
  return <ClassicButton
    text={'Load'}
    onClick={loadHandle}
  />;
};

export default LoadButton;
