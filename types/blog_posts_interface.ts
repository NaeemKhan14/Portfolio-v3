interface BlogPost {
    postID: string;
    title: string;
    short_desc: string;
    content: string;
    date: Date;
    category: string;
    images?: Array<string> | null;
}
