import { ITeamInfo } from "@/types";
import Team from "@/components/Team";

interface ITeamGroupBlockProps {
    teamA?: ITeamInfo;
    teamB?: ITeamInfo;
    special?: string;
};

const TeamGroupBlock = ({ teamA, teamB, special, }: ITeamGroupBlockProps) => {
    return (
        <div
            className={'team-group'}
        >
            <Team
                name={'Team A'}
                teamInfo={teamA}
                key={`team-a-group-${special}`}
            />
            <h3>VS</h3>
            <Team
                name={`Team B`}
                teamInfo={teamB}
                key={`team-b-group-${special}`}
            />
        </div>
    );
};

export default TeamGroupBlock;
