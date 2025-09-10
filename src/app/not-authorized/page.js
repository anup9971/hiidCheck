export default function NotAuthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-4 text-lg text-gray-600">
        Sorry, you don’t have permission to access this page.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-6 py-3 bg-[#5f8575] text-white rounded-lg hover:bg-[#539479]"
      >
        Go Home
      </a>
    </div>
  );
}
