'use client'

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: '飲料投票ページ', href: '/dashboard', icon: CheckCircleIcon },
    /*{
        name: 'Invoices',
        href: '/dashboard/invoices',
        icon: DocumentDuplicateIcon,
    },
    { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },*/
];

export default function NavLinks() {
    const pathname = usePathname();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // APIエンドポイントにリクエストを送る
        fetch('/api/cron/route') // 実際のエンドポイントに置き換えてください
            .then(response => response.json())
            .then(data => {
                if (data.text) {
                    setMessages(data.text); // messagesを状態に保存
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
            <div>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </div>
        </>
    );
}
