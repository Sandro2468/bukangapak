import ServerProtectedComponent from "@/components/ServerProtectedComponent";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ServerProtectedComponent>{children}</ServerProtectedComponent>
}  