export interface IBook {
    _id: string;
    title: string;
    author: string;
    genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
    isbn: string;
    description?: string;
    copies: number;
    available?: boolean;
}



export interface IApiError {
    status?: number;
    data?: {
        success?: boolean;
        message?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error?: any;
    };
}


export interface IModalState {
    isAddBookModalOpen: boolean;
}

export type BookFormValues = Omit<IBook, "_id">;

export type DeleteBookModalProps = {
    bookId: string;
};

export interface IBookCardProps {
    book: IBook;
}