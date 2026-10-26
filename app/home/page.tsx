import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Location from "@/components/about/Location";
import About from "@/components/about/AboutUs";
import Review from "@/components/about/Review";

export default function Homepage() {
    return (
        <main>
            <Hero />
            <Services />
            <Location />
            <About />
            <Review />
        </main>
    );
}