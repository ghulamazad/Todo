import React from "react";
import { TodoList } from "./todoList";

type ViewTodoProps = {
  projectId: number;
  todos: Array<Todo>;
};

export const ViewTodos: React.FC<ViewTodoProps> = ({ projectId, todos }) => {
  return (
    <div className='container mx-auto'>
      {todos?.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-40'>
          <p className='text-gray-600 mb-2'>
            No todo found. Please create your first todo.
          </p>
        </div>
      ) : (
        <div>
          <TodoList
            title='Pending'
            todos={todos.filter((todo) => todo.status === "PENDING")}
            projectId={projectId}
          />
          <TodoList
            title='Completed'
            todos={todos.filter((todo) => todo.status === "COMPLETED")}
            projectId={projectId}
            isDisabled={true}
          />
        </div>
      )}
    </div>
  );
};
