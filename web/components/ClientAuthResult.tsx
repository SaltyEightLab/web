"use client";

import { useSession } from "next-auth/react";

const ClientAuthResult = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <div>{process.env.AUTH_SECRET}</div>
      <div>{process.env.AUTH_URL}</div>
      <div>{process.env.AUTH_GITHUB_ID}</div>
      <div>{process.env.AUTH_GITHUB_SECRET}</div>
      <div>{process.env.AUTH_GOOGLE_ID}</div>
      <div>{process.env.AUTH_GOOGLE_SECRET}</div>
    </div>
  );
};

export default ClientAuthResult;
