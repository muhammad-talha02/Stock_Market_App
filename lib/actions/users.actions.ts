"use server";

import { connectToDatabase } from "@/database/mongoose";

export const getAllUsersForNewsEmail = async () => {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not found");
    const users = await db
      .collection("user")
      .find(
        { email: { $exists: true, $ne: null } },
        { projection: { id: 1, _id: 1, name: 1, email: 1, country: 1 } }
      )
      .toArray();

    return users
      .filter((x) => x.name && x.email)
      .map((user) => ({
        id: user.id || user._id?.toString() || "",
        email: user.email,
        name: user.name,
      }));
  } catch (error) {
    console.error("Error Fecthing users for email", error);
    return [];
  }
};
