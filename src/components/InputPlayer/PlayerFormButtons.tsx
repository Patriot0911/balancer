import { ClassicButton } from "@/components/ui";

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