import { RoleImage } from "@/components/ui";
import { IPlayerRoleProps } from "@/types";

const PlayerRole = (props: IPlayerRoleProps) => {
  return (
    <span
      className={'rank-box'}
    >
      <RoleImage
        rolename={props.index}
      />
      {
        (props?.rankName || props?.rankValue) ?
          <>{props.rankName} [{props.rankValue}]</>
          :
          <>Not Given</>
      }
    </span>
  );
};

export default PlayerRole;