import { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Terms of Service", description: "PropertyHub Terms of Service — rules and conditions for using our platform." };

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="April 1, 2025">
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using PropertyHub (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

      <h2>2. Description of Service</h2>
      <p>PropertyHub is an online real estate platform that connects property buyers, sellers, tenants, and landlords with verified listings and licensed agents across India. We provide:</p>
      <ul>
        <li>Property listing and search services</li>
        <li>Agent directory and contact facilitation</li>
        <li>Property inquiry management</li>
        <li>Market insights and property information</li>
      </ul>

      <h2>3. User Accounts</h2>
      <p>To access certain features, you may need to create an account. You agree to:</p>
      <ul>
        <li>Provide accurate and complete registration information</li>
        <li>Maintain the security of your account credentials</li>
        <li>Accept responsibility for all activities under your account</li>
        <li>Notify us immediately of any unauthorized access</li>
      </ul>

      <h2>4. Property Listings</h2>
      <p>If you list a property on our platform, you represent and warrant that:</p>
      <ul>
        <li>You have the legal right to list the property</li>
        <li>All information provided is accurate and not misleading</li>
        <li>Listing images are genuine and represent the actual property</li>
        <li>Pricing information is current and accurate</li>
      </ul>
      <p>We reserve the right to remove any listing that violates these terms or is reported as fraudulent.</p>

      <h2>5. Prohibited Activities</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Post false, misleading, or fraudulent listings</li>
        <li>Harass or spam other users or agents</li>
        <li>Scrape or collect data from the platform without authorization</li>
        <li>Use the platform for any illegal purpose</li>
        <li>Attempt to circumvent security measures</li>
        <li>Impersonate another person or entity</li>
      </ul>

      <h2>6. Intellectual Property</h2>
      <p>All content on PropertyHub, including logos, text, images, and software, is owned by PropertyHub or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our permission.</p>

      <h2>7. Disclaimer of Warranties</h2>
      <p>PropertyHub is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy of property listings, agent information, or pricing. We are not a party to any transaction between users.</p>

      <h2>8. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, PropertyHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.</p>

      <h2>9. Indemnification</h2>
      <p>You agree to indemnify and hold harmless PropertyHub, its officers, directors, employees, and agents from any claims arising from your use of the platform or violation of these terms.</p>

      <h2>10. Termination</h2>
      <p>We may terminate or suspend your account at any time for violations of these terms. You may also delete your account at any time by contacting support.</p>

      <h2>11. Governing Law</h2>
      <p>These terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.</p>

      <h2>12. Contact</h2>
      <p>For questions about these Terms, contact us at legal@propertyhub.in</p>
    </LegalLayout>
  );
}
