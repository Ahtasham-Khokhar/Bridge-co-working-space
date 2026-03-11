"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSelect = (role: string) => {
    if (loading) return; // prevent multiple clicks

    localStorage.setItem("selectedRole", role);
    setLoading(true);

    // Redirect to login page
    router.push("/auth/login");
  };

  return (
    <div className="login-type min-h-screen flex flex-col items-center mt-12 p-8">
      
      {/* Loading Indicator */}
      {loading && (
        <div className="mb-6 text-lg font-semibold text-primary-dark_black">
          Redirecting to {localStorage.getItem("selectedRole")} login...
        </div>
      )}

      <h1 className="text-center text-primary-dark_black lg:text-3xl md:text-2xl sm:text-xl font-bold">
        Welcome to Bridge
      </h1>

      <Image
        src="/auth/yellowline.svg"
        alt="Yellow Line"
        width={140}
        height={10}
        className="mx-auto w-auto h-auto object-contain max-w-full"
        loading="eager"
      />

      <p className="text-center text-primary-text lg:text-3xl md:text-2xl sm:text-xl mt-6 mb-12">
        Choose Account Type
      </p>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full">
        
        <Image
          src="/auth/superAdmin.svg"
          alt="Super Admin Login"
          width={150}
          height={150}
          className="mx-auto w-38 h-38 object-contain cursor-pointer hover:scale-105 transition-transform"
          loading="lazy"
          onClick={() => handleSelect("Super Admin")}
        />

        <Image
          src="/auth/branchLogin.svg"
          alt="Branch Login"
          width={150}
          height={150}
          className="mx-auto w-38 h-38 object-contain cursor-pointer hover:scale-105 transition-transform"
          loading="lazy"
          onClick={() => handleSelect("Branch")}
        />

        <Image
          src="/auth/investorLogin.png"
          alt="Investor Login"
          width={150}
          height={150}
          className="mx-auto w-38 h-38 object-contain cursor-pointer hover:scale-105 transition-transform"
          loading="lazy"
          onClick={() => handleSelect("Investor")}
        />

        <Image
          src="/auth/user.svg"
          alt="User Login"
          width={150}
          height={150}
          className="mx-auto w-38 h-38 object-contain cursor-pointer hover:scale-105 transition-transform"
          loading="lazy"
          onClick={() => handleSelect("User")}
        />
      </div>
    </div>
  );
};

export default Page;