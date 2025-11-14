import { motion } from "framer-motion";
import { TrendingUp, Calendar, Eye, Heart, ArrowRight } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface FeaturedArticleProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    authorAvatar: string;
    date: string;
    readTime: string;
    image: string;
    views: number;
    likes: number;
    tags: string[];
  };
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="relative group"
        >
          <div className="absolute inset-0 bg-linear-to-r from-brown-accent to-brown-dark rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />

          <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-brown-accfrom-brown-accent/30 hover:border-brown-accfrom-brown-accent/50 transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-80 lg:h-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-broto-brown-dark/50 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-2 bg-brown-accfrom-brown-accent text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    <TrendingUp className="w-4 h-4" />
                    Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-brown-light border border-brown-accfrom-brown-accent/30 rounded-full text-xs font-bold text-broto-brown-dark">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-broto-brown-dark/60">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-black text-broto-brown-dark mb-4 leading-tight group-hover:text-brown-accfrom-brown-accent transition-colors">
                  {post.title}
                </h2>

                <p className="text-lg text-broto-brown-dark/70 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Author & Stats */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-brown-accfrom-brown-accent/20">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full border-2 border-brown-accfrom-brown-accent/30"
                    />
                    <div>
                      <div className="font-bold text-sm text-broto-brown-dark">
                        {post.author}
                      </div>
                      <div className="text-xs text-broto-brown-dark/60">
                        {post.readTime} baca
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-broto-brown-dark/60">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </span>
                  </div>
                </div>

                <button className="bg-linear-to-r from-brown-accent to-brown-dark hover:from-broto-brown-dark hover:to-brown-accfrom-brown-accent text-white font-bold rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all group/btn inline-flex items-center justify-center gap-2">
                  Baca Selengkapnya
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
