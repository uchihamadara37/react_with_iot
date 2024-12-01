"use server"

import { db } from "@/lib/firebaseAdmin"
import { addDoc, collection } from "firebase/firestore"

interface SensorData {
    ULTRASONIC_DISTANCE: number;
    humidity: number;
    jarak_ketinggian_air: number;
    nyala: string;
    otomatis: string;
    suhu: number;
    water_status: string;
  }

const addPost = async (formData : SensorData) => {
    const collectionRef = collection(db, 'posts')

    addDoc(collectionRef, {
        ULTRASONIC_DISTANCE: formData.ULTRASONIC_DISTANCE,
        humidity: formData.humidity,
        jarak_ketinggian_air: formData.jarak_ketinggian_air,
        nyala: formData.nyala,
        otomatis: formData.otomatis,
        suhu: formData.suhu,
        water_status: formData.water_status,
    })
}

export { addPost}