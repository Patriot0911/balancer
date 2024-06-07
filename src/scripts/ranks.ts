import { IProdRankData, ISimpleRankData } from "@/types";
import ranks from "./ranksList";

const isNum = (str: string) => !isNaN(new Number(str).valueOf());

const getPossibleRankData = (rawString: string): ISimpleRankData | undefined => {
    const length = rawString.length;
    const firstChar = rawString[0];
    const lastChar = rawString[length-1];
    if(
        (isNum(firstChar) && isNum(lastChar))
        ||
        (!isNum(firstChar) && !isNum(lastChar))
    )
        return;
    if(isNum(lastChar))
        return {
            str: rawString.slice(0, length-1),
            value: parseInt(lastChar)
        };
    if(isNum(firstChar))
        return {
            str: rawString.slice(1, length),
            value: parseInt(firstChar)
        };
};

const getRankNameByValue = (value: number) => {
    const rankData = ranks.find(
        (item) => item.begin < value && (item.begin + item.step*5) >= value
    );
    if(!rankData)
        return value <= 300 ? 'Bronze' : 'Top 500';
    return rankData.name;
};

export const getRank = (rawString?: string): IProdRankData | undefined => {
    if(!rawString)
        return;
    const editedString = rawString.replace(/\s+/g, '').toLowerCase();
    if(isNum(editedString)) {
        const rankValue = parseInt(editedString);
        const rankName = getRankNameByValue(rankValue);
        return {
            rankName,
            rankValue
        };
    }
    const rankData = getPossibleRankData(editedString);
    if(!rankData)
        throw new Error('Cannot find such division (try br / silver / gm etc)');
    const { value, str } = rankData;
    if(value < 1 || value > 5)
        throw new Error('Cannot find such division tier (should be [1;5])');
    const rank = ranks.find((item) => item.replaces.includes(str))
    if(!rank)
        throw new Error('Cannot find such rank (try br 3 / silver 5 / gm 2 etc)');
    const rankName = rank.name.concat(' ', value.toFixed());
    const rankValue = rank.begin + rank.step * (5-value);
    return {
        rankName,
        rankValue
    };
};
