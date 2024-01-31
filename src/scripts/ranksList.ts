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
        begin: 1500,
        step: 100,
        replaces: [
            's', 'silver',
            'срібло', 'с'
        ]
    },
    {
        name: 'Gold',
        begin: 2000,
        step: 100,
        replaces: [
            'g', 'gold',
            'золото', 'з'
        ]
    },
    {
        name: 'Platinum',
        begin: 2500,
        step: 100,
        replaces: [
            'pt', 'p', 'platinum',
            'платина', 'п'
        ]
    },
    {
        name: 'Diamond',
        begin: 3000,
        step: 100,
        replaces: [
            'd', 'diamond',
            'даймонд', 'д'
        ]
    },
    {
        name: 'Master',
        begin: 3500,
        step: 100,
        replaces: [
            'm', 'master',
            'майстр', 'м'
        ]
    },
    {
        name: 'Grand Master',
        begin: 4000,
        step: 100,
        replaces: [
            'gm', 'grand master',
            'ґранд майстр', 'ґм'
        ]
    }
];

export default ranks;