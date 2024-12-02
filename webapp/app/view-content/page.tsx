"use client";

import ContentView from '@/app/components/ContentView';
import { Result } from '../types';
import { Suspense } from 'react';

// Sample data type
interface Content {
  imageUrl: string;
  title: string;
  creator: string;
  date: string;
  platform: string;
  description: string;
}

// Sample content - you would typically fetch this based on an ID or other parameter
const sampleContent: Content = {
  imageUrl: "https://picsum.photos/800",
  title: "The Art of Programming",
  creator: "Tech Master",
  date: "March 15, 2024",
  platform: "YouTube",
  description: "An in-depth look at modern programming practices and techniques. Learn how to write clean, efficient code that scales. This comprehensive guide covers everything from basic principles to advanced concepts in software development."
};

export default function ContentPage() {
  return (
    <div className="bg-background-color px-screen-320 lg:px-screen-992 xl:px-screen-1200 2xl:px-screen-1440">
      <Suspense fallback={<div>Loading...</div>}>
        <ContentView
          onClose={() => window.history.back()} // or use router.back()
        />
      </Suspense>
    </div>
  );
}
