import { expertiseData } from '../data/expertise';

export default function Expertise() {
  return (
    <section id="expertise" className="py-8 sm:py-12 bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-center pb-12">
          Technical Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {expertiseData.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 ease-out transform hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="font-semibold text-purple-400 text-lg">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


