export type BlogSection =
    | { type: 'text'; title?: string; paragraphs: string[] }
    | { type: 'text_html'; title?: string; paragraphsHtml: string[] }
    | { type: 'code'; code: string }
    | { type: 'commands'; command: string }
    | { type: 'list'; title?: string; description?: string; items: string[] }
    | { type: 'closing'; title?: string; paragraphs: string[] }
    | { type: 'separator' };

export interface Blog {
    title: string;
    slug: string;
    series: string;
    date: string;
    excerpt: string;
    eyebrow: string;
    subtitle: string;
    meta: string[];
    sections: BlogSection[];
}
