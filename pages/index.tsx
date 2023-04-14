import Link from "next/link";
import Head from "next/head";
import classes from "../styles/index.module.css";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const loginfunction = () => {
    router.push("/login");
  };
  return (
    <main>
      <Head>User app</Head>
      <div className={classes.home}>
        <div className={classes.container}>
          <h1 className={classes.app_name}>User App</h1>
          <button onClick={loginfunction} className={classes.login_btn}>
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
