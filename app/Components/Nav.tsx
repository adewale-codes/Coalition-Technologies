"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-5 w-full" role="navigation">
      <div className="bg-white shadow-md rounded-full grid lg:grid-cols-[200px_minmax(400px,_1fr)_250px] grid-cols-[fr_50px] items-center lg:px-5 px-4 py-5 h-1/2 text-sm text-primary-200">
        <Link href="/" aria-label="Navigate to Homepage">
          <img
            src="/assets/TestLogo.svg"
            alt="Test Company Logo"
            className=""
          />
        </Link>
        <div className="justify-self-start font-medium text-sm lg:pl-16 hidden lg:flex items-center justify-center gap-2 md:gap-8">
          <Link
            className={pathName === "/Overview" ? "" : ""}
            href="/"
            aria-label="Navigate to Overview"
          >
            <div className="flex gap-2 items-center">
              <div>
                <Image
                  src="/assets/home_FILL0_wght300_GRAD0_opsz24.svg"
                  width={15}
                  height={15}
                  alt="Home icon"
                />
              </div>
              <div>
                <p>Overview</p>
              </div>
            </div>
          </Link>
          <Link
            className={pathName === "/Patients" ? "" : "text-primary-200"}
            href="/Patients"
            aria-label="Navigate to Patients"
          >
            <div className="h-1/2 bg-primary-100 rounded-full p-4">
              <div className="flex gap-2 items-center">
                <div>
                  <Image
                    src="/assets/group_FILL0_wght300_GRAD0_opsz24.svg"
                    width={15}
                    height={15}
                    alt="Group icon"
                  />
                </div>
                <div>
                  <p>Patients</p>
                </div>
              </div>
            </div>
          </Link>
          <Link
            className={pathName === "/Schedule" ? "" : "text-primary-200"}
            href="/Schedule"
            aria-label="Navigate to Schedule"
          >
            <div className="flex gap-2 items-center">
              <div>
                <Image
                  src="/assets/calendar_today_FILL0_wght300_GRAD0_opsz24.svg"
                  width={15}
                  height={15}
                  alt="Calendar icon"
                />
              </div>
              <div>
                <p>Schedule</p>
              </div>
            </div>
          </Link>
          <Link
            className={pathName === "/Message" ? "" : "text-primary-200"}
            href="/Message"
            aria-label="Navigate to Message"
          >
            <div className="flex gap-2 items-center">
              <div>
                <Image
                  src="/assets/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg"
                  width={15}
                  height={15}
                  alt="Message icon"
                />
              </div>
              <div>
                <p>Message</p>
              </div>
            </div>
          </Link>
          <Link
            className={pathName === "/Transactions" ? "" : "text-primary-200"}
            href="/Transactions"
            aria-label="Navigate to Transactions"
          >
            <div className="flex gap-2 items-center">
              <div>
                <Image
                  src="/assets/credit_card_FILL0_wght300_GRAD0_opsz24.svg"
                  width={15}
                  height={15}
                  alt="Card icon"
                />
              </div>
              <div>
                <p>Transactions</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="justify-self-start font-medium hidden lg:flex items-center justify-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <div>
              <Image
                src="/assets/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png"
                alt="Portrait of Dr. Jose Simmons"
                width={40}
                height={40}
              />
            </div>
            <div className="border-r text-sm text-primary-200">
              <div className="px-2">
                <p className="font-bold">Dr. Jose Simmons</p>
                <p className="text-secondary-500">General Practitioner</p>
              </div>
            </div>
            <div>
              <Image
                src="/assets/settings_FILL0_wght300_GRAD0_opsz24.svg"
                alt="Settings icon"
                width={20}
                height={20}
              />
            </div>
            <div>
              <Image
                src="/assets/more_vert_FILL0_wght300_GRAD0_opsz24.svg"
                alt="More options icon"
                width={5}
                height={5}
              />
            </div>
          </div>
        </div>
        <div className="lg:hidden -mt-20 flex justify-self-end cursor-pointer">
          {isOpen ? (
            <XMarkIcon
              className="h-6 w-6 text-black"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            />
          ) : (
            <Bars3Icon
              className="h-6 w-6 text-black"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            />
          )}
        </div>
      </div>
      <div
        className={`block lg:hidden fixed h-68 -mt-4 font-medium transform left-0 w-full bg-white transition-transform duration-300 ease-in-out overflow-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:justify-self-start lg:pl-32 lg:flex lg:items-center lg:justify-center text-black lg:gap-2 lg:md:gap-8 lg:bg-transparent`}
      >
        <div className="flex flex-col justify-center items-center space-y-5 ml-5">
          <Link href="/" aria-label="Navigate to Overview">
            Overview
          </Link>
          <Link href="/Patients" aria-label="Navigate to Patients">
            Patients
          </Link>
          <Link href="/Schedule" aria-label="Navigate to Schedule">
            Schedule
          </Link>
          <Link href="/Message" aria-label="Navigate to Message">
            Message
          </Link>
          <Link href="/Transactions" aria-label="Navigate to Transactions">
            Transactions
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <div>
                <Image
                  src="/assets/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png"
                  alt="Portrait of Dr. Jose Simmons"
                  width={40}
                  height={40}
                />
              </div>
              <div className="border-r text-sm">
                <div className="px-2">
                  <p className="font-bold">Dr. Jose Simmons</p>
                  <p>General Practitioner</p>
                </div>
              </div>
              <div>
                <Image
                  src="/assets/settings_FILL0_wght300_GRAD0_opsz24.svg"
                  alt="Settings icon"
                  width={20}
                  height={20}
                />
              </div>
              <div>
                <Image
                  src="/assets/more_vert_FILL0_wght300_GRAD0_opsz24.svg"
                  alt="More options icon"
                  width={5}
                  height={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
