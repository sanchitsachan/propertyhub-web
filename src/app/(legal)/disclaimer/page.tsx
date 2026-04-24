import { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Disclaimer", description: "PropertyHub Disclaimer — limitations of liability and accuracy of information." };

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" updated="April 1, 2025">
      <h2>1. General Disclaimer</h2>
      <p>The information provided on PropertyHub is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the information, products, services, or related graphics.</p>

      <h2>2. Property Listings</h2>
      <p>Property listings on PropertyHub are provided by property owners, agents, and developers. We do not independently verify the accuracy of:</p>
      <ul>
        <li>Property prices and availability</li>
        <li>Property descriptions, images, and specifications</li>
        <li>Legal status and ownership of properties</li>
        <li>Builder/developer claims and promises</li>
      </ul>
      <p>Users are advised to independently verify all property details before making any purchase, rental, or investment decisions.</p>

      <h2>3. Not Professional Advice</h2>
      <p>Content on PropertyHub does not constitute legal, financial, tax, or real estate advice. We recommend consulting with qualified professionals before making any property-related decisions.</p>

      <h2>4. Investment Risk</h2>
      <p>Real estate investments carry inherent risks. Property values may fluctuate, and past performance is not indicative of future results. PropertyHub is not responsible for any financial losses incurred through property transactions facilitated via our platform.</p>

      <h2>5. Third-Party Links</h2>
      <p>Our website may contain links to third-party websites. We have no control over the content, privacy policies, or practices of these sites and accept no responsibility for them.</p>

      <h2>6. Limitation of Liability</h2>
      <p>In no event shall PropertyHub, its directors, employees, or affiliates be liable for any loss or damage including, without limitation, indirect or consequential loss or damage arising from or in connection with the use of this website.</p>

      <h2>7. Contact</h2>
      <p>If you have concerns about any content on our platform, please contact us at legal@propertyhub.in</p>
    </LegalLayout>
  );
}
