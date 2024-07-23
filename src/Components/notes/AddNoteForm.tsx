import { NoteFormData } from "@/Types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export default function AddNoteForm() {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryClient = useQueryClient();

  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;

  const initialValues: NoteFormData = {
    content: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      reset();
    },
  });

  const handleAddNote = (formData: NoteFormData) => {
    mutate({
      projectId,
      taskId,
      formData,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className=" space-y-3"
      noValidate
    >
      <div className=" flex flex-col gap-2">
        <label htmlFor="content" className=" font-bold">
          Create note:
        </label>
        <input
          id="content"
          type="text"
          placeholder="Note content"
          className=" w-full p-3 border border-gray-300"
          {...register("content", {
            required: "The content of the note is mandatory",
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>
      <input
        type="submit"
        value="Create note"
        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
      />
    </form>
  );
}
