"use server";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Session} from "next-auth";

async function getCurrentUser(): Promise<Session["user"] | null>  {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
}

export { getCurrentUser };
