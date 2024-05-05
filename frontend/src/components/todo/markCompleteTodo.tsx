"use client";

import { markAsCompleteTodo } from "@/services/todo.service";
import { Checkbox } from "../ui/checkbox";
import { toast } from "../ui/use-toast";

type MarkCompleteTodoProps = {
  projectId: number;
  id: number;
  isDisabled?: boolean;
};

export const MarkCompleteTodo: React.FC<MarkCompleteTodoProps> = ({
  projectId,
  id,
  isDisabled,
}) => {
  const onCheckedChangeTodo = async (
    value: boolean,
    id: number,
    projectId: number
  ) => {
    try {
      if (!value) return;
      await markAsCompleteTodo(id, projectId);
      toast({
        title: "Todo completed",
      });
    } catch (error: any) {
      toast({
        title: error.message,
      });
    }
  };
  return (
    <Checkbox
      id={`${id}`}
      disabled={isDisabled}
      onCheckedChange={(value: boolean) =>
        onCheckedChangeTodo(value, id, projectId)
      }
    />
  );
};
