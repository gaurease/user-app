const isBrowser = typeof window !== "undefined";
export default function ProtectedRoute(props: any) {
  const isAuthenticated = isBrowser
    ? localStorage.getItem("isLoggedin") == "true"
      ? true
      : false
    : false;

  let pathIsProtected = props.router.pathname === "/dashboard";
  if (isBrowser && !isAuthenticated && pathIsProtected) {
    props.router.push("/login");
  }

  return props.children;
}
