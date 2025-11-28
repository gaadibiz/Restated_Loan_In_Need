"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import PartnerForm from './PartnerForm';

export default function HeroSection() {
    return (
        <section className="font-sans items-center justify-between lg:gap-16 flex flex-col md:flex-row w-full mt-24 max-w-7xl mx-auto py-4 lg:p-0 p-12">
            <div className="flex flex-col gap-4 w-full max-w-2xl">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-primary font-medium">
                                Personal Loan
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="space-y-2">
                    <h2 className="lg:text-5xl text-3xl font-bold leading-tight">
                        <span className="text-primary">LoanInNeed Affiliate Program </span>
                        - Partner with Us & Earn Generous Commissions
                    </h2>
                </div>
                <p className="text-lg text-gray-600 leading-snug lg:max-w-[40rem]">Welcome to LoanInNeed&apos;s Affiliate Program, your gateway to earning substantial income by connecting people with instant financial solutions. As India&apos;s leading digital credit provider, we offer a lucrative affiliate partnership opportunity for bloggers, content creators, website owners, social media influencers, and digital marketers.</p>
            </div>
            {/* shadcn form */}
            <div className="w-full md:w-1/2 lg:w-1/3 shadow-lg rounded-2xl mt-16">
                <PartnerForm />
            </div>
        </section>
    );
}