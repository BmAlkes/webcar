import { Link } from "react-router-dom";
import logo from "../../assets/logoCar.svg";
import Container from "../../components/container";
import Input from "../../components/input/indext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty("Field required"),
  email: z.string().email("Enter a valid email").nonempty("Email is mandatory"),
  password: z
    .string()
    .min(6, "Password must be longer than 6 characters")
    .max(14, "The password must not be a maximum of 14 characters"),
});
type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Container>
      <div className="w-full min-h-screen  flex justify-center items-center flex-col gap-4">
        <Link to="/" className="mb-6 max-w-sm w-full">
          <img src={logo} alt="logo site" className="w-full" />
        </Link>
        <h2 className="text-2xl text-red-500 font-thin">Register</h2>
        <form
          className="max-w-xl w-full rounded-lg bg-white p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              placeholder="Type your Name"
              error={errors.name?.message}
              name="name"
              type="text"
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              placeholder="Type your email"
              error={errors.email?.message}
              name="email"
              type="email"
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              placeholder="Type your password"
              error={errors.password?.message}
              name="password"
              type="password"
              register={register}
            />
          </div>
          <button
            className="bg-zinc-900 rounded-md w-full text-center text-white h-10 font-medium"
            type="submit"
          >
            Access
          </button>
        </form>
        <p>
          Have a account?
          <Link to="/login">
            <span className="text-red-600 ml-2">Login</span>
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default RegisterPage;
