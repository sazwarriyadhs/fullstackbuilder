
export default function Profile() {
  return (
    <main className="p-6 max-w-lg mx-auto">
      <div className="flex items-center gap-4">
        <img src="/avatar.png" alt="Avatar" className="w-16 h-16 rounded-full" />
        <div>
          <h1 className="text-xl font-bold">Nama Pengguna</h1>
          <p className="text-gray-500">@username</p>
        </div>
      </div>
      <p className="mt-4">Bio singkat pengguna di sini...</p>
    </main>
  );
}
