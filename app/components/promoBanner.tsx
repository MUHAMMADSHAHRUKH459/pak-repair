export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: 'Free Diagnostic',
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Pick and Drop Service',
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Repairing within 24 hours',
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  return (
    <section className="w-full py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center justify-center p-8 md:p-10 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="mb-4" style={{ color: '#0359b3' }}>
                {service.icon}
              </div>
              <h3 
                className="text-lg md:text-xl lg:text-2xl font-semibold text-center"
                style={{ color: '#0359b3' }}
              >
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}