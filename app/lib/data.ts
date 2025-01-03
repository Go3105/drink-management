import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  User,
  Vote,
  Drink,
  DrinkID,
  DrinkResult,
  DrinkName,
} from './definitions';
import { formatCurrency } from './utils';

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

//追加↓
export async function fetchUser_vote() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    const data = await sql<User>`SELECT * FROM users`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch User Vote data.');
  }
}

//追加↓
export async function fetchUserByEmail(email: string): Promise<User | null> {
  // Add noStore() here to prevent the response from being cached
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    const data =
      await sql<User>`SELECT * FROM users WHERE users.email =${email}`;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch User Vote data.');
  }
}

export async function fetchDrink() {
  noStore();
  try {
    const data = await sql<Drink>`SELECT * FROM drink ORDER BY drink.id ASC`;
    console.log(data);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch drink data.');
  }
}

export async function fetchSelectDrink(email: string, date: string) {
  noStore();
  try {
    const data =
      await sql<DrinkID>`SELECT vote.drink FROM vote WHERE vote.voter =${email} AND vote.date = ${date}`;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch User Vote data.');
  }
}

export async function fetchDrinkNameByID(id: string) {
  noStore();
  try {
    const data =
      await sql`SELECT drink.japanesename FROM drink WHERE drink.id =${id}`;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch User Vote data.');
  }
}

export async function fetchDrinkNum(): Promise<number> {
  noStore();
  try {
    const data = await sql`SELECT COUNT(*) FROM drink`;

    return data.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch drink data.');
  }
}

//あるidの飲料が存在していたらtrueを返す
export async function fetchDrinkExist(id: string): Promise<boolean> {
  noStore();
  try {
    const data = await sql`SELECT COUNT(*) FROM drink WHERE id = ${id}`;
    if (data.rows[0].count == 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the exist of the drink.');
  }
}

//指定した日にちに指定したユーザが投票していたらtrueを返す
export async function VoteExist(email: string, date: string): Promise<boolean> {
  noStore();
  try {
    const data =
      await sql`SELECT COUNT(*) FROM vote WHERE voter = ${email} AND date = ${date}`;
    if (data.rows[0].count == 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the exist of vote data.');
  }
}

export async function fetchVote() {
  noStore();
  try {
    const data = await sql<Vote>`SELECT * FROM vote`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch vote data.');
  }
}

const ITEMS_PER_PAGE = 12;
export async function fetchDrinkPages(select: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM drink
    WHERE
      drink.id ILIKE ${`%${select}%`} OR
      drink.name ILIKE ${`%${select}%`} OR
      drink.japanesename ILIKE ${`%${select}%`} OR
      drink.price::text ILIKE ${`%${select}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchFilteredDrink(search: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<Drink>`
      SELECT * FROM drink
      WHERE
      drink.id ILIKE ${`%${search}%`} OR
      drink.name ILIKE ${`%${search}%`} OR
      drink.japanesename ILIKE ${`%${search}%`} OR
      drink.price::text ILIKE ${`%${search}%`}
      ORDER BY drink.voted DESC, drink.totalvoted DESC, drink.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchTwoteeksResult() {
  noStore();
  try {
    const result = await sql`SELECT SUM(drink.voted) AS sum FROM drink`;
    const value = Math.floor(1500 / result.rows[0].sum) || 0;
    const result2 =
      await sql`SELECT SUM(drink.voted) AS sum FROM drink WHERE ${value} * drink.voted > 150`;
    const value2 = Math.floor(1500 / result2.rows[0].sum) || 0;
    const result3 =
      await sql<DrinkResult>`SELECT drink.name, drink.japanesename, (${value2} * drink.voted) AS price drink.path FROM drink WHERE ${value} * drink.voted > 150`;
    return result3.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch two weeks result.');
  }
}

export async function fetchLatestResult() {
  noStore();
  try {
    // 今日の日付を取得
    const today = new Date();

    // 2週間前の日付を計算
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(today.getDate() - 14);

    // 日付を文字列としてフォーマット（例：'YYYY-MM-DD'）
    const todayStr = today.toISOString().split('T')[0]; // 今日のYYYY-MM-DD形式
    const twoWeeksAgoStr = twoWeeksAgo.toISOString().split('T')[0]; // 2週間前のYYYY-MM-DD形式

    // 今日から2週間以内の日付を取得
    // const latestdate =
    //     await sql`SELECT result.date AS resultdate
    //               FROM result
    //               WHERE result.date >= ${twoWeeksAgoStr}
    //               AND result.date <= ${todayStr}
    //               ORDER BY result.date DESC
    //               LIMIT 1`;
    // 今日から2週間以内の日付を取得
    const latestdate = await sql`SELECT result.date AS resultdate 
                  FROM result 

                  ORDER BY result.date DESC 
                  LIMIT 1`;

    if (latestdate.rows.length > 0) {
      const latestdatestr = latestdate.rows[0].resultdate.toString();
      const drinklist =
        await sql<DrinkResult>`SELECT result.name, result.japanesename, result.price, result.path
                              FROM result 
                              WHERE result.date = ${latestdatestr}`;
      return drinklist.rows;
    } else {
      // 該当するデータがない場合の処理
      console.log('No data found within the last 2 weeks.');
      return [];
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch result data');
  }
}
