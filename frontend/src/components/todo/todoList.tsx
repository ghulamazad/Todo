import { Pencil } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { DeleteTodo } from "./deleteTodo";
import { MarkCompleteTodo } from "./markCompleteTodo";
import { UpsertTodo } from "./upsertTodo";
import RestoredTodo from "./restoredTodo";

type TodoListProps = {
  title: string;
  projectId?: number;
  todos: Array<Todo>;
  isDisabled?: boolean;
  isDeleteBtn?: boolean;
  isRestoredBtn?: boolean;
  isUpdateBtn?: boolean;
};

export const TodoList: React.FC<TodoListProps> = ({
  title,
  projectId,
  todos,
  isDisabled,
  isDeleteBtn,
  isRestoredBtn,
  isUpdateBtn,
}) => {
  console.log(todos);

  return (
    todos.length > 0 && (
      <div>
        <h2 className="text-2xl font-semibol">{title}</h2>
        <ul className="divide-y divide-gray-200">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="py-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                {isDisabled && projectId && (
                  <MarkCompleteTodo
                    id={todo.id}
                    projectId={projectId}
                    isDisabled={isDisabled}
                  />
                )}
                <label
                  htmlFor={`${todo.id}`}
                  className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg"
                >
                  {todo.description}
                </label>
              </div>
              <div className="flex gap-1">
                {isUpdateBtn && projectId && (
                  <div>
                    <UpsertTodo
                      title="Update Todo"
                      projectId={projectId}
                      todo={todo}
                    >
                      <Button variant={"secondary"}>
                        <Pencil />
                      </Button>
                    </UpsertTodo>
                  </div>
                )}
                {isRestoredBtn && (
                  <div>
                    <RestoredTodo title="Restored Todo" id={todo.id} />
                  </div>
                )}
                {isDeleteBtn && (
                  <DeleteTodo projectId={projectId} id={todo.id} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
