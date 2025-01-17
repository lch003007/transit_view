import localFont from "next/font/local";
import "../globals.css";
// import Image from "next/image";
import Contexts from "@/contexts";
import Sidenav from "@/components/Sidenav";
import Topbar from "@/components/Topbar";
import PageTitle from "@/components/pageTitle";


const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" style={{height:'100%'}}>
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{background:'#283140',height:'100%'}}>
        <Topbar/>
        <div style={{display:'flex',height:'100%'}}>
          
          <div style={{width:'100%',position:'relative'}}>
          <PageTitle/>
          <div style={{padding:'30px',width:'100%',height:'95%'}}>
          {children}
          </div>
          </div>
        </div>
        
      </body>
    </html>
  );
}
