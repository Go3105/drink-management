import { lusitana } from '@/app/ui/fonts';
import Drink from '@/app/ui/drink_vote/page';
import { Vote } from '@/app/ui/drink_vote/page';


export default async function Page() {


    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                飲料投票ページ
            </h1>
            <div className="justify-start p-4 md:h-40">
                <Drink />
                {/* <Vote /> */}
            </div>
        </main>
    );
}