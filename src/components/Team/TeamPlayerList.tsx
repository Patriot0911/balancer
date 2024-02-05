import { ITeamPlayerListProps } from "@/types";
import TeamPlayer from "./TeamPlayer";

const TeamPlayerList = ({ teamInfo }: ITeamPlayerListProps) => {
    return (
        <>
            {
                Object.entries(teamInfo).map(
                    (item, itemIndex) =>
                    Array.isArray(item[1]) &&
                    item[1].map((player, index) =>
                        <TeamPlayer
                            roleId={itemIndex}
                            player={player}
                            key={`${item[0]}-${index}`}
                        />
                    )
                )
            }
        </>
    );
};

export default TeamPlayerList;
