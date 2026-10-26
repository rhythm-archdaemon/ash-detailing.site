// reviews.tsx
import { ExternalLink, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Review = {
  id: string;
  name: string;
  rating: number; // 1 to 5
  date: string;
  text: string;
};

// Mock data. Replace with real reviews, or fetch from Google later.
const reviews: Review[] = [
  {
    id: "r1",
    name: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    text: "Turned up on time and the car looked brand new. Great that they come to the house, I didn't have to change my day at all.",
  },
  {
    id: "r2",
    name: "Daniel K.",
    rating: 5,
    date: "1 month ago",
    text: "Full detail on my SUV with two dogs. The pet hair was completely gone. Very fair price for the quality of work.",
  },
  {
    id: "r3",
    name: "Priya S.",
    rating: 5,
    date: "2 months ago",
    text: "Booked for a few cars at our workplace. Friendly, professional and the finish was spotless. Will be booking again.",
  },
];

const GOOGLE_REVIEWS_URL = "https://g.page/r/your-place-id/review"; // replace with your link

const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${
            i < Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="container mx-auto px-4 py-20">
      {/* Heading + summary */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
          Google reviews
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          What our customers say
        </h2>

        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="text-3xl font-bold">{average.toFixed(1)}</span>
          <div className="space-y-1">
            <Stars rating={average} className="h-5 w-5" />
            <p className="text-sm text-muted-foreground">
              Based on {reviews.length} Google reviews
            </p>
          </div>
        </div>
      </div>

      {/* Review cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.id} className="h-full">
            <CardContent className="flex h-full flex-col gap-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-amber-500/15 font-semibold text-amber-700">
                    {review.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold leading-tight">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>

              <Stars rating={review.rating} />

              <p className="flex-1 text-sm text-muted-foreground">
                {review.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          Leave us a Google review
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}