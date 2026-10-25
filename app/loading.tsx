import PikaLoader from "@/components/PikaLoader";

export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
      <PikaLoader label="Powering up..." />
    </div>
  );
}
