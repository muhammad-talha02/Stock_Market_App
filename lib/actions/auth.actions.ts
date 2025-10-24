"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";

export const signUpWithEmail = async (data: SignUpFormData) => {
  const {
    email,
    password,
    fullName,
    country,
    investmentGoals,
    preferredIndustry,
    riskTolerance,
  } = data;
  try {
    const response = await auth.api.signUpEmail({
      body: { email, password, name: fullName },
    });
    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          preferredIndustry,
          riskTolerance,
        },
      });
    }
    return { success: true, response };
  } catch (error) {
    console.log("Signup failed", error);
    return { success: true, error: "Sign up failed" };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.log("Sign out failed", error);
    return { success: true, error: "Sign out failed" };
  }
};
export const signInWithEmail = async (data: SignInFormData) => {
  const {
    email,
    password,
  } = data;
  try {
    const response = await auth.api.signInEmail({
      body: { email, password},
    });
    return { success: true, response };
  } catch (error) {
    console.log("Signin failed", error);
    return { success: false, error };
  }
};