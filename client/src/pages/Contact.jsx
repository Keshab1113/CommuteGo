import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { WorldMap } from "../components/ui/world-map";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ThemeContext } from "../context/ThemeContext";

export default function Contact() {
  const { darkMode } = useContext(ThemeContext);
  const dots = [
    {
      start: { lat: 40.7128, lng: -74.006 },
      end: { lat: 51.5074, lng: -0.1278 },
    },
    {
      start: { lat: 35.6762, lng: 139.6503 },
      end: { lat: -33.8688, lng: 151.2093 },
    },
    // Add more dot pairs as needed
  ];

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center w-full bg-gradient-to-b from-background to-secondary p-4 ${darkMode ? 'bg-[#070707]' : 'bg-gradient-to-b from-white to-cyan-100'}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl md:p-20 p-4"
      >
        <h1 className={`text-center text-4xl font-bold mb-2 ${darkMode ? 'text-cyan-600' : 'text-cyan-600'}`}>
          Welcome To The Help Centre
        </h1>
        <p className="text-2xl text-center mb-8 text-cyan-600">We're available 24/7</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className={`${darkMode ? 'bg-gray-100' : 'bg-gray-100'}`}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  For anything urgent, you can call us 24/7 on a local or
                  international phone number.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  For any query, you can contact us through{" "}
                  <a
                    href="mailto:keshabdas2003@gmail.com"
                    className="text-primary hover:underline"
                  >
                    keshabdas2003@gmail.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <WorldMap
            dots={[
              {
                start: {
                  lat: 64.2008,
                  lng: -149.4937,
                }, // Alaska (Fairbanks)
                end: {
                  lat: 34.0522,
                  lng: -118.2437,
                }, // Los Angeles
              },
              {
                start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              },
              {
                start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
              },
              {
                start: { lat: 51.5074, lng: -0.1278 }, // London
                end: { lat: 28.6139, lng: 77.209 }, // New Delhi
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
              },
            ]}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
