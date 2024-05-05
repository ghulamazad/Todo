import { UpsertProject } from "@/components/project/upsertProject";
import { ViewProjects } from "@/components/project/viewProjects";
import { getProjects } from "@/services/project.service";

const Home = async () => {
  const projects: Array<Project> = await getProjects();

  return (
    <div className='container mx-auto mt-10'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold mb-4'>Project List</h1>
        <UpsertProject title='Create Project' />
      </div>
      <ViewProjects projects={projects} />
    </div>
  );
};

export default Home;
