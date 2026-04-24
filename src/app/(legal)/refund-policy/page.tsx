import { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Refund Policy", description: "PropertyHub Refund Policy — our refund and cancellation terms." };

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" updated="April 1, 2025">
      <h2>1. Free Services</h2>
      <p>PropertyHub currently offers its core services free of charge, including:</p>
      <ul>
        <li>Property browsing and searching</li>
        <li>Submitting inquiries to agents</li>
        <li>Contacting property owners</li>
        <li>Basic property listing</li>
      </ul>
      <p>Since these services are free, no refund applies.</p>

      <h2>2. Premium Services</h2>
      <p>If you purchase any premium services (such as featured listings, premium agent subscriptions, or advertising packages), the following refund terms apply:</p>
      <ul>
        <li><strong>Within 24 hours:</strong> Full refund if the service has not been activated or utilized.</li>
        <li><strong>24 hours to 7 days:</strong> Pro-rata refund for unused portion of the service period.</li>
        <li><strong>After 7 days:</strong> No refund available unless the service was not delivered as described.</li>
      </ul>

      <h2>3. How to Request a Refund</h2>
      <p>To request a refund:</p>
      <ul>
        <li>Email us at billing@propertyhub.in with your order details</li>
        <li>Include your name, email, transaction ID, and reason for refund</li>
        <li>We will review your request within 3-5 business days</li>
      </ul>

      <h2>4. Refund Processing</h2>
      <p>Approved refunds will be processed within 7-10 business days. Refunds will be credited to the original payment method used during the transaction.</p>

      <h2>5. Non-Refundable Items</h2>
      <ul>
        <li>Services that have been fully utilized</li>
        <li>Listings that have already been published and received inquiries</li>
        <li>Custom services or consultations that have been delivered</li>
      </ul>

      <h2>6. Disputes</h2>
      <p>If you are not satisfied with our refund decision, you may escalate the matter by contacting our support team at support@propertyhub.in or calling +91-22-12345678.</p>

      <h2>7. Contact</h2>
      <p>For billing and refund inquiries: billing@propertyhub.in</p>
    </LegalLayout>
  );
}
