"use client"

import { useState, useEffect } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


export default function Home() {
  const [temperatureData, setTemperatureData] = useState<{ timestamp: string; temperature: number }[]>([]);
  const [isHumidifierOn, setIsHumidifierOn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch temperature data (mocked or from API)
  useEffect(() => {
    async function fetchTemperatureData() {
      try {
        // Ganti URL berikut dengan endpoint API Anda
        // const response = await fetch("/api/temperature");
        // const data = await response.json();
        // setTemperatureData(data);
      } catch (error) {
        console.error("Failed to fetch temperature data:", error);
      }
    }

    fetchTemperatureData();
  }, []);

  // Handle humidifier toggle
  const toggleHumidifier = async () => {
    setLoading(true);
    try {
      // Kirim status baru ke endpoint API Anda
      const response = await fetch("/api/humidifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !isHumidifierOn }),
      });
      const result = await response.json();
      setIsHumidifierOn(result.status);
    } catch (error) {
      console.error("Failed to toggle humidifier:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Jumbotron Section */}
      <div className="relative w-full h-[500px] bg-gradient-to-r root-bg">
        <div className="container mx-auto px-4 flex items-center justify-center h-full">
          <div className="text-center text-white z-10 ">
            <h1 className="text-5xl font-bold mb-4">Selamat Datang di Smart Humidity Systems</h1>
            <p className="text-xl mb-6">Embedded System untuk mengatur kelembaban ruangan.</p>
            
            <Drawer>
              <DrawerTrigger 
                className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300 font-bold"
              >  
                Hubungkan Sekarang</DrawerTrigger>
              <DrawerContent className="h-3/4">
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  {/* <Button>Submit</Button> */}
                  <DrawerClose>
                    okok mase
                    {/* <Button variant="outline">Cancel</Button> */}
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

        </div>

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Background Image Placeholder */}

      </div>

      <div className="flex justify-center text-slate-900 z-10 -mt-12">
        <div className="flex flex-row gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-1">Mengatur Hidup Otomatis</h2>
            <p>Deskripsi singkat tentang fitur pertama yang luar biasa.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-1">Mengatur Hidup Otomatis</h2>
            <p>Deskripsi singkat tentang fitur pertama yang luar biasa.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-1">Mengatur Hidup Otomatis</h2>
            <p>Deskripsi singkat tentang fitur pertama yang luar biasa.</p>
          </div>



        </div>
      </div>
      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-12">

      </div>
    </div>
  );
}
