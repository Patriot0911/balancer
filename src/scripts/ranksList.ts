import { IRank } from "@/types";

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
    },
    {
        name: 'Silver',
        begin: 300,
        step: 300,
        replaces: [
            's', 'silver',
            'срібло', 'с'
        ]
    },
    {
        name: 'Gold',
        begin: 300,
        step: 300,
        replaces: [
            'g', 'gold',
            'золото', 'з'
        ]
    },
    {
        name: 'Platinum',
        begin: 300,
        step: 300,
        replaces: [
            'pt', 'p', 'platinum',
            'платина', 'п'
        ]
    },
    {
        name: 'Diamond',
        begin: 300,
        step: 300,
        replaces: [
            'd', 'diamond',
            'даймонд', 'д'
        ]
    },
    {
        name: 'Master',
        begin: 300,
        step: 300,
        replaces: [
            'm', 'master',
            'майстр', 'м'
        ]
    },
    {
        name: 'Grand Master',
        begin: 300,
        step: 300,
        replaces: [
            'gm', 'grand master',
            'ґранд майстр', 'ґм'
        ]
    }
];

export default ranks;