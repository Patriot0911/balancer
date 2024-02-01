import { IRoleContainerProps, ITeamPlayerProps } from "@/types";
import Player from "../Player/Player";
import RoleImage from "../ui/RoleImage/RoleImage";

const TeamPlayer = ({ player, roleId }: ITeamPlayerProps) => {
    return (
        <div
            className={'team-player-container'}
        >
            <RoleContainer
                roleId={roleId}
            />
            {
                player ?
                <Player
                    {...player}
                /> :
                <div
                    className={'player-container'}
                />
            }
        </div>
    );
};

const RoleContainer = ({ roleId }: IRoleContainerProps) => {
    return (
        <div
            className={'role-continer'}
        >
            <RoleImage
                rolename={roleId}
            />
        </div>
    );
};

export default TeamPlayer;