"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ModeToggle } from "./ui/theme-btn";
import LoadingBar from "react-top-loading-bar";

const Navbar = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (currentPath) {
      setProgress(20);
      setTimeout(() => setProgress(40), 100);
      setTimeout(() => setProgress(100), 400);
    }
  }, [currentPath]);

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/signup");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/50 p-4 backdrop-blur border-b">
      <LoadingBar
        color="#933ce6"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          H-C-H-N
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 items-center">
          {["Home", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="hover:scale-105 hover:font-semibold transition-transform duration-300"
            >
              {item}
            </Link>
          ))}
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleLogin}>Signup</Button>
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <ModeToggle />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="ml-2"
            aria-label="Open Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Mobile Menu */}
          <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
            <div className="fixed inset-0 z-50 bg-black/20" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-black dark:text-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">HCHCN</span>
                  <img
                    alt="HCHN Logo"
                    src="/logo.png"
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {["Home", "About", "Contact"].map((item) => (
                      <Link
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Button
                      onClick={handleLogin}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white dark:text-black bg-primary hover:bg-primary-dark"
                    >
                      sign up
                    </Button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;