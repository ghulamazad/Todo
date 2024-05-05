"use client";

import { deleteProjects } from "@/services/project.service";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

type ViewProjectProps = {
  id: number;
};

export const DeleteProject: React.FC<ViewProjectProps> = ({ id }) => {
  const onDeleteProject = async (id: number) => {
    try {
      await deleteProjects(id);
      toast({
        title: "Project successfully deleted.",
      });
    } catch (error: any) {
      toast({
        title: error.message,
      });
    }
  };
  return (
    <Button
      onClick={() => onDeleteProject(id)}
      variant='destructive'
      className='mr-2'
    >
      <Trash />
    </Button>
  );
};
