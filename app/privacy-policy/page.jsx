import Navbar from "@/components/common/navbar/Navbar";

export default function PrivacyPolicy() {
  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Privacy Policy
          </h1>

          <div className="space-y-8 bg-white p-8 rounded-lg shadow-md">
            {/* Introduction */}
            <section className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                When you use the Adbiyas Tour website, we are committed to
                protecting the privacy of the personal information you give us.
                This Privacy Statement explains how we handle any personal data
                we learn about you via your visit to www.adbiyastour.com
              </p>
            </section>

            {/* Privacy Promise */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Privacy Policy Promise
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our capacity to deliver excellent service is based on knowledge,
                but our most valuable resource is the trust of our customers. At
                Adbiyas tour we place a high value on protecting client
                information and only using it as they would intend.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>
                  Any information our clients choose to share with us will be
                  kept secure and confidential at all times.
                </li>
                <li>
                  We will only collect and use the minimal amount of customer
                  information necessary.
                </li>
                <li>
                  We will only give access to approved staff members who have
                  received proper training.
                </li>
                <li>
                  We will not reveal customer information to external
                  organizations unless required.
                </li>
              </ul>
            </section>

            {/* Information Collection */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Information We Collect
              </h2>

              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-700">General:</h3>
                <p className="text-gray-600 leading-relaxed">
                  We collect personally identifiable information including your
                  name, address, phone number, and email address. We never
                  purposefully gather personal data from children under the age
                  of thirteen.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-700">
                  Web Site Usage Information:
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We collect information about your computer and browsing
                  patterns through cookies and similar technologies.
                </p>
              </div>
            </section>

            {/* Information Usage */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                How We Use Information
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>
                  For the purposes for which you specifically provided the
                  information
                </li>
                <li>
                  To send you notifications about our products and services
                </li>
                <li>To enhance existing features or develop new features</li>
                <li>To personalize content and advertising</li>
                <li>To combine with information from other services you use</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookie technology to make it easier for visitors and
                customers to navigate our site. A cookie is a string of data
                that a website sends to your computer, which it then stores on
                your hard drive or momentarily in memory.
              </p>
            </section>

            {/* Security */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Security</h2>
              <p className="text-gray-600 leading-relaxed">
                Access servers house the personally identifiable data we have
                collected about you. We'll continue to take precautions to
                ensure the security of these systems and your personally
                identifiable data.
              </p>
            </section>

            {/* Policy Modifications */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Policy Modifications
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This privacy statement may vary from time to time. Any changes
                will be announced here, so be sure to check back frequently. We
                won't use your personal data in a way that materially violates
                this Privacy Policy without first getting your permission.
              </p>
            </section>

            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Comments and Questions
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions, comments, or concerns about our
                Privacy Policy, please contact us.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
