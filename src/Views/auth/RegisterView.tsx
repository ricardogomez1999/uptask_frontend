import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserRegistrationForm } from "@/Types/index";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/Components/ErrorMessage";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const password = watch("password");

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Create account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Fill out the form to {""}
        <span className=" text-fuchsia-500 font-bold">
          {" "}
          create your account
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Name</label>
          <input
            type="name"
            placeholder="Registered name"
            className="w-full p-3  border-gray-300 border"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "The password needs to have at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Repeat Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat the registration password"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "Repeat password is required",
              validate: (value) =>
                value === password || "The passwords do not match",
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Registrarme"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className=" mt-10 flex flex-col space-y-4">
        <Link
          className=" text-center text-gray-300 font-normal"
          to={"/auth/login"}
        >
          Do you have an account? Log in here
        </Link>
        <Link
          className=" text-center text-gray-300 font-normal"
          to={"/auth/forgot-password"}
        >
          Forgot password?
        </Link>
      </nav>
    </>
  );
}
