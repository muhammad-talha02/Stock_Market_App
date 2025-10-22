"use client";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";

const SignIn = () => {
  const {
    handleSubmit,
    control,
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

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log({ errors });
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
          validation={{ required: "Email is required.", pattern:/^\w+@\w+\.\w+$/, message:"Please enter valid email" }}
        />
        <InputField
          name="password"
          label="Password"
          placeholder=""
          register={register}
          error={errors?.password}
          type="password"
          validation={{ required: "Password is required.", minLength:8 }}
        />


     
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full -mt-5"
        >
          {isSubmitting ? "Logining..." : "Login"}
        </Button>
        <FooterLink text="Don't have an account? " linkText="Sign up" href="/sign-up"/>
      </form>
    </>
  );
};

export default SignIn;
