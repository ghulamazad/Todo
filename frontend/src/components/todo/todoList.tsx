import { Pencil } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { DeleteTodo } from "./deleteTodo";
import { MarkCompleteTodo } from "./markCompleteTodo";
import { UpsertTodo } from "./upsertTodo";

type TodoListProps = {
  title: string;
  projectId: number;
  todos: Array<Todo>;
  isDisabled?: boolean;
};

export const TodoList: React.FC<TodoListProps> = ({
  title,
  projectId,
  todos,
  isDisabled,
}) => {
  return (
    todos.length > 0 && (
      <div>
        <h2 className='text-2xl font-semibol'>{title}</h2>
        <ul className='divide-y divide-gray-200'>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className='py-4 flex items-center justify-between'
            >
              <div className='flex items-center space-x-2'>
                <MarkCompleteTodo
                  id={todo.id}
                  projectId={projectId}
                  isDisabled={isDisabled}
                />
                <label
                  htmlFor={`${todo.id}`}
                  className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg'
                >
                  {todo.description}
                </label>
              </div>
              {!isDisabled && (
                <div>
                  <DeleteTodo projectId={projectId} id={todo.id} />

                  <UpsertTodo
                    title='Update Todo'
                    projectId={projectId}
                    todo={todo}
                  >
                    <Button variant={"secondary"}>
                      <Pencil />
                    </Button>
                  </UpsertTodo>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
