export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="max-w-4xl text-center justify-center">
        {children}
      </div>
    </section>
  );
}
