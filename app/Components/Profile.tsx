"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchPatientData, Patient } from "../utils/api";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPatientData();
        const patient: Patient | undefined = result.find(
          (p: Patient) => p.name === "Jessica Taylor"
        );

        if (patient) {
          setProfile(patient);
        } else {
          console.error("Patient not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <main className="bg-white shadow-md text-primary-200 px-5 py-10 rounded-lg w-full">
      <section className="flex flex-col items-center mb-4">
        <Image
          src={profile.profile_picture}
          alt={`Profile picture of ${profile.name}`}
          width={100}
          height={100}
          className="rounded-full"
        />
        <h1 className="font-extrabold text-2xl py-6">{profile.name}</h1>
      </section>

      <section className="flex items-center mb-6">
        <Image
          src="/assets/BirthIcon.svg"
          alt="Birth icon"
          width={30}
          height={30}
          className="mr-2"
        />
        <div className="text-sm">
          <p className="font-medium">Date of Birth</p>
          <p className="font-bold">{profile.date_of_birth}</p>
        </div>
      </section>

      <section className="flex items-center mb-6">
        <Image
          src={
            profile.gender === "Female"
              ? "/assets/FemaleIcon.svg"
              : "/assets/MaleIcon.svg"
          }
          alt={`${profile.gender} icon`}
          width={30}
          height={30}
          className="mr-2"
        />
        <div className="text-sm">
          <p className="font-medium">Gender</p>
          <p className="font-bold">{profile.gender}</p>
        </div>
      </section>

      <section className="flex items-center mb-6">
        <Image
          src="/assets/PhoneIcon.svg"
          alt="Phone icon"
          width={30}
          height={30}
          className="mr-2"
        />
        <div className="text-sm">
          <p className="font-medium">Contact Info</p>
          <p className="font-bold">{profile.phone_number}</p>
        </div>
      </section>

      <section className="flex items-center mb-6">
        <Image
          src="/assets/PhoneIcon.svg"
          alt="Emergency contact icon"
          width={30}
          height={30}
          className="mr-2"
        />
        <div className="text-sm">
          <p className="font-medium">Emergency Contacts</p>
          <p className="font-bold">{profile.emergency_contact}</p>
        </div>
      </section>

      <section className="flex items-center mb-6">
        <Image
          src="/assets/InsuranceIcon.svg"
          alt="Insurance icon"
          width={30}
          height={30}
          className="mr-2"
        />
        <div className="text-sm">
          <p className="font-medium">Insurance Provider</p>
          <p className="font-bold">{profile.insurance_type}</p>
        </div>
      </section>

      <section className="flex justify-center items-center">
        <button
          className="mt-4 bg-primary-100 text-sm font-bold py-2 px-4 rounded-full"
          aria-label="Show all information about the patient"
        >
          Show All Information
        </button>
      </section>
    </main>
  );
};

export default Profile;
