import { useUserStore } from "../zustand/store";

export function Dashboard() {
  const userName = useUserStore((state: any) => state?.user?.email);
  console.log(userName);

  return <>Hello {userName}</>;
}
