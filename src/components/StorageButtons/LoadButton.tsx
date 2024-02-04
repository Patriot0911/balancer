"use client";

import { addPlayer, clearAllPlayers } from "@/redux/features/all-players-slice";
import { useDispatch } from "react-redux";
import ClassicButton from "../ui/ClassicButton/ClassicButton";

const LoadButton = () => {
    const dispatch = useDispatch();
    const loadHandle = () => {
        const rawPlayers = localStorage.getItem('players');
        if(!rawPlayers)
            return;
        const players = JSON.parse(rawPlayers);
        dispatch(clearAllPlayers());
        for(const player of players) {
            dispatch(addPlayer(player));
        };
    };
    return <ClassicButton
        text={'Load'}
        onClick={loadHandle}
    />;
};

export default LoadButton;
