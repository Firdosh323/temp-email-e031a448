import { Check } from 'lucide-react';

export const AboutSection = () => {
  const features = [
    "No Sign up required",
    "No annoying mails",
    "No installations"
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <span className="text-primary font-medium">About temp mail</span>
            <h2 className="text-4xl font-bold text-gray-800">What is Temp mail?</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id est quis magna viverra.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Learn More
              <span>→</span>
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-transparent opacity-50 rounded-2xl" />
            <img 
              src="/placeholder.svg" 
              alt="Temp Mail Interface" 
              className="rounded-2xl shadow-lg w-full animate-scale-in"
            />
          </div>
        </div>
      </div>
    </section>
  );
};