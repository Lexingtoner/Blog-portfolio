'use client';

import React from 'react';

export const Metadata = () => {
    React.useEffect(() => {
        // Google Analytics (опционально)
        // const script = document.createElement('script');
        // script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID';
        // script.async = true;
        // document.head.appendChild(script);

        // Structured data for SEO
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Portfolio Owner',
            url: 'https://portfolio-blog.example.com',
            sameAs: [
                'https://github.com/username',
                'https://linkedin.com/in/username',
                'https://twitter.com/username',
            ],
            jobTitle: 'Full Stack Developer',
            email: 'contact@example.com',
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }, []);

    return null;
};
