export type Card = {
    id: number;
    author_id: number;
    is_public: boolean;
    content: {
        front: string;
        back: string;
    };
    type: string;
    image_source: string;
}
export type List = {
    id: number;
    author_id: number;
    is_public: boolean;
    title: string;
    description: string;
}