export default function RealizzazioniLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">Le Nostre Realizzazioni</h1>
      {children}
    </div>
  )
} 