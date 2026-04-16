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

      <div className="">
         <h1 className="text-primary-dark-black lg:text-[34px] md:text-[28px] sm:text-[24px]">Welcome to Bridge</h1>
        <img className="text-primary-dark-black" src="/svg/welcomeToBridge.svg" alt="Image does not Load" />
      </div>

      <p className="text-center text-primary-text lg:text-[34px] md:text-[28px] sm:text-[24px] mt-6 mb-12">
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