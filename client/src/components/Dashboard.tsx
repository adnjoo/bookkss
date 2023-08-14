import { useUserStore } from "../zustand/store";

export function Dashboard() {
  const userName = useUserStore((state) => state.user.email);
  console.log(userName);

  return <>Hello {userName}</>;
}
