import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { loginSchema } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";
import type { LoginFormValues } from "../types";
import { CustomField } from "@/shared";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { signIn, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await signIn(values);
      navigate("/admin/dashboard", { replace: true });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          toast.error(
            "Cannot connect to server. Please check your connection.",
          );
          return;
        }

        if ([400, 401].includes(error.response.status)) {
          toast.error("Invalid email or password");
          return;
        }
      }

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 bg-gray-10 md:p-10">
      <div className="flex flex-col gap-6 py-6 max-w-sm w-full border border-gray-8 bg-white  rounded-xl  shadow-sm">
        <div className="flex flex-col gap-2 px-6 text-center">
          <div className="font-semibold text-xl">Welcome back, Tuan</div>
          <div className="text-gray-9 text-sm">Login with your account</div>
        </div>

        <div className="space-y-7 px-6 pt-4">
          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              className=" space-y-12 mb-2"
            >
              {/* Email */}
              <CustomField form={form} name="email" label="Email" />

              {/* Password */}
              <CustomField form={form} name="password" label="Password" />

              {/* Forgot password */}
              <div className="float-end text-sm hover:underline cursor-pointer -mt-4">
                Forgot your password?
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="disabled:opacity-50 w-full py-2 px-4 bg-primary text-white cursor-pointer"
              >
                Login
              </Button>
            </form>
          </Form>

          {/* Go back home */}
          <Link to="/">
            <Button className="w-full py-2 px-4 bg-white border border-gray-8 hover:bg-gray-11 cursor-pointer">
              Go back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
