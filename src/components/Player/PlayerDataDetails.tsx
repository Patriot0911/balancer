import PlayerRolesContainer from "@/components/Player/PlayerRolesContainer";
import { IPlayer } from "@/types";

const PlayerDataDetails = ({ name, roles, }: IPlayer) => {
    return (
        <>
            <h2>{name}</h2>
            <PlayerRolesContainer // move component to sep file
                roles={roles}
            />
        </>
    );
};

export default PlayerDataDetails;
