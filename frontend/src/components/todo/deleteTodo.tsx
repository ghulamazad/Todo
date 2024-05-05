"use client";

import { deleteTodo } from "@/services/todo.service";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

type DeleteTodoProps = {
  projectId: number;
  id: number;
};

export const DeleteTodo: React.FC<DeleteTodoProps> = ({ projectId, id }) => {
  const onDeleteTodo = async (id: number, projectId: number) => {
    try {
      await deleteTodo(id, projectId);
      toast({
        title: "Todo successfully deleted.",
      });
    } catch (error: any) {
      toast({
        title: error.message,
      });
    }
  };
  return (
    <Button
      onClick={() => onDeleteTodo(id, projectId)}
      variant='destructive'
      className='mr-2'
    >
      <Trash />
    </Button>
  );
};
