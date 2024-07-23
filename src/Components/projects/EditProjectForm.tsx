import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "@/Types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  data: ProjectFormData;
  projectId: string;
};

export default function EditProjectForm({
  data,
  projectId,
}: EditProjectFormProps) {
  const navigate = useNavigate();
  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId,
    };
    mutate(data);
  };

  return (
    <>
      <div className=" max-w-3xl mx-auto">
        <h1 className=" text-5xl font-black">Edit your project</h1>
        <p className=" text-2xl font-light text-gray-500 mt-5">
          Fill out the following form to edit the project
        </p>
        <nav className=" my-5">
          <Link
            to="/"
            className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Back to projects
          </Link>
        </nav>

        <form
          className=" mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Create project"
            className=" bg-fuchsia-600 w-full hover:bg-fuchsia-700 p-3 text-white uppercase font-bold cursor-pointer transtico"
          />
        </form>
      </div>
    </>
  );
}
