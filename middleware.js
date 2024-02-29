export { default } from "next-auth/middleware"
export const config = {
  matcher: [
    "/adaugare-pastila",
    "/delete-painting/:path*",
    "/delete-piata/:path*",
  ],
}
