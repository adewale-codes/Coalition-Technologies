import Head from "next/head";
import Diagnosis from "./Components/Diagnosis";
import Diagnostic from "./Components/Diagnostic";
import Profile from "./Components/Profile";
import Lab from "./Components/Lab";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tech Care Dashboard</title>
        <meta property="og:title" content="Tech Care Dashboard" key="title" />
      </Head>
      <div className="pl-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="order-2 md:order-1 w-full md:w-3/4">
            <Diagnosis />
            <Diagnostic />
          </div>
          <div className="order-1 md:order-2 w-full md:w-1/4">
            <Profile />
            <Lab />
          </div>
        </div>
      </div>
    </div>
  );
}
