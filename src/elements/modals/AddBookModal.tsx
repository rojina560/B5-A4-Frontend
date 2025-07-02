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
import type { IBook } from "@/types/types";
import { useAddBookMutation } from "@/redux/api/baseApi";
import { useAppDispatch } from "@/redux/hooks";

import { closeAddBookModal } from "@/redux/features/modalState/modalState";

type BookFormValues = Omit<IBook, "_id">;



export default function AddBookModal() {
    const dispatch = useAppDispatch();
    const form = useForm<BookFormValues>();

    const [addBook, { data, isLoading, isError, error }] = useAddBookMutation();

    console.log({ data, isLoading, isError, error })

    // console.log({ data, isLoading, isError, error })

    const onSubmit: SubmitHandler<BookFormValues> = async (data) => {

        console.log(data)
        const res = await addBook(data)

        console.log("Book added:", res);

        dispatch(closeAddBookModal());
        form.reset()

    };

    return (

        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader >
                <DialogTitle className="text-center">Add Book</DialogTitle>
                <DialogDescription className="text-center">Fill out the form to add a new book.</DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Title" {...field} value={field.value || ""} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Author */}
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Author Name" {...field} value={field.value || ""} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* ISBN */}
                    <FormField
                        control={form.control}
                        name="isbn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ISBN</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter an ISBN Number" {...field} value={field.value || ""} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Genre */}
                    <FormField
                        control={form.control}
                        name="genre"
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
                            </FormItem>
                        )}
                    />

                    {/* Copies */}
                    <FormField
                        control={form.control}
                        name="copies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Copies</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={0}
                                        placeholder="0"
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
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
                                        checked={field.value ?? false}
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
                        <Button className=" flex items-center gap-2  bg-main hover:bg-purple-800 transition rounded-lg text-white font-semibold shadow-lg">
                            Add Book
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
