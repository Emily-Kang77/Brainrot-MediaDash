
import screenshotDevices from "./images/user-button@2xrl.webp";
import signIn from "./images/sign-in@2xrl.webp";
import verify from "./images/verify@2xrl.webp";
import userButton2 from "./images/user-button-2@2xrl.webp";
import signUp from "./images/sign-up@2xrl.webp";
import logo from "./images/logo.png";
import "./home.css";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "./components/footer";
import MobileNavBar from "./components/MobileNavBar";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <>
      <MobileNavBar />
      <NavBar />
      <div className="relative gap-3">
        
      </div>
    </>
  );
}
