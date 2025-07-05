import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import type { DeleteBookModalProps, IApiError } from "@/types/types";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function DeleteBookModal({ bookId }: DeleteBookModalProps) {
    const navigate = useNavigate();
    const [deleteBook, { isLoading, isError, error }] = useDeleteBookMutation();

    useEffect(() => {
        if (isError && error) {
            const errMsg = (error as IApiError)?.data?.message || "Failed to add book";
            toast.error(errMsg);
        }
    }, [isError, error]);

    const handleDelete = async () => {
        const res = await deleteBook(bookId).unwrap();
        toast.success(res.message);
        navigate("/books");
    }
    return (
        <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
                <DialogTitle>Are You Sure You Want To Delete?</DialogTitle>
                <DialogDescription>
                    Once deleted, the data cannot be recovered.
                </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" disabled={isLoading}>
                        Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-500 text-white"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
}
