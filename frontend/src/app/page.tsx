import { UpsertProject } from "@/components/project/upsertProject";
import { ViewProjects } from "@/components/project/viewProjects";
import { RecycleBin } from "@/components/todo/recycleBin";
import { getProjects } from "@/services/project.service";
import { recycleBinTodo } from "@/services/todo.service";

const Home = async () => {
  const projectsPromise = getProjects();
  const todosPromise = recycleBinTodo();

  const [projects, todos] = await Promise.all([projectsPromise, todosPromise]);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-4">Project List</h1>
        <UpsertProject title="Create Project" />
        <RecycleBin title="Recycle Bin" count={todos.length} />
      </div>
      <ViewProjects projects={projects} />
    </div>
  );
};

export default Home;
