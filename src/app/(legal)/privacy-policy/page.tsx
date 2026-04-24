import { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Privacy Policy", description: "PropertyHub Privacy Policy — how we collect, use, and protect your data." };

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="April 1, 2025">
      <h2>1. Information We Collect</h2>
      <p>We collect the following types of information when you use PropertyHub:</p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, and other details you provide when creating an account, submitting inquiries, or listing properties.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our platform, including pages visited, search queries, time spent on pages, and device information.</li>
        <li><strong>Location Data:</strong> With your consent, we may collect your location to provide location-based property recommendations.</li>
        <li><strong>Cookies & Tracking:</strong> We use cookies and similar technologies to enhance your experience. See our Cookie Policy for details.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information for the following purposes:</p>
      <ul>
        <li>To provide and maintain our property listing services</li>
        <li>To connect you with property agents and owners</li>
        <li>To send property alerts, newsletters, and promotional communications (with your consent)</li>
        <li>To improve our platform and user experience</li>
        <li>To prevent fraud and ensure security</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>We do not sell your personal information. We may share your data with:</p>
      <ul>
        <li><strong>Property Agents:</strong> When you submit an inquiry, your contact details are shared with the listing agent.</li>
        <li><strong>Service Providers:</strong> Third-party services that help us operate (hosting, analytics, email delivery).</li>
        <li><strong>Legal Requirements:</strong> When required by law, court order, or government authority.</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>We implement industry-standard security measures including encryption, secure servers, and access controls to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>

      <h2>5. Data Retention</h2>
      <p>We retain your personal data for as long as your account is active or as needed to provide services. You can request deletion of your data at any time by contacting us.</p>

      <h2>6. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Opt-out of marketing communications</li>
        <li>Withdraw consent for data processing</li>
      </ul>

      <h2>7. Children&apos;s Privacy</h2>
      <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.</p>

      <h2>8. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.</p>

      <h2>9. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at:</p>
      <ul>
        <li>Email: privacy@propertyhub.in</li>
        <li>Phone: +91-22-12345678</li>
        <li>Address: Lower Parel, Mumbai, Maharashtra, India</li>
      </ul>
    </LegalLayout>
  );
}
