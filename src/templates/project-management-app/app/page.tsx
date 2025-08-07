
export default function ProjectApp() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Project Kanban</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-gray-100 p-4 rounded">To Do</div>
        <div className="bg-gray-100 p-4 rounded">In Progress</div>
        <div className="bg-gray-100 p-4 rounded">Done</div>
      </div>
    </main>
  );
}
