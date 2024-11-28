import { Footer } from "../components/footer";
import { SignOutButton } from "@clerk/nextjs";

import { DASHBOARD_CARDS } from "../consts/cards";

export default async function DashboardPage() {
  return (
    <>
      <main className="max-w-[75rem] w-full mx-auto">
        <div className="grid grid-cols-[1fr_20.5rem] gap-10 pb-10">
          <div>
            <h1>We think you'll like these</h1>
          </div>

          <SignOutButton >
            <button>Sign out </button>
          </SignOutButton>
          
        </div>
      </main>
      
      <Footer />
    </>
  );
}
