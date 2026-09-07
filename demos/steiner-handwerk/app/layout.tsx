import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Steiner Bau | Handwerk mit Handschlag – Website-Demo",description:"Website-Demo für einen fiktiven Handwerksbetrieb: Renovationen, Malerarbeiten und Bodenbeläge in Zürich.",robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="de"><body>{children}</body></html>}
