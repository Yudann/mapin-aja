import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import BlogCard from "./BlogCard";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface BlogGridProps {
  posts: Array<{
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
  }>;
}

export default function BlogGrid({ posts }: BlogGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} variants={cardVariants} />
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-white border-2 border-brown-accent/30 hover:border-brown-accent text-brown-dark font-bold rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
            Muat Lebih Banyak Artikel
            <Sparkles className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
