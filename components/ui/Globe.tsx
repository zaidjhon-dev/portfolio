"use client";

import { useEffect, useRef, useState } from "react";
import {
  Color,
  Vector3,
} from "three";
import ThreeGlobe from "three-globe";
import {
  useThree,
  Object3DNode,
  Canvas,
  extend,
} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const cameraZ = 175;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data }: WorldProps) {
  const [globeData, setGlobeData] = useState<
    {
      size: number;
      order: number;
      color: (t: number) => string;
      lat: number;
      lng: number;
    }[] | null
  >(null);

  const globeRef = useRef<ThreeGlobe | null>(null);

  const defaultProps = {
    pointSize: 1.5,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.15,
    polygonColor: "rgba(255,255,255,0.75)",
    globeColor: "#062056",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.5,
    rings: 2,
    maxRings: 3.5,
    ...globeConfig,
  };

  const _buildMaterial = () => {
    if (!globeRef.current) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };

    if (globeMaterial) {
      globeMaterial.color = new Color(
        globeConfig.globeColor || defaultProps.globeColor
      );

      globeMaterial.emissive = new Color(
        globeConfig.emissive || defaultProps.emissive
      );

      globeMaterial.emissiveIntensity =
        globeConfig.emissiveIntensity ?? defaultProps.emissiveIntensity;

      globeMaterial.shininess =
        globeConfig.shininess ?? defaultProps.shininess;
    }
  };

  const _buildData = () => {
    const arcs = data;
    const points: {
      size: number;
      order: number;
      color: (t: number) => string;
      lat: number;
      lng: number;
    }[] = [];

    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];

      const rgb = hexToRgb(arc.color) as {
        r: number;
        g: number;
        b: number;
      } | null;

      const r = rgb?.r ?? 203;
      const g = rgb?.g ?? 172;
      const b = rgb?.b ?? 249;

      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: (t: number) =>
          `rgba(${r}, ${g}, ${b}, ${Math.max(0, 1 - t)})`,
        lat: arc.startLat,
        lng: arc.startLng,
      });

      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: (t: number) =>
          `rgba(${r}, ${g}, ${b}, ${Math.max(0, 1 - t)})`,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) =>
              v2[k as "lat" | "lng"] ===
              v[k as "lat" | "lng"]
          )
        ) === i
    );

    setGlobeData(filteredPoints);
  };

  useEffect(() => {
    _buildData();
    _buildMaterial();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  useEffect(() => {
    if (!globeRef.current || !globeData) return;

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    startAnimation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globeData]);

  const startAnimation = () => {
    if (!globeRef.current || !globeData) return;

    globeRef.current
      .arcsData(data)
      .arcStartLat(
        (d) => (d as { startLat: number }).startLat
      )
      .arcStartLng(
        (d) => (d as { startLng: number }).startLng
      )
      .arcEndLat(
        (d) => (d as { endLat: number }).endLat
      )
      .arcEndLng(
        (d) => (d as { endLng: number }).endLng
      )
      .arcColor((e: any) => [
        (e as { color: string }).color,
        "#CBACF9",
      ])
      .arcAltitude((e) =>
        Math.max(
          0.15,
          (e as { arcAlt: number }).arcAlt
        )
      )
      .arcStroke(() => 0.5)
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap(
        (e) => (e as { order: number }).order * 0.8
      )
      .arcDashGap(3)
      .arcDashAnimateTime(
        () => defaultProps.arcTime
      );

    globeRef.current
      .pointsData(globeData)
      .pointColor((e) =>
        (e as { color: any }).color(0.2)
      )
      .pointsMerge(true)
      .pointAltitude(0.01)
      .pointRadius(defaultProps.pointSize);

    globeRef.current
      .ringsData([])
      .ringColor(
        (e: any) => (t: any) =>
          e.color
            ? e.color(t)
            : `rgba(203, 172, 249, ${Math.max(
                0,
                1 - t
              )})`
      )
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) /
          defaultProps.rings
      );
  };

  /**
   * Responsive globe positioning.
   *
   * ThreeGlobe's default radius is approximately 100.
   *
   * Desktop/tablet:
   * - scale ~0.72
   * - centered vertically
   *
   * Mobile:
   * - smaller scale
   * - shifted downward
   * - parent container clips the lower portion
   */
  const ResponsiveGlobeTransform = () => {
    const { size } = useThree();

    useEffect(() => {
      if (!globeRef.current) return;

      const width = size.width;

      let scale = 0.72;
      let y = 0;

      if (width < 480) {
        // Small phones
        scale = 0.56;
        y = -48;
      } else if (width < 640) {
        // Large phones
        scale = 0.60;
        y = -44;
      } else if (width < 768) {
        // Small tablets
        scale = 0.68;
        y = 0;
      } else if (width < 1024) {
        // Tablets
        scale = 0.71;
        y = 0;
      } else if (width < 1280) {
        // Small desktops
        scale = 0.72;
        y = 0;
      } else {
        // Large desktops
        scale = 0.74;
        y = 0;
      }

      globeRef.current.scale.setScalar(scale);
      globeRef.current.position.set(0, y, 0);
    }, [size.width, size.height]);

    return null;
  };

  return (
    <>
      <ResponsiveGlobeTransform />

      <threeGlobe ref={globeRef} />
    </>
  );
}

export function WebGLRendererConfig() {
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor(0x000000, 0);
  }, [gl]);

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;

  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: true,
      }}
      dpr={[1, 1.75]}
      camera={{
        fov: 50,
        near: 50,
        far: 1800,
        position: [0, 0, cameraZ],
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <fog
        attach="fog"
        args={["#ffffff", 400, 2000]}
      />

      <WebGLRendererConfig />

      <ambientLight
        color={
          globeConfig.ambientLight ||
          "#38bdf8"
        }
        intensity={0.6}
      />

      <directionalLight
        color={
          globeConfig.directionalLeftLight ||
          "#ffffff"
        }
        position={
          new Vector3(-400, 100, 400)
        }
      />

      <directionalLight
        color={
          globeConfig.directionalTopLight ||
          "#ffffff"
        }
        position={
          new Vector3(-200, 500, 200)
        }
      />

      <pointLight
        color={
          globeConfig.pointLight ||
          "#ffffff"
        }
        position={
          new Vector3(-200, 500, 200)
        }
        intensity={0.8}
      />

      <Globe {...props} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={
          globeConfig.autoRotateSpeed ?? 0.8
        }
        autoRotate={
          globeConfig.autoRotate ?? true
        }
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  const shorthandRegex =
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  hex = hex.replace(
    shorthandRegex,
    function (m, r, g, b) {
      return r + r + g + g + b + b;
    }
  );

  const result =
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      hex
    );

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(
  min: number,
  max: number,
  count: number
) {
  const arr: number[] = [];

  while (arr.length < count) {
    const r =
      Math.floor(Math.random() * (max - min)) +
      min;

    if (arr.indexOf(r) === -1) {
      arr.push(r);
    }
  }

  return arr;
}