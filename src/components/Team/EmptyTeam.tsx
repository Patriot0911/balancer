import TeamPlayer from "./TeamPlayer";

const EmptyTeam = () => {
    return (
        <>
            {
                [...new Array(5)].map(
                (_, index) =>
                    <TeamPlayer
                        roleId={Math.round(index/2)}
                        key={index}
                    />
                )
            }
        </>
    );
};

export default EmptyTeam;
