import { TodoList } from "@/components/todo/todoList";
import { Button } from "@/components/ui/button";
import { recycleBinTodo } from "@/services/todo.service";
import Link from "next/link";

export default async function RecycleBin() {
  const todos = await recycleBinTodo();
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between">
          <h2>Recycle bin</h2>
          <Link href={"/"}>
            <Button variant={"secondary"}>Back</Button>
          </Link>
        </div>
        {todos?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40">
            <p className="text-gray-600 mb-2">
              No todo found. Please create your first todo.
            </p>
          </div>
        ) : (
          <div>
            <TodoList
              title="Recycle Bin"
              todos={todos}
              isDisabled={true}
              isDeleteBtn={true}
              isRestoredBtn={true}
            />
          </div>
        )}
      </div>
    </>
  );
}
