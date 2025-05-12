import { cookies } from "next/headers";
import WorkerportalForm from "../ui/workerportal/form";

export default async function WorkerportalPage() {
  // Await the cookies
  const userEmailCookie = await cookies();
  const email = userEmailCookie.get("userEmail")?.value;

  if (!email) {
    return <div className="text-red-500 p-4">Please log in to view your dashboard.</div>;
  }

  return <WorkerportalForm email={email} />;
}
