"use client";
import CountrySelectField from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
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
      // country: "US",
      //   investmentGoals: "Growth",
      // riskTolerance: "Medium",
      // preferredIndustry: "Technology",
    },
    mode: "all",
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const result = await signUpWithEmail(data);
      if (result.success) {
        router.push("/");
        toast.success("User accpunt has been created");
      }
    } catch (error) {
      console.error(error);
      toast.error("Sign up failed", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to create and account",
      });
    }
  };

  return (
    <div>
      <h1 className="form-title">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="John Wick"
          register={register}
          error={errors?.fullName}
          validation={{
            required: "Full name is required.",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          }}
        />
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
          placeholder="Enter your password"
          register={register}
          error={errors?.password}
          type="password"
          validation={{ required: "Password is required.", minLength: {value:8, message:"Minimum length should be 8 characters"} }}
        />

        <CountrySelectField
          name="country"
          label="Choose Country"
          placeholder="Select your country"
          control={control}
          error={errors?.country}
          required
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors?.investmentGoals}
          required
        />
        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors?.riskTolerance}
          required
        />
        <SelectField
          name="preferredIndustry"
          label="Prefered Indusuty"
          placeholder="Select your prefered industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors?.preferredIndustry}
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-0"
        >
          {isSubmitting ? "Creating Account" : "Start Your Investment Journey"}
        </Button>
        <FooterLink
          text="Already have an account? "
          linkText="Sign In"
          href="/sign-in"
        />
      </form>
    </div>
  );
};

export default SignUp;
