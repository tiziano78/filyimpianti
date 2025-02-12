import Link from 'next/link'

export default function RealizzazioniPage() {
  const categories = [
    {
      title: "Fotovoltaico",
      href: "/realizzazioni/fotovoltaico",
      description: "Scopri i nostri impianti fotovoltaici realizzati"
    },
    {
      title: "Solare Termico",
      href: "/realizzazioni/solare-termico",
      description: "Esplora le nostre installazioni di solare termico"
    },
    {
      title: "Pompe Di Calore",
      href: "/realizzazioni/pompe-calore",
      description: "Guarda i nostri progetti con pompe di calore"
    },
    {
      title: "Biomassa",
      href: "/realizzazioni/biomassa",
      description: "Visualizza le nostre realizzazioni con biomassa"
    }
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <Link 
          key={category.href} 
          href={category.href}
          className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
          <p className="text-gray-600">{category.description}</p>
        </Link>
      ))}
    </div>
  )
} 