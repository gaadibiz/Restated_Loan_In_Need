import { urbanist } from "@/lib/fonts";

export default function StepsCard({ steps }: { steps: { title: string; description: string }[] }) {
    return (
        <section className="items-center flex flex-col w-full my-12 max-w-7xl mx-auto py-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
                How it works? - <span className="text-primary">Simple 3 step process</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
                {steps.map((step, index) => (
                    <div key={index} className="bg-[#FFFBF0] py-8 px-10 rounded-lg shadow-xs">
                        <div className="space-y-2">
                            <h3 className={`text-gray-900 leading-snug font-semibold text-xl mb-4 ${urbanist.className}`}>
                                <span className='text-primary'>Step {index + 1}:</span>{" "}
                                {step.title}
                            </h3>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
