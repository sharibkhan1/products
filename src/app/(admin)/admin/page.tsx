// app/page.tsx (Home page)
'use client';

import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import { redirect } from 'next/navigation';
import { createCompany } from '../../../../actions/create-company';
import CompanyForm from '@/components/company/company-form';
import CompanyList from '@/components/company/company-list';

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      console.log("Redirecting to /signin due to unauthenticated state");
      redirect('/AdminSignin');
    },
  });
  
  console.log("Session Data:", session); // Check this output

  const [companiesUpdated, setCompaniesUpdated] = useState(false);
  
  const handleCompanyCreate = async (companyName: string) => {
    if (!session.data?.user?.id) return; // Ensure adminId is defined

    const result = await createCompany(session.data.user.id, companyName);

    if (result?.success) {
      console.log("Company created successfully");
      // Set the update flag to true to trigger re-fetching
      setCompaniesUpdated(true);
    } else {
      console.error(result?.error);
    }
  };

  // Ensure that the user ID is defined before rendering the CompanyList
  const adminId = session.data?.user?.id;

  return (
    <div className="p-8 bg-slate-800">
      <p className="text-white">Admin</p>
      <div className="text-white">{session?.data?.user?.email}</div>

      <CompanyForm onSubmit={handleCompanyCreate} />

      {/* Render CompanyList only if adminId is defined */}
      {adminId && (
        <CompanyList adminId={adminId} updateFlag={companiesUpdated} setUpdateFlag={setCompaniesUpdated} />
      )}

      <button className="text-white mt-4" onClick={() => signOut()}>Logout</button>
    </div>
  );
}
