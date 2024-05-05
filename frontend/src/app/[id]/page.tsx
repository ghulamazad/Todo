import { UpsertProject } from "@/components/project/upsertProject";
import { UpsertTodo } from "@/components/todo/upsertTodo";
import { ViewTodos } from "@/components/todo/viewTodos";
import { Separator } from "@/components/ui/separator";
import { getProject } from "@/services/project.service";
import { getTodos } from "@/services/todo.service";
import { redirect } from "next/navigation";

const ViewProject = async ({ params }: any) => {
  const { id } = params;

  const project: Project = await getProject(id);
  if (!project) {
    redirect("/");
  }
  const todos: Array<Todo> = await getTodos(project.id);
  console.log({ project });

  return (
    <div className='container mx-auto mt-10'>
      <div className='flex justify-between'>
        <div className='relative'>
          <UpsertProject title='Update Project' project={project}>
            <h1 className='text-3xl font-semibold mb-4 border border-gray-300 rounded px-2 py-1 cursor-text'>
              {project.title}
            </h1>
          </UpsertProject>
        </div>
        <UpsertTodo title='Add Todo' projectId={project.id} />
      </div>
      <Separator className='my-4' />
      <ViewTodos todos={todos} projectId={project.id} />
    </div>
  );
};

export default ViewProject;
