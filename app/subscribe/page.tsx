"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button"; // Adjust path if necessary
import Header from "@/components/Header"; // Adjust path if necessary

const SubscribePage = () => {
  const router = useRouter();

  // Handler for going back or redirecting to another page
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Header component */}
      <Header>
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center text-white">Subscribe to Groove Wave music</h1>
        </div>
      </Header>

      {/* Subscription Page Content */}
      <div className="flex flex-col items-center justify-center p-6">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-lg w-full">
          <p className="text-lg mb-4 text-center text-gray-300">
            Unlock premium features, exclusive content, and more. Choose your plan and start now!
          </p>

          {/* Subscription Plans */}
          <div className="space-y-6 mb-6">
            {/* Basic Plan */}
            <div className="flex flex-col bg-gray-700 p-6 rounded-md shadow-md hover:scale-105 transition-transform">
              <h2 className="text-xl font-semibold text-blue-400 mb-2">Individual</h2>
              <p className="text-sm text-gray-400 mb-4">
              *  1 Premium account <br />
              *  Cancel anytime <br />
              *  Subscribe or one-time payment <br />
              </p>
              <Button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-500">
                Subscribe Now - Rs.59/ 3 month <br />
                Rs.119/month after 
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="flex flex-col bg-gray-700 p-6 rounded-md shadow-md hover:scale-105 transition-transform">
              <h2 className="text-xl font-semibold text-green-400 mb-2">Mini</h2>
              <p className="text-sm text-gray-400 mb-4">
                * 1 mobile-only Premium account <br />
                * Offline listening of up to 30 songs on 1 device <br />
                * One-time payment <br />
                * Basic audio quality
              </p>
              <Button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-500">
                Subscribe Now - Rs. 29/1 week
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="flex flex-col bg-gray-700 p-6 rounded-md shadow-md hover:scale-105 transition-transform">
              <h2 className="text-xl font-semibold text-purple-400 mb-2">Family</h2>
              <p className="text-sm text-gray-400 mb-4">
              *  Designed for businesses or creators. Includes premium support and tools.  <br />
              *  Up to 6 Premium account  <br />
              *  Control content marked as explicit <br />
              *  Cancel anytime <br />
              *  Subscribe or one-time payment <br />
              </p>
              <Button className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-500">
                Subscribe Now - Rs 179/2 months <br />
                Rs.119/month after 
              </Button>
            </div>
          </div>

          {/* Go Back Button */}
          <Button
            onClick={handleGoBack}
            className="w-full bg-gray-600 text-white py-3 rounded-md hover:bg-gray-500"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );

};
export default SubscribePage;
