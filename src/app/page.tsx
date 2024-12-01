"use client"

import { useState, useEffect, useCallback } from "react";

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
import { AlertTitle } from "@/components/ui/alert"

import { Switch } from "@/components/ui/switch"


import app from "@/lib/firebaseAdmin";
import { getDatabase, ref, set, onValue } from "firebase/database";




export default function Home() {
  // const [temperatureData, setTemperatureData] = useState<{ timestamp: string; temperature: number }[]>([]);
  // const [isHumidifierOn, setIsHumidifierOn] = useState(false);
  // const [loading, setLoading] = useState(false);

  const [isNyala, setIsNyala] = useState(false);
  const [isAuto, setIsAuto] = useState(false);


  useEffect(() => {
    const db = getDatabase(app);
    const rootRef = ref(db);

    const unsubscribe = onValue(rootRef, (snapshot) => {
      const data = snapshot.val();

      // Akses data spesifik
      const otoma = data.otomatis;
      const nyalai = data.nyala;

      console.log("Otomatis status:", otoma);
      console.log("Nyala status:", nyalai);

      // Update state setelah data diterima
      setIsNyala(nyalai === "on");
      setIsAuto(otoma === "on")
    }, (error) => {
      console.error("Error reading data:", error);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);


  const handleSetAuto = useCallback(async (checked: boolean) => {
    setIsAuto(checked)
    console.log('Mode otomatis:', checked ? 'Aktif' : 'Non-aktif');

    const db = getDatabase(app);
    const onOf = isAuto ? "off" : "on"
    set(ref(db, "otomatis"), onOf)
      .then(() => {
        console.log("auto saved successfully");
      })
      .catch((error) => {
        console.error("Error saving ikan status:", error);
      });

  }, [isAuto]);

  const handleSetNyala = useCallback(async (checked: boolean) => {
    setIsNyala(checked)
    console.log('Mode Nyala:', checked ? 'Aktif' : 'Non-aktif');

    const db = getDatabase(app);
    const onOf = isNyala ? "off" : "on"
    set(ref(db, "nyala"), onOf)
      .then(() => {
        console.log("nyala saved successfully");
      })
      .catch((error) => {
        console.error("Error nyala:", error);
      });

  }, [isNyala]);



  // Fetch temperature data (mocked or from API)
  useEffect(() => {
    async function fetchTemperatureData() {
      try {

      } catch (error) {
        console.error("Failed to fetch temperature data:", error);
      }
    }

    fetchTemperatureData();
  }, []);

  // Handle humidifier toggle
  // const toggleHumidifier = async () => {
  //   setLoading(true);
  //   try {
  //     // Kirim status baru ke endpoint API Anda
  //     const response = await fetch("/api/humidifier", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ status: !isHumidifierOn }),
  //     });
  //     const result = await response.json();
  //     setIsHumidifierOn(result.status);
  //   } catch (error) {
  //     console.error("Failed to toggle humidifier:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col bg-slate-200" id="ayo">
      {/* Jumbotron Section */}
      <div className="relative w-full h-[700px] bg-gradient-to-r root-bg">
        <div className="container mx-auto px-4 flex  justify-center h-full">
          <div className="text-center text-white z-10 ">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 mt-20">Selamat Datang di Smart Humidity System</h1>
            <p className="text-lg lg:text-xl mb-6">Embedded System untuk mengatur kelembapan ruangan.</p>

            <Drawer>
              <DrawerTrigger

                className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300 font-bold mt-10"
              >
                Kontrol Sekarang</DrawerTrigger>
              <DrawerContent className="h-4/5">
                <DrawerHeader >
                  <DrawerTitle className="text-center text-violet-500 text-xl">Terdapat beberapa kontroler di sini. Silakan diatur Master..</DrawerTitle>
                  <DrawerDescription className="text-center text-violet-700">Setiap tindakan tidak dapat dikembalikan.</DrawerDescription>
                </DrawerHeader>
                <div className="flex w-5/6 lg:w-1/2 flex-col items-center justify-center mx-auto mt-4 lg:mt-10">
                  <div className="flex-initial w-full mb-2">
                    <AlertTitle className="font-medium text-slate-800 text-lg">Status data dari microController ESP32!</AlertTitle>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-center w-full gap-3">
                    <div className="flex-initial w-full lg:w-1/3 border border-orange-500 rounded-md p-4">
                      Suhu : { } &deg;C
                    </div>
                    <div className="flex-initial w-full lg:w-1/3  border-2 border-fuchsia-300 rounded-md p-4">
                      Kelembapan : { }% RH
                    </div>
                    <div className="flex-initial w-full lg:w-1/3 border-2 border-blue-500 rounded-md p-4">
                      Ketinggian air : { } cm
                    </div>

                  </div>

                  <div className="flex-initial w-full mb-2 mt-10">
                    <AlertTitle className="font-medium text-slate-800 text-lg">Kontrol Manual</AlertTitle>
                  </div>
                  <div className="flex flex-col lg:flex-row w-full gap-3">
                    <div className="flex-initial w-full lg:w-1/3 border border-purple-400 rounded-md p-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" checked={isAuto} onCheckedChange={handleSetAuto} />
                        <label htmlFor="airplane-mode">{isAuto ? 'Otomatis on' : 'Otomatis off'}</label>
                      </div>
                    </div>
                    {!isAuto && (
                      <div className="flex-initial w-full lg:w-1/3  border border-purple-600 rounded-md p-4">
                        <div className="flex items-center space-x-2">
                          <Switch checked={isNyala} onCheckedChange={handleSetNyala} id="airplane-mode" />
                          <label htmlFor="airplane-mode">{isNyala ? 'Pelembab hidup' : 'Pelembab mati'}</label>
                        </div>
                      </div>

                    )}


                  </div>
                </div>
                <DrawerFooter className="">
                  {/* <Button>Submit</Button> */}
                  <DrawerClose>
                    @andalf.md_2024
                    {/* <Button variant="outline">Cancel</Button> */}
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

        </div>

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Background Image Placeholder */}

      </div>

      <div className="flex justify-center text-slate-900 z-10 -mt-72 lg:-mt-80">
        <div className="flex flex-col lg:flex-row gap-6 w-10/12">
          <div className="flex flex-col justify-center items-center bg-slate-100 p-2 py-8 lg:p-6 text-sm lg:text-base rounded-2xl shadow-xl w-full lg:w-1/3">
            <h2 className="text-xl lg:text-3xl text-center font-semibold lg:mb-6 mb-4 text-blue-800">Team Consist : </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Andrea Alfian S. P.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 123220078 | IoT - IF B</li>
              <li>Kristoper Frederik H.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 123220075 | IoT - IF B</li>
              <li>Rizki Aprilia INez&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 1232200 | IoT - IF B</li>
              <li>Vrida Pusparani&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 123220082 | IoT - IF B</li>
              <li>Erlyta Rahma Nan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 1232200 | IoT - IF B</li>
            </ol>
          </div>
          <div className="bg-slate-100 p-9 rounded-2xl shadow-xl w-full lg:w-1/3 text-sm lg:text-base">
            <h2 className="text-xl lg:text-3xl font-semibold text-center mb-5 text-blue-800">Mengatur Kelembaban Ruangan Otomatis</h2>
            <p className="indent-9 text-justify mb-2">
              Sistem Pemantauan dan Pengendalian Kelembaban Ruangan Otomatis adalah solusi berbasis teknologi yang dirancang untuk menjaga tingkat kelembaban udara di ruangan agar tetap optimal. Sistem ini menggunakan sensor kelembaban (seperti DHT11 atau DHT22) untuk mendeteksi tingkat kelembaban secara real-time, yang kemudian diproses oleh mikrokontroler ESP32.
            </p>
            <p className="indent-9 text-justify">
              Jika kelembaban berada di luar batas yang telah ditentukan, perangkat seperti humidifier atau kipas akan diaktifkan secara otomatis untuk menyesuaikan kondisi udara. Sistem ini sangat berguna untuk lingkungan seperti rumah kaca, laboratorium, atau ruangan dengan kebutuhan khusus, karena dapat meningkatkan efisiensi, dan kenyamanan. Dengan pengaturan otomatis, pengguna tidak perlu khawatir memantau kondisi ruangan secara manual.
            </p>
          </div>
          <div className="flex flex-col justify-center bg-slate-100 p-10 rounded-2xl shadow-lg w-full lg:w-1/3 mb-7 lg:mb-0 text-sm lg:text-base">
            <h2 className="text-3xl font-semibold  text-center mb-6 text-blue-800">Control By Website.</h2>
            <p className="text-center">Sistem ini dapat dikontrol manual ataupun otomatis melalui website ini. Jika anda minat mengontrol langsung saja mencobanya. <a href="#ayo" className="text-red-500">Let's get it!</a></p>
          </div>



        </div>
      </div>
    </div>
  );
}
