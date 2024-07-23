import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TaskFormData } from "@/Types/index";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
  errors: FieldErrors<TaskFormData>;
  register: UseFormRegister<TaskFormData>;
};

export default function TaskForm({ errors, register }: TaskFormProps) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="name">
          Task name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Task name"
          className="w-full p-3  border-gray-300 border"
          {...register("name", {
            required: "Task name is mandatory",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Task description"
          className="w-full p-3  border-gray-300 border"
          {...register("description", {
            required: "The description is mandatory",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
