import { motion } from "framer-motion";
import { Clock, Heart, Share2, ChevronRight } from "lucide-react";

interface BlogCardProps {
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
  variants: any;
}

export default function BlogCard({ post, variants }: BlogCardProps) {
  return (
    <motion.article
      variants={variants}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-brown-accent/20 hover:border-brown-accent/50 hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brown-dark/60 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-brown-dafrom-brown-dark border border-brown-accent/30">
            {post.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-brown-accentborder-brown-accent" />
          </button>
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Share2 className="w-4 h-4 text-brown-accentborder-brown-accent" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-black text-brown-dafrom-brown-dark mb-3 leading-tight group-hover:text-brown-accentborder-brown-accent transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-brown-dafrom-brown-dark/70 mb-4 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 bg-brown-light border border-brown-accent/20 rounded-full text-brown-dafrom-brown-dark/70"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author & Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-brown-accent/20">
          <div className="flex items-center gap-2">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-8 h-8 rounded-full border-2 border-brown-accent/30"
            />
            <div>
              <div className="text-xs font-bold text-brown-dafrom-brown-dark">
                {post.author}
              </div>
              <div className="text-xs text-brown-dafrom-brown-dark/50 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </div>
            </div>
          </div>

          <button className="text-brown-accentborder-brown-accent hover:text-brown-dafrom-brown-dark transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
