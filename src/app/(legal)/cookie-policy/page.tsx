import { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Cookie Policy", description: "PropertyHub Cookie Policy — how we use cookies and similar technologies." };

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="April 1, 2025">
      <h2>1. What Are Cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.</p>

      <h2>2. Types of Cookies We Use</h2>

      <h3>Essential Cookies</h3>
      <p>These cookies are necessary for the website to function properly. They enable core functionality such as security, session management, and accessibility. You cannot opt out of these cookies.</p>

      <h3>Analytics Cookies</h3>
      <p>We use analytics cookies (such as Google Analytics) to understand how visitors interact with our website. This helps us improve our platform. Data collected includes pages visited, time spent, and general location.</p>

      <h3>Functional Cookies</h3>
      <p>These cookies remember your preferences and choices, such as language settings, search filters, and recently viewed properties.</p>

      <h3>Marketing Cookies</h3>
      <p>With your consent, we may use marketing cookies to deliver personalized property recommendations and advertisements based on your browsing behavior.</p>

      <h2>3. Third-Party Cookies</h2>
      <p>Some cookies are placed by third-party services we use, including:</p>
      <ul>
        <li>Google Analytics — website usage analytics</li>
        <li>Google Maps — property location display</li>
        <li>Social media platforms — sharing functionality</li>
      </ul>

      <h2>4. Managing Cookies</h2>
      <p>You can control and delete cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.</p>
      <ul>
        <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
        <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
        <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
        <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
      </ul>

      <h2>5. Updates</h2>
      <p>We may update this Cookie Policy periodically. Changes will be posted on this page with an updated date.</p>

      <h2>6. Contact</h2>
      <p>For questions about cookies, contact us at privacy@propertyhub.in</p>
    </LegalLayout>
  );
}
