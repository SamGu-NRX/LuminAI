import StaffGrid from "@/components/Staff/StaffGrid";

export default function StaffSection() {
  return (
    <main className="flex-container p-8 mx-auto items-center">
      <div
        className="flex flex-col items-center justify-center text-center w-full mx-auto"
        style={{ animation: "textPopIn 0.7s ease-in-out" }}
      >
        <h1 className="text-4xl font-bold text-center mb-12 mt-4 text-gray-800">
          Meet Our AI Wizards
        </h1>
        <StaffGrid />
      </div>
    </main>
  );
}
