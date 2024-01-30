import { IProdRankData, IRank, ISimpleRankData } from "@/types";

const ranks: IRank[] = [
    {
        name: 'Bronze',
        begin: 300,
        step: 300,
        replaces: [
            'br', 'bronze',
            'бронза', 'бр',
            'b'
        ]
    }
];

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
    const trimmedString = rawString.replace(/\s+/g, '');
    if(isNum(trimmedString)) {
        const rankValue = parseInt(trimmedString);
        const rankName = getRankNameByValue(rankValue);
        return {
            rankName,
            rankValue
        };
    }
    const rankData = getPossibleRankData(trimmedString);
    if(!rankData)
        return;
    const { value, str } = rankData;
    if(value < 1 || value > 5)
        return;
    const rank = ranks.find((item) => item.replaces.includes(str))
    if(!rank)
        return;
    const rankName = rank.name.concat(' ', value.toFixed());
    const rankValue = rank.begin + rank.step * (5-value);
    return {
        rankName,
        rankValue
    };
};
