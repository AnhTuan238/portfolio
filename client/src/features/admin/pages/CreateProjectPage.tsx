import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createProjectFormSchema } from "../schemas/project.schema";
import { useCreateProject } from "../hooks/useCreateProject";

import { CustomField } from "@/shared";

import type { CreateProjectForm } from "../types";

export const CreateProjectPage = () => {
  const { handleCreateProject, isCreating } = useCreateProject();

  const form = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
      liveUrl: "",
      githubUrl: "",
    },
  });

  const onSubmit = async (values: CreateProjectForm) => {
    try {
      await handleCreateProject(values);
      form.reset({
        title: "",
        description: "",
        image: undefined,
        liveUrl: "",
        githubUrl: "",
      });
      toast.success("Project created successfully");
    } catch (err: unknown) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-medium mb-10 ">Add Project</h1>

      <div className="p-8 rounded-md border border-gray-8 bg-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="space-y-8"
          >
            <CustomField form={form} name="title" label="Project Title" />
            <CustomField form={form} name="description" label="Description" />
            <CustomField form={form} name="image" label="Image" />
            <CustomField form={form} name="liveUrl" label="Live URL" />
            <CustomField form={form} name="githubUrl" label="GitHub URL" />

            <Button
              disabled={isCreating}
              type="submit"
              className="text-white cursor-pointer"
            >
              Add
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
