import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  // Se o Store existir vai redirecionar para o USERID do DASHBOARD
  // dentro do layout do STOREID vai ser confirmado novamente a existenciar do userID
  // e se não Existir vai redirecionar novamente para para o ROOT

  if (!store) {
    redirect(`${userId}`);
  }
  return <>{children}</>;
}
