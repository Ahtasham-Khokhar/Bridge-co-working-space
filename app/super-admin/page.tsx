"use client";
import { useSuperAdminConsumer } from '@/context/super-admin-context';
import Header from '@/components/layout/header';

const Page = () => {
  const {name, setName} = useSuperAdminConsumer();
  return (
    <>
      <Header />
    <h1 className="flex justify-center items-center text-secondary-yellow text-4xl font-bold mt-40">
        Super Admin Dashboard {name}
      </h1>
      </>

  )
}

export default Page;