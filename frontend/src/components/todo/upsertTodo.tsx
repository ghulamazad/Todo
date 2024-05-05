"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createTodo } from "@/services/todo.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "../ui/use-toast";

type UpsertTodoProps = {
  title: string;
  projectId: number;
  todo?: Todo;
  children?: ReactNode;
};

const FormSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export function UpsertTodo({
  title,
  todo,
  projectId,
  children,
}: UpsertTodoProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: todo?.description ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let message: string;
    try {
      const newProject = await createTodo(
        projectId,
        data.description,
        todo?.id
      );
      message = newProject.message;
      setOpen((_) => false);
    } catch (error: any) {
      message = error.message;
    }
    toast({
      title: message,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? children : <Button>{title}</Button>}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[466px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Todo Description</FormLabel>
                  <FormControl>
                    <Input placeholder='Todo Description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full mt-2'>
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
