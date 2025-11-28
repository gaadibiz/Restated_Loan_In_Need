import React from 'react';
import HeroSection from '@/components/affiliate/AffiliateHero';
import StepsCard from '@/components/affiliate/StepsCard';
import FAQSection from '@/components/FAQSection';
import { medicalLoanFAQ } from '@/lib/data';
import AboutFootCTA from '@/components/about/AboutFootCTA';

const steps = [
    {
        title: "Sign up & get your unique link",
        description: "Register for free as a LoanInNeed affiliate partner. Receive your personalized tracking link and promotional materials immediately upon approval."
    },
    {
        title: "Promote LoanInNeed services",
        description: "Share your affiliate link through your website, blog, social media, email campaigns, or any digital platform. Create content that educates your audience about instant loan solutions."
    },
    {
        title: "Earn commissions automatically",
        description: "Get paid for every valid lead, completed application, and successful loan disbursal. Track your earnings in real-time through your affiliate dashboard."
    }
];

export default function AffiliateProgramPage() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <WhatIsSection />
            <StepsCard steps={steps} />
            <WhyPartnerSection />
            <CommissionStructure />
            <EligibilityCriteria />
            <AboutFootCTA />
            <FAQSection faqData={medicalLoanFAQ} />
        </div>
    );
}

// components/affiliate/WhatIsSection.tsx
function WhatIsSection() {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    What is the LoanInNeed{' '}
                    <span className="text-primary">affiliate program</span>?
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed text-justify mx-auto">
                    The LoanInNeed Affiliate Program is a performance-based partnership model where you earn commissions by referring customers who need instant loans. When visitors from your platform apply for loans through your unique affiliate link, you earn money at various stages of their journey.
                </p>
            </div>
        </section>
    );
}

// components/affiliate/WhyPartnerSection.tsx
function WhyPartnerSection() {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
                    Why partner with{' '}
                    <span className="text-primary">LoanInNeed?</span>
                </h2>
                <div className="mt-12 space-y-6 prose text-gray-700">
                    LoanInNeed specializes in providing instant personal loans to individuals facing urgent financial needs. Our simple, fast, secure, and hassle-free loan process ensures customers get credit within minutes, making conversions easier for our affiliate partners. We operate 24/7 across major Indian cities including Mumbai, Bangalore, Hyderabad, Delhi, Kolkata, and Chennai.<br /><br />
                    Join thousands of successful affiliates who are earning consistent income by promoting our instant loan services. Whether you have a personal finance blog, YouTube channel, social media following, or email list - start monetizing your audience today!
                </div>
            </div>
        </section>
    );
}

// Commission Structure Section
function CommissionStructure() {
    return (
        <section className="py-10">
            <h5 className="text-red-500 text-center font-medium mb-2">
                Attractive Commission Structure
            </h5>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-1 leading-snug">
                Multiple Earning Opportunities
            </h2>
            <h3 className="text-red-500 text-center text-xl font-semibold mb-6">
                Get Paid at Every Stage!
            </h3>
            <p className="text-center mb-8 max-w-2xl mx-auto text-gray-700">
                We believe in rewarding our partners generously. Our multi-tier commission structure ensures you earn money throughout the customer journey:
            </p>

            <div className="space-y-6 max-w-2xl mx-auto">
                <div>
                    <h4 className="text-lg font-semibold text-red-500">
                        Cost Per Lead (CPL): ₹50/-
                    </h4>
                    <p className="text-gray-800">
                        Earn ₹50 for every valid lead that meets our basic eligibility criteria.
                        When a potential customer clicks your affiliate link and submits their basic information, you get paid!
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-red-500">
                        Cost Per Application (CPA): ₹200/-
                    </h4>
                    <p>
                        Receive ₹200 when your referred customer completes the full loan application with all required documents.
                        This is in addition to your CPL earnings!
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-red-500">
                        Cost Per Disbursal (CPD): ₹1,200/-
                    </h4>
                    <p>
                        Earn a substantial ₹1,200 commission when the loan amount is successfully disbursed to your referred customer’s bank account.
                        This is where the big earnings happen!
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-red-500">
                        Bonus Incentive: 3% of Total Disbursal Amount
                    </h4>
                    <p>
                        On top of all the above commissions, receive an additional 3% bonus on the total loan amount disbursed!
                        For higher loan amounts, this can significantly boost your earnings.
                    </p>
                </div>
            </div>
        </section>
    );
}

// Eligibility Criteria Section
function EligibilityCriteria() {
    return (
        <section className="py-14">
            <h3 className="text-2xl font-semibold text-center mb-2">
                What are the Eligibility Criteria for Valid
            </h3>
            <h4 className="text-red-500 font-semibold text-center text-xl mb-6">
                Referrals in Affiliate Program?
            </h4>
            <p className="text-center text-gray-700 mb-7 max-w-2xl mx-auto">
                To qualify for commissions, your referred customers must meet certain criteria. This ensures quality applications and higher approval rates:
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-10 text-gray-700 max-w-4xl mx-auto">
                <ul className="flex-1 list-disc pl-5">
                    <li>
                        <span className="font-semibold">Income Criteria</span>
                        <ul className="list-disc pl-5">
                            <li>Minimum monthly income requirement applies</li>
                            <li>Income verification through bank statements or salary slips</li>
                            <li>Regular income pattern preferred for faster approvals</li>
                        </ul>
                    </li>
                    <li className="mt-3">
                        <span className="font-semibold">Banking Requirements</span>
                        <ul className="list-disc pl-5">
                            <li>Active bank account mandatory</li>
                            <li>Minimum 3-6 months banking history</li>
                            <li>Regular income credits reflected in statements</li>
                            <li>No cash-only income accepted</li>
                        </ul>
                    </li>
                    <li className="mt-3">
                        <span className="font-semibold">Genuine Loan Requirement</span>
                        <ul className="list-disc pl-5">
                            <li>Applicant must have legitimate need for instant loan</li>
                            <li>Should be applying voluntarily (no forced applications)</li>
                            <li>Must meet basic credit criteria</li>
                        </ul>
                    </li>
                </ul>
                <ul className="flex-1 list-disc pl-5">
                    <li>
                        <span className="font-semibold">Age Requirement</span>
                        <ul className="list-disc pl-5">
                            <li>Applicants must be between 25 to 50 years old</li>
                            <li>Valid age proof required during application</li>
                        </ul>
                    </li>
                    <li className="mt-3">
                        <span className="font-semibold">Location Coverage</span>
                        <ul className="list-disc pl-5">
                            <li>Customers must be from cities where LoanInNeed operates</li>
                        </ul>
                    </li>
                    <li className="mt-3">
                        <span className="font-semibold">Employment Status</span>
                        <ul className="list-disc pl-5">
                            <li>Open to both salaried and self-employed individuals</li>
                            <li>Stable income source required</li>
                            <li>Business owners and entrepreneurs welcome</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
    );
}

// Call-To-Action Section
function AffiliateCTA() {
    return (
        <section className="bg-red-500 rounded-xl py-10 px-5 mt-8 flex flex-col items-center text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Join our affiliate program</h3>
            <p className="mb-4 text-lg">
                Zero investment, instant payouts, and high commissions. Partner with India&apos;s trusted digital loan provider. Apply now!
            </p>
            <button className="bg-white text-red-500 font-semibold py-3 px-8 rounded-full shadow hover:bg-red-100 transition text-base mt-2">
                Connect now &rarr;
            </button>
        </section>
    );
}

