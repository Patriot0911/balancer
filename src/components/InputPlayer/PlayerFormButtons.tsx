import ClassicButton from "../ui/ClassicButton/ClassicButton";

const PlayerFormButtons = () => {
    return (
        <>
            <ClassicButton
                type={'submit'}
                text={'ADD'}
            />
            <ClassicButton
                type={'reset'}
                text={'CLEAR'}
            />
        </>
    );
};

export default PlayerFormButtons;