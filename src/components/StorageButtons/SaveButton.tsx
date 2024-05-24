"use client";

import { useAppSelector } from "@/redux/store";
import ClassicButton from "../ui/ClassicButton/ClassicButton";

const SaveButton = () => {
    const players = useAppSelector(state => state.allPlayersReducer.value);
    const saveHandle = () => {
        localStorage.setItem('players', JSON.stringify(players));
    };
    return <ClassicButton
        text={'Save'}
        onClick={saveHandle}
    />;
};

export default SaveButton;
