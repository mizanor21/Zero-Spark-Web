import { AssemblyStage } from "@/components/assembly/assembly-stage";
import { Admissions } from "@/components/home/admissions";
import { ApplyBand } from "@/components/home/apply-band";
import { Capstone } from "@/components/home/capstone";
import { Curriculum } from "@/components/home/curriculum";
import { IndustrySessions } from "@/components/home/industry-sessions";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <AssemblyStage />
      <Curriculum />
      <IndustrySessions />
      <Capstone />
      <Admissions />
      <ApplyBand />
    </main>
  );
}
