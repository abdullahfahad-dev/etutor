import { Hero } from "./Hero/Hero";
import { Platformworks } from "./PlatformWorks/PlatformWorks";
import { Tution } from "./Tution/Tution";
import { Tutors } from "./Tutors/Tutors";
import { Whychoose } from "./WhyChoose/WhyChoose";
export function Home() {
    return (
        <div>
            <Hero />
            <Tution />
            <Tutors />
            <Platformworks />
            <Whychoose />
        </div>
    );
}
