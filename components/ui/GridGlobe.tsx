"use client";

import React from "react";
import dynamic from "next/dynamic";

const World = dynamic(
  () => import("./Globe").then((m) => m.World),
  {
    ssr: false,
  }
);

const GridGlobe = () => {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1800,
    arcLength: 0.5,
    rings: 2,
    maxRings: 3.5,
    initialPosition: {
      lat: 22.3193,
      lng: 114.1694,
    },
    autoRotate: true,
    autoRotateSpeed: 0.6,
  };

  const colors = [
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#CBACF9",
    "#a855f7",
  ];

  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.15,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.25,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.45,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.25,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.45,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.55,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.25,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.25,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.55,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 6,
      startLat: 37.5665,
      startLng: 126.978,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 7,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.2,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.2,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 7,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.25,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 8,
      startLat: -8.833221,
      startLng: 13.264837,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.25,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 8,
      startLat: 49.2827,
      startLng: -123.1207,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.25,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 8,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.45,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 9,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.25,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 9,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.55,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 9,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.45,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 10,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.55,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 10,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 10,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 11,
      startLat: 41.9028,
      startLng: 12.4964,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.25,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 11,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.25,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 11,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.25,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 12,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.15,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 12,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.25,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 12,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 13,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 13,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 13,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.15,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.35,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
    },
  ];

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-0
        z-0
        h-[220px]
        w-full
        overflow-hidden

        sm:h-[300px]
        md:h-[380px]
        lg:h-[420px]
        xl:h-[460px]
      "
    >
      {/* 
        Canvas layer.

        On desktop/tablet the globe is fully visible.
        On mobile the globe itself is moved downward by Globe.tsx,
        allowing this container to naturally crop the bottom.
      */}
      <div className="absolute inset-0">
        <World
          data={sampleArcs}
          globeConfig={globeConfig}
        />
      </div>

      {/*
        Mobile fade.

        The fade starts relatively high on mobile because
        only the upper portion of the globe should remain
        visually prominent.

        It becomes smaller on larger screens because the
        globe is intended to remain completely visible.
      */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-20
          h-20
          bg-gradient-to-t
          from-[#04071d]
          via-[#04071d]/80
          to-transparent

          sm:h-16
          md:h-12
          lg:h-10
        "
      />

      {/*
        Additional subtle top fade on very small screens.

        This helps integrate the globe into the Bento card
        instead of creating a hard visual boundary.
      */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-20
          h-8
          bg-gradient-to-b
          from-[#04071d]/20
          to-transparent

          sm:hidden
        "
      />
    </div>
  );
};

export default GridGlobe;