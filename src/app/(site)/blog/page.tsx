"use client";

import { BLOG_POSTS } from "@/components/section/blog/blogData";
import BlogGrid from "@/components/section/blog/BlogGrid";
import HeroSection from "@/components/section/blog/BlogHeroSection";
import FeaturedArticle from "@/components/section/blog/FeaturedArticle";
import NewsletterCTA from "@/components/section/blog/NewsLetterCTA";
import { useState } from "react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = BLOG_POSTS.find((post) => post.featured);
  const regularPosts = BLOG_POSTS.filter((post) => !post.featured);

  const filteredPosts =
    selectedCategory === "Semua"
      ? regularPosts
      : regularPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-linear-to-b from-brown-light via-white to-brown-light">
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {featuredPost && <FeaturedArticle post={featuredPost} />}

      <BlogGrid posts={filteredPosts} />

      <NewsletterCTA />
    </div>
  );
}
