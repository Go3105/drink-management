'use client'

import { DrinkResult } from "@/app/lib/definitions"

export default function ShowResult({ results }: { results: DrinkResult[] }) {
    const messages = results.map(result => `${result.name}を${result.price}円分購入します`);
    alert(messages);
    return (
        <div>
            <p>{messages}</p>
        </div>
    )
}