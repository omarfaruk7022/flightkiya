"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SearchResultSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Filter bar skeleton */}
      <div className="flex items-center gap-4 mb-6">
        <Skeleton width={64} height={32} />
        <Skeleton width={96} height={32} />
        <Skeleton width={128} height={32} />
      </div>

      {/* Sort tabs skeleton */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} height={64} />
        ))}
      </div>

      {/* Flight cards skeleton */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            {/* Airline logo and name */}
            <div className="flex items-center gap-3">
              <Skeleton circle width={48} height={48} />
              <Skeleton width={96} height={16} />
            </div>

            {/* Price */}
            <Skeleton width={96} height={32} />
          </div>

          {/* Flight details */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton width={64} height={24} />
              <Skeleton width={48} height={16} />
            </div>

            {/* Flight path line */}
            <div className="flex-1 mx-8">
              <Skeleton height={16} />
            </div>

            <div className="space-y-2">
              <Skeleton width={64} height={24} />
              <Skeleton width={48} height={16} />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center">
            <Skeleton width={128} height={16} />
            <Skeleton width={96} height={40} />
          </div>
        </div>
      ))}
    </div>
  );
}
