// workerportal/page.tsx
import WorkerportalForm from "../ui/workerportal/form"; // path to client component

export default function WorkerportalPage() {
  const mockEmail = "testuser@example.com"; // Placeholder for now

  return <WorkerportalForm email={mockEmail} />;
}
