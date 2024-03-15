import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ClientFlashComponent from "@/components/ClientFlashComponent";
export const dynamic = "force-dynamic";

const LoginPage = () => {
  const handleLogin = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const result = await response.json();
    // console.log(result);

    if (!response.ok) {
      return redirect("/login?error=" + result.error);
    }
    cookies().set("Authorization", `Bearer ${result.data.accessToken}`);
    return redirect("/");
  };
  return (
    <div className="flex justify-center items-center h-screen bg-white-50">
      <div className="w-80 bg-pink rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-red-500 mb-6">Login</h2>
        <ClientFlashComponent />
        <form method="POST" action={handleLogin} className="text-black">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="text-right mb-6">
            <Link href="#" legacyBehavior>
              <a className="text-sm text-pink-500 hover:text-pink-600">
                Forgot Password?
              </a>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-bold py-3 rounded-lg hover:bg-pink-600"
          >
            Log In
          </button>
        </form>
        <p className="text-center mt-6 text-sm">
          Don&apost have an account?{" "}
          <Link href="#" legacyBehavior>
            <a className="text-pink-500 hover:text-pink-600 font-semibold">
              Sign Up
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
