import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { DeleteProject } from "./projectDelete";

type ViewProjectProps = {
  projects: Array<Project>;
};

export const ViewProjects: React.FC<ViewProjectProps> = ({ projects }) => {
  return (
    <div className='container mx-auto'>
      {projects?.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-40'>
          <p className='text-gray-600 mb-2'>
            No projects found. Please create your first project.
          </p>
        </div>
      ) : (
        <ul className='divide-y divide-gray-200'>
          {projects?.map((project) => (
            <li
              key={project.id}
              className='py-4 flex items-center justify-between'
            >
              <span className='text-lg'>{project.title}</span>
              <div>
                <DeleteProject id={project.id} />
                <Link href={`/${project.id}`}>
                  <Button variant={"secondary"}>
                    <Eye />
                  </Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
