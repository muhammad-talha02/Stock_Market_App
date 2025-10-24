"use client";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
    const router = useRouter();
  
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "US",
      //   investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },
    mode: "all",
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const result = await signInWithEmail(data);
      console.log({result})
      if (result.success) {
        router.push("/");
      }
      else{
        toast.error("Sign in failed", {
          description:
            result.error instanceof Error
              ?result.error.message
              : "Failed to create and account",
        });

      }
    } catch (error) {
      console.error(error);
      toast.error("Sign in failed", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to create and account",
      });
    }
  };

  return (
    <>
      <h1 className="form-title">Login to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="name@domain.com"
          register={register}
          error={errors?.email}
          type="email"
          validation={{
            required: "Email is required.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              // value: /^\w+@\w+\.\w+$/,
              message: "Please enter valid email",
            },
          }}
        />
        <InputField
          name="password"
          label="Password"
          placeholder=""
          register={register}
          error={errors?.password}
          type="password"
          validation={{
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Minimum lnegth should be 8 characters",
            },
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full -mt-5"
        >
          {isSubmitting ? "Logining..." : "Login"}
        </Button>
        <FooterLink
          text="Don't have an account? "
          linkText="Sign up"
          href="/sign-up"
        />
      </form>
    </>
  );
};

export default SignIn;
