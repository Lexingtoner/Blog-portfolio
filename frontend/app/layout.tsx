import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
const MaybeClerkProvider = dynamic(() => import('../components/MaybeClerkProvider'), { ssr: false });
import './globals.css';

export const metadata: Metadata = {
    title: 'Portfolio Blog',
    description: 'Full-stack portfolio blog with interactive features',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MaybeClerkProvider>
            <html lang="ru">
                <body className="bg-gray-900 text-white">
                    {children}
                </body>
            </html> 
        </MaybeClerkProvider>
    );
}
