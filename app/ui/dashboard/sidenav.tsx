import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import VoteButton from '@/app/ui/drink_vote/vote-button';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-cyan-600 p-4 md:h-40">
                <h1 className="font-family:'Yu Gothic'; text-white text-2xl flex-1">飲料管理サイト</h1>
            </div>
            <div className="hidden h-auto w-full flex flex-col grow rounded-md bg-neutral-100 md:flex md:flex-col">
                <div className="flex-grow"><NavLinks /></div>
                <div className="mb-4"><VoteButton /></div>
                <form
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-neutral-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 active:bg-sky-50 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}

