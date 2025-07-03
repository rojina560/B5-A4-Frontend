import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    DialogContent, DialogFooter, DialogHeader,
    DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useBorrowBookMutation } from '@/redux/api/baseApi';
import type { BorrowFormValues, IApiError, IBookCardProps } from '@/types/types';
import { DialogClose } from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';



export default function BorrowModal({ book }: IBookCardProps) {
    const navigate = useNavigate();
    const form = useForm<BorrowFormValues>({
        defaultValues: {
            quantity: 1,
            dueDate: undefined,
        },
    });

    const [borrowBook, { isLoading, isError, error }] = useBorrowBookMutation();

    useEffect(() => {
        if (isError && error) {
            const errMsg = (error as IApiError)?.data?.message || "Failed to borrow book";
            toast.error(errMsg);
        }
    }, [isError, error]);

    const onSubmit: SubmitHandler<BorrowFormValues> = async (data) => {
        if (data.quantity > book.copies) {
            toast.error(`Only ${book.copies} copies available`);
            return;
        }

        const payload = {
            book: book._id,
            quantity: data.quantity,
            dueDate: data.dueDate,
        };

        console.log(payload)

        const res = await borrowBook(payload).unwrap();

        toast.success(res.message || "Book borrowed successfully");
        form.reset();
        navigate('/borrow-summary');
    };

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle className="text-center uppercase"><span className='text-main'>Book Name:</span> {book.title}</DialogTitle>
                <DialogDescription className="text-center">
                    Fill out the form to borrow this book.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    {/* Quantity Field */}
                    <FormField
                        control={form.control}
                        name="quantity"
                        rules={{
                            required: "Quantity is required",
                            min: { value: 1, message: "At least 1 book" },
                            max: { value: book.copies, message: `Only ${book.copies} Book Available` },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input type="number"
                                        min={1}
                                        {...field}
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(Number(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Due Date Field */}
                    <FormField
                        control={form.control}
                        name="dueDate"
                        rules={{ required: "Please Select a Return Date" }}
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Pick A Date Of Return</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "pl-3 text-left font-normal w-full",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            captionLayout="dropdown"
                                            classNames={{
                                                day_selected: "bg-[#471396] text-white hover:bg-[#471396]",
                                                day_today: "text-red-500",
                                                day: "rounded-full"
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Footer */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
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
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    <span>Borrowing...</span>
                                </>
                            ) : (
                                "Borrow"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
