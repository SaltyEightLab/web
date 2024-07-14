"use client";

import { useSession } from "next-auth/react";

const ClientAuthResult = () => {
  const { data: session, status } = useSession();
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
};

export default ClientAuthResult;
