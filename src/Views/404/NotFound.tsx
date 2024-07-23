import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1 className=" font-black text-center text-4xl text-white">
        Page not found
      </h1>
      <p className=" mt-10 text-center text-white">
        You may want to return to the{" "}
        <Link className=" text-fuchsia-500" to={"/"}>
          Main Page
        </Link>
      </p>
    </div>
  );
}
