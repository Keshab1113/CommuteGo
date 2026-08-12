import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, User, MapPin, CreditCard, Ban, Mail, Scale, Globe, Shield } from 'lucide-react';
import Seo from '../components/Seo/Seo';

const TermsOfService = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Agreement to Terms',
      content: `By accessing and using CommuteGo ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.

These Terms constitute a legally binding agreement between you and CommuteGo regarding your use of the Platform and its services.

By using our Platform, you represent that you are at least 18 years old and have the legal capacity to enter into this agreement.`
    },
    {
      icon: User,
      title: 'User Accounts',
      content: `To access certain features, you must create an account. When creating an account, you agree to:
• Provide accurate, current, and complete information
• Maintain and update your information to keep it accurate
• Keep your password secure and confidential
• Notify us immediately of any unauthorized access
• Accept responsibility for all activities under your account

We reserve the right to suspend or terminate accounts that violate these Terms.`
    },
    {
      icon: MapPin,
      title: 'Services Description',
      content: `CommuteGo provides a three-pillar travel platform:

1. Hidden Destinations: Information and discovery of lesser-known travel destinations
2. Local Buddies: Connection with local experts who provide guided experiences
3. Travel Matchmaking: Platform for finding travel companions

We act as an intermediary between travelers and Local Buddies. We are not a travel agency, tour operator, or transportation provider.`
    },
    {
      icon: CreditCard,
      title: 'Payments and Billing',
      content: `• All payments for Local Buddy experiences are processed through our secure payment system
• Prices are set by Local Buddies and may vary
• Refund policies are determined by individual Local Buddies
• CommuteGo charges a service fee for platform usage
• You authorize us to charge your payment method for all fees

Currency conversion rates may apply for international transactions.`
    },
    {
      icon: Ban,
      title: 'User Conduct',
      content: `You agree NOT to:
• Use our Platform for any illegal or unauthorized purpose
• Violate any laws in your jurisdiction
• Infringe on intellectual property rights
• Upload viruses or malicious code
• Harass, abuse, or harm other users
• Impersonate any person or entity
• Spam or solicit other users
• Interfere with the normal operation of the Platform

Violations may result in account suspension or termination without refund.`
    },
    {
      icon: AlertTriangle,
      title: 'Local Buddy Responsibilities',
      content: `Local Buddies agree to:
• Provide accurate information about their services
• Deliver services as described and promised
• Treat all travelers with respect and dignity
• Maintain appropriate safety standards
• Comply with all applicable laws and regulations
• Respond to bookings and inquiries in a timely manner
• Not engage in discriminatory practices
• Respect the privacy and confidentiality of travelers

Local Buddies are independent contractors, not employees of CommuteGo.`
    },
    {
      icon: Scale,
      title: 'Limitation of Liability',
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:

CommuteGo shall not be liable for:
• Any indirect, incidental, special, consequential, or punitive damages
• Loss of profits, revenue, data, or use
• Conduct of other users or third parties
• Personal injury or property damage
• Errors, mistakes, or inaccuracies in content
• Service interruptions or technical failures

Our total liability shall not exceed the amount you paid to us in the past 12 months.`
    },
    {
      icon: Shield,
      title: 'Indemnification',
      content: `You agree to indemnify, defend, and hold harmless CommuteGo, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including legal fees) arising out of:
• Your use of the Platform
• Your violation of these Terms
• Your violation of any rights of a third party
• Any prohibited user conduct`
    },
    {
      icon: FileText,
      title: 'Intellectual Property',
      content: `All content on the Platform, including but not limited to text, graphics, logos, images, and software, is the property of CommuteGo or its content suppliers and is protected by copyright laws.

You retain ownership of content you create and share on the Platform. By posting content, you grant us a non-exclusive, transferable, sub-licensable, royalty-free license to use, reproduce, and distribute your content.

You may not use our trademarks, logos, or branding without our prior written consent.`
    },
    {
      icon: Globe,
      title: 'Third-Party Links',
      content: `Our Platform may contain links to third-party websites or services that are not owned or controlled by CommuteGo. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.

You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by or in connection with the use of such third-party content, goods, or services.`
    },
    {
      icon: AlertTriangle,
      title: 'Disclaimer of Warranties',
      content: `OUR PLATFORM AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.

WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
• Implied warranties of merchantability
• Fitness for a particular purpose
• Non-infringement
• Accuracy of information
• Continuous, uninterrupted, or secure access

We do not guarantee that the Platform will meet your specific requirements.`
    },
    {
      icon: FileText,
      title: 'Modifications to Terms',
      content: `We reserve the right to modify these Terms at any time. We will provide notice of material changes by:
• Posting the updated Terms on the Platform
• Updating the "Last updated" date
• Sending an email notification (for significant changes)

Your continued use of the Platform after changes constitutes acceptance of the modified Terms.

We encourage you to review these Terms periodically.`
    },
    {
      icon: Mail,
      title: 'Contact Information',
      content: `If you have any questions about these Terms, please contact us:

Email: keshabdas2003@gmail.com
Website: https://commute-go.vercel.app

We will respond to your inquiry within 30 days of receipt.

For legal notices, please send to the address provided above.`
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Seo
        title="Terms of Service"
        description="Read the CommuteGo terms of service. The agreement that governs your use of the CommuteGo travel platform."
        path="/terms-of-service"
        keywords="CommuteGo terms of service, user agreement, platform terms"
      />
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-transparent to-emerald-500/10"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-500/20 rounded-full blur-[128px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-rose-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-rose-500/25">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-4">
              Last updated: July 29, 2026
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Please read these terms carefully before using CommuteGo. These terms govern your use of our platform and services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-8 rounded-3xl bg-[#1C1B1B] border border-gray-800"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-emerald-500/20 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-rose-400" />
                  </div>
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
                <div className="text-gray-400 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Agreement Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-rose-500/10 to-emerald-500/10 border border-rose-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold">Your Agreement</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              By using CommuteGo, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              If you do not agree to these Terms, please discontinue use of our Platform immediately.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
