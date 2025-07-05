import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { BookFormValues, IApiError } from "@/types/types";
import { useAddBookMutation } from "@/redux/api/baseApi";
import { useAppDispatch } from "@/redux/hooks";
import { closeAddBookModal } from "@/redux/features/modalState/modalState";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useEffect } from "react";



export default function AddBookModal() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const form = useForm<BookFormValues>();

    const copies = form.watch("copies");

    const [addBook, { data, isLoading, isError, error }] = useAddBookMutation();

    console.log({ data })

    useEffect(() => {
        if (isError && error) {
            const errMsg = (error as IApiError)?.data?.message || "Failed to add book";
            toast.error(errMsg);
        }
    }, [isError, error]);

    const onSubmit: SubmitHandler<BookFormValues> = async (data) => {
        if (data.copies === 0) {
            data.available = false;
        } else {
            data.available = true;
        }
        const res = await addBook(data).unwrap();
        toast.success(res.message);
        dispatch(closeAddBookModal());
        form.reset();
        navigate("/books");
    };

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle className="text-center">Add Book</DialogTitle>
                <DialogDescription className="text-center">
                    Fill out the form to add a new book.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Title" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Author */}
                    <FormField
                        control={form.control}
                        name="author"
                        rules={{ required: "Author is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Author Name" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ISBN */}
                    <FormField
                        control={form.control}
                        name="isbn"
                        rules={{ required: "ISBN is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ISBN</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter an ISBN Number" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Genre */}
                    <FormField
                        control={form.control}
                        name="genre"
                        rules={{ required: "Genre is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="">Genre</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Genre" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="FICTION">Fiction</SelectItem>
                                        <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                                        <SelectItem value="SCIENCE">Science</SelectItem>
                                        <SelectItem value="HISTORY">History</SelectItem>
                                        <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                                        <SelectItem value="FANTASY">Fantasy</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Book description..." {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Copies */}
                    <FormField
                        control={form.control}
                        name="copies"
                        rules={{
                            required: "Copies is required",
                            min: { value: 0, message: "Copies can not Be Negative" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Copies</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={0}
                                        placeholder="Enter Available Copies"
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Available */}
                    <FormField
                        control={form.control}
                        name="available"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                    <Checkbox
                                        className="ml-1"
                                        disabled={copies < 1}
                                        checked={copies > 0 ? true : field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-medium leading-none">
                                    Available
                                </FormLabel>

                            </FormItem>
                        )}
                    />

                    {/* Footer */}
                    <DialogFooter className="mt-2">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 bg-main hover:bg-purple-800 transition rounded-lg text-white font-semibold shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    <span>Adding...</span>
                                </>
                            ) : (
                                "Add Book"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
