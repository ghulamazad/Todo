"use client";

import { restoredTodo } from "@/services/todo.service";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { RotateCcw, Trash } from "lucide-react";

export default function RestoredTodo({
  title,
  id,
}: {
  title: string;
  id: number;
}) {
  const onRestored = async (id: number) => {
    try {
      const res = restoredTodo(id);
    } catch (error) {
      toast({
        title: (error as Error).message,
      });
    }
  };
  return (
    <Button variant={"secondary"} onClick={() => onRestored(id)}>
      {title}
      <RotateCcw />
    </Button>
  );
}
