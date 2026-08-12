import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, FileText, Mail, Clock, CheckCircle } from 'lucide-react';
import Seo from '../components/Seo/Seo';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Eye,
      title: 'Information Collection',
      content: `We collect information you provide directly to us, including:
• Personal information (name, email, phone number) when you create an account
• Travel preferences, interests, and booking history
• Payment information when you make transactions
• Communications and feedback you send to us
• Photos and reviews you choose to share

We also automatically collect certain information when you use our services, including your IP address, device type, browser type, and usage patterns.`
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information, including:
• Encryption of sensitive data in transit and at rest
• Regular security assessments and updates
• Restricted access to personal information
• Secure servers and data centers
• Employee training on data protection

However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`
    },
    {
      icon: UserCheck,
      title: 'How We Use Your Information',
      content: `We use the information we collect to:
• Provide, maintain, and improve our services
• Process transactions and send related information
• Send you updates, newsletters, and marketing communications (with your consent)
• Respond to your comments, questions, and requests
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent fraudulent or unauthorized activities
• Personalize and improve your experience`
    },
    {
      icon: Shield,
      title: 'Information Sharing',
      content: `We may share your information in the following circumstances:
• With Local Buddies: When you book a local experience, relevant information is shared with them
• With other travelers: When you join a group trip, your profile may be visible to group members
• With service providers: Third parties that assist in operating our platform
• For legal compliance: When required by law or to protect our rights
• With your consent: In other circumstances with your explicit permission

We do not sell your personal information to third parties.`
    },
    {
      icon: FileText,
      title: 'Cookies and Tracking',
      content: `We use cookies and similar tracking technologies to:
• Remember your preferences and settings
• Understand how you use our platform
• Deliver personalized content and recommendations
• Improve our services and user experience

You can control cookies through your browser settings. Disabling cookies may affect some features of our platform.`
    },
    {
      icon: Clock,
      title: 'Data Retention',
      content: `We retain your information for as long as necessary to:
• Provide you with our services
• Comply with legal obligations
• Resolve disputes and enforce agreements
• Maintain business records

Account deletion requests are processed within 30 days. Some information may be retained for longer periods as required by law.`
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: `You have the right to:
• Access your personal information
• Correct inaccurate data
• Request deletion of your data
• Opt out of marketing communications
• Export your data in a portable format
• Restrict certain processing activities

To exercise these rights, contact us at keshabdas2003@gmail.com.`
    },
    {
      icon: Mail,
      title: 'Contact Us',
      content: `If you have any questions about this Privacy Policy, please contact us:

Email: keshabdas2003@gmail.com
Website: https://commute-go.vercel.app

We will respond to your inquiry within 30 days of receipt.`
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Seo
        title="Privacy Policy"
        description="Read the CommuteGo privacy policy. Learn how we collect, use, and protect your personal information across our travel platform."
        path="/privacy-policy"
        keywords="CommuteGo privacy policy, privacy, data protection, GDPR, data security"
      />
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-emerald-500/10"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/20 rounded-full blur-[128px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-4">
              Last updated: July 29, 2026
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              At CommuteGo, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
                <div className="text-gray-400 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold">Our Commitment</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              We are committed to protecting your privacy and ensuring your data is handled responsibly.
              If you have any concerns about how we handle your information, please don't hesitate to contact us.
              Your trust is important to us, and we will continue to work hard to earn and maintain it.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
