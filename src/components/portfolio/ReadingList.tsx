import { BookOpen, Star } from "lucide-react";

interface Book {
  title: string;
  author: string;
  description: string;
  rating: number;
  coverColor: string;
}

export const ReadingList = () => {
  const books: Book[] = [
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      description: "A comprehensive guide to building reliable, scalable, and maintainable data systems.",
      rating: 5,
      coverColor: "from-cyan-500 to-blue-600",
    },
    {
      title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
      author: "Aurélien Géron",
      description: "Practical guide to machine learning with hands-on examples and real-world applications.",
      rating: 5,
      coverColor: "from-purple-500 to-pink-600",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      description: "A handbook of agile software craftsmanship and writing maintainable, readable code.",
      rating: 5,
      coverColor: "from-emerald-500 to-teal-600",
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      description: "A collection of practical advice for software developers to improve their craft.",
      rating: 5,
      coverColor: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <section id="reading" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Reading List
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Books that have shaped my understanding of software development, data systems, and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <div key={index} className="glass-card group hover:scale-105 transition-transform">
              {/* Book cover mockup */}
              <div className={`h-48 bg-gradient-to-br ${book.coverColor} rounded-t-lg flex items-center justify-center`}>
                <BookOpen className="w-12 h-12 text-white/80" />
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-slate-400 mb-3">by {book.author}</p>

                <p className="text-sm text-slate-300 mb-4 line-clamp-3">
                  {book.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < book.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-slate-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};