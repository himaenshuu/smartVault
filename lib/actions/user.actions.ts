"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query, ID } from "node-appwrite";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "../../constants";
import { redirect } from "next/navigation";

const parseStringfy = (data: unknown) => {
  return JSON.parse(JSON.stringify(data));
};

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.error("Error details:", {
    message,
    error: error instanceof Error ? error.message : error,
    stack: error instanceof Error ? error.stack : undefined,
    config: {
      endpoint: appwriteConfig.endpointUrl,
      projectId: appwriteConfig.projectId,
      databaseId: appwriteConfig.databaseId,
      usersCollectionId: appwriteConfig.usersCollectionId,
    },
  });
  throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  console.log("Starting account creation for:", { email, fullName });

  try {
    // First, create the account
    await createAdminClient();
    console.log("Admin client created successfully");

    // Create the account first
    const accountId = await sendEmailOTP({ email });
    console.log("OTP sent, accountId:", accountId);

    if (!accountId) {
      throw new Error("Failed to send an OTP");
    }

    // Then try to create the user document
    try {
      const { databases } = await createAdminClient();

      // Check if user already exists
      const existingUser = await getUserByEmail(email);
      console.log("Existing user check:", existingUser ? "Found" : "Not found");

      if (!existingUser) {
        console.log("Creating new user document");
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          ID.unique(),
          {
            fullName,
            email,
            avatar: avatarPlaceholderUrl,
            accountId,
          }
        );
        console.log("User document created successfully");
      }

      return parseStringfy({ accountId });
    } catch (dbError) {
      console.error("Database operation failed:", dbError);
      // Even if database operation fails, return the accountId so user can still verify OTP
      return parseStringfy({ accountId, warning: "User profile creation failed, but account was created" });
    }
  } catch (error) {
    console.error("Error in createAccount:", error);
    throw error;
  }
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringfy({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};

export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient();

    const result = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", result.$id)]
    );

    if (user.total <= 0) return null;

    return parseStringfy(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const signOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/sign-in");
  }
};

export const signInUser = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);

    // If user doesn't exist, return error
    if (!existingUser) {
      return parseStringfy({
        accountId: null,
        error: "User not found. Please sign up first."
      });
    }

    // User exists, send OTP
    const accountId = await sendEmailOTP({ email });
    return parseStringfy({ accountId });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};
