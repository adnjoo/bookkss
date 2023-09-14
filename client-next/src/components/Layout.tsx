import { LinearProgress } from '@mui/material';
import { Navbar } from '@/components/Navbar';
import { useLoadingStore } from '@/zustand/store';

export const Layout = ({ children }: { children: any }) => {
  const loading = useLoadingStore((state: any) => state.loading);
  return (
    <main>
      <LinearProgress
        color='primary'
        variant='determinate'
        value={loading ? 50 : 100}
      />
      <Navbar />
      {children}
    </main>
  );
};
