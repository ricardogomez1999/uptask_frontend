import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/Types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "@/Components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Log in</h1>
      <p className="text-2xl font-light text-white mt-5">
        Start planning your projects {""}
        <span className=" text-fuchsia-500 font-bold"> by logging in</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label id="email" className="font-normal text-2xl">
            Email
          </label>

          <input
            id="email"
            type="email"
            autoComplete="username"
            placeholder="Registered Email"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Email is mandaroty",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label id="password" className="font-normal text-2xl">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Registered password"
            autoComplete="current-password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "Password is mandatory",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Log in"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className=" mt-10 flex flex-col space-y-4">
        <Link
          className=" text-center text-gray-300 font-normal"
          to={"/auth/register"}
        >
          Do you have an account? Create one
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
