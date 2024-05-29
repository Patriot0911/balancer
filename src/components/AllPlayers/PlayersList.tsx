import { IPlayersListProps } from "@/types";
import Player from "../Player";

const PlayersList = ({ players }: IPlayersListProps) => {
  return (
    <div
      className={'players-list'}
    >
      {
        players.map(
          (player, index) =>
            <Player
              key={index}
              {...player}
            />
        )
      }
      <div
        className={'scrool-div'}
      />
    </div>
  );
};

export default PlayersList;
