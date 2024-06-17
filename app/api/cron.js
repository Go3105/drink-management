// import { DrinkVoted } from '../../lib/definitions';
// import { fetchDrink } from '../../lib/data';
// import { fetchTwoteeksResult, addVoteEveryTwoWeeks, deleteVoteEveryTwoWeeks } from './route';

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { DrinkVoted } from '../lib/definitions';

export async function fetchTwoteeksResult() {
    noStore();
    try {
        const data = await sql < DrinkVoted > `SELECT SUM(drink.voted) FROM drink`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch two weeks result.');
    }
}


export async function addVoteEveryTwoWeeks() {
    try {
        await sql`
            UPDATE drink
            SET totalvoted = totalvoted + voted
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to add vote every two weeks' };
    }
}

export async function deleteVoteEveryTwoWeeks() {
    try {
        await sql`
            UPDATE drink
            SET voted = 0
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to delete vote every two weeks' };
    }
}


export default async function EveryTwoWeeks() {
    const VotedList = await fetchTwoteeksResult();
    await addVoteEveryTwoWeeks(); // votedの中身をtotalvotedに追加
    await deleteVoteEveryTwoWeeks(); // votedの中身を削除
}