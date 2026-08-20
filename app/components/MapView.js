"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function MapView({ apartments, onMarkerClick }) {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markersRef = useRef([]);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current, {
                center: [47.5605, -52.7126], // Default: St. John's, Newfoundland
                zoom: 12,
                zoomControl: true,
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapRef.current);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
        const validApartments = apartments.filter(
            apt => apt.latitude && apt.longitude && !isNaN(apt.latitude) && !isNaN(apt.longitude)
        );

        validApartments.forEach(apt => {
            const marker = L.marker([apt.latitude, apt.longitude])
                .addTo(mapRef.current)
                .bindPopup(`
                    <div>
                        <strong>${apt.title}</strong><br>
                        ${apt.price}<br>
                        📍 ${apt.location}<br>
                        🛏️ ${apt.bedrooms} bedrooms
                    </div>
                `);
            marker.on("click", () => {
                if (onMarkerClick) {
                    onMarkerClick(apt);
                }
            });

            markersRef.current.push(marker);
        });
        if (validApartments.length > 0) {
            const group = L.featureGroup(markersRef.current);
            mapRef.current.fitBounds(group.getBounds(), { padding: [50, 50] });
        }

    }, [apartments, onMarkerClick]);

    return (
        <div 
            ref={mapContainerRef} 
            className="w-full h-[500px] rounded-xl border border-gray-700 overflow-hidden"
        />
    );
}