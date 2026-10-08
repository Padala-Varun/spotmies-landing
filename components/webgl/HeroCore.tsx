"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { seededRandom } from "@/lib/utils";

/* Ashima Arts 3D simplex noise (MIT). */
const simplex = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uMorph;
uniform float uSize;
uniform float uPixelRatio;
uniform float uRotation;
uniform float uSphereScale;
uniform vec3 uSphereOffset;
uniform vec3 uMouse;
uniform float uMouseStrength;
attribute vec3 aPlane;
attribute float aRandom;
varying float vAlpha;
varying float vTone;
${simplex}
mat3 rotY(float a){float c=cos(a);float s=sin(a);return mat3(c,0.0,-s,0.0,1.0,0.0,s,0.0,c);}
void main(){
  float t = uTime;
  vec3 base = rotY(uRotation) * position;
  float n = snoise(base * 0.85 + vec3(0.0, t * 0.16, t * 0.11));
  vec3 sp = base * (1.0 + n * 0.17) * uSphereScale + uSphereOffset;

  vec3 pl = aPlane;
  pl.y += sin(pl.x * 0.85 + t * 0.7) * 0.26 + cos(pl.z * 1.3 + t * 0.55) * 0.2
        + snoise(vec3(pl.xz * 0.42, t * 0.14)) * 0.38;

  float m = clamp(uMorph * 1.3 - aRandom * 0.3, 0.0, 1.0);
  m = m * m * (3.0 - 2.0 * m);
  vec3 pos = mix(sp, pl, m);

  vec4 world = modelMatrix * vec4(pos, 1.0);
  vec2 d = world.xy - uMouse.xy;
  float push = (1.0 - smoothstep(0.0, 1.4, length(d))) * uMouseStrength;
  world.xy += normalize(d + 1e-4) * push * 0.6;
  world.z += push * 0.4;

  vec4 mv = viewMatrix * world;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.5 + aRandom) * (1.0 + push * 1.4) * uPixelRatio / -mv.z;

  float facing = mix(smoothstep(-1.6, 1.6, base.z), smoothstep(-3.5, 3.0, pl.z), m);
  vAlpha = (0.28 + 0.72 * facing) * (0.75 + 0.55 * abs(n) + push);
  vTone = clamp(aRandom * 0.8 + n * 0.4 + push, 0.0, 1.0);
}`;

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uOpacity;
varying float vAlpha;
varying float vTone;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = pow(1.0 - d * 2.0, 1.7);
  vec3 col = mix(uColorA, uColorB, smoothstep(0.05, 0.7, vTone));
  col = mix(col, uColorC, smoothstep(0.82, 1.0, vTone));
  gl_FragColor = vec4(col, a * vAlpha * uOpacity);
}`;

function buildGeometry(count: number) {
  const rand = seededRandom(2019);
  const sphere = new Float32Array(count * 3);
  const plane = new Float32Array(count * 3);
  const random = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const cols = Math.ceil(Math.sqrt(count * 2.1));
  const rows = Math.ceil(count / cols);

  for (let i = 0; i < count; i++) {
    // Fibonacci shell with a sparse outer halo for depth.
    const halo = rand() < 0.14;
    const y = 1 - ((i + 0.5) / count) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const radius = halo ? 1.9 + rand() * 0.9 : 1.6 * (1 + (rand() - 0.5) * 0.06);
    sphere[i * 3] = Math.cos(theta) * r * radius;
    sphere[i * 3 + 1] = y * radius;
    sphere[i * 3 + 2] = Math.sin(theta) * r * radius;

    const c = i % cols;
    const row = Math.floor(i / cols);
    plane[i * 3] = (c / (cols - 1) - 0.5) * 14 + (rand() - 0.5) * 0.04;
    plane[i * 3 + 1] = -1.25;
    plane[i * 3 + 2] = (row / Math.max(rows - 1, 1) - 0.5) * 7.5 - 0.8;

    random[i] = rand();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(sphere, 3));
  geometry.setAttribute("aPlane", new THREE.BufferAttribute(plane, 3));
  geometry.setAttribute("aRandom", new THREE.BufferAttribute(random, 1));
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
  return geometry;
}

type Pointer = { x: number; y: number; inside: boolean };

// Scratch objects for per-frame math (one hero instance, so module scope is safe).
const _ray = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _hit = new THREE.Vector3();

function createUniforms() {
  return {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uSize: { value: 26 },
    uPixelRatio: { value: 1 },
    uRotation: { value: 0 },
    uSphereScale: { value: 1 },
    uSphereOffset: { value: new THREE.Vector3(1.9, 0.05, 0) },
    uMouse: { value: new THREE.Vector3(99, 99, 0) },
    uMouseStrength: { value: 0 },
    uOpacity: { value: 0 },
    uColorA: { value: new THREE.Color("#0e7490") },
    uColorB: { value: new THREE.Color("#00eef9") },
    uColorC: { value: new THREE.Color("#ffffff") },
  };
}

function Particles({
  count,
  progress,
  pointer,
}: {
  count: number;
  progress: MotionValue<number>;
  pointer: React.RefObject<Pointer>;
}) {
  const { camera, size, gl } = useThree();
  const geometry = useMemo(() => buildGeometry(count), [count]);
  const uniforms = useMemo(() => createUniforms(), []);
  const material = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    const dt = Math.min(delta, 1 / 20);
    const narrow = size.width < 768;

    u.uTime.value += dt;
    u.uRotation.value += dt * 0.08;
    u.uPixelRatio.value = gl.getPixelRatio();
    u.uOpacity.value += (1 - u.uOpacity.value) * dt * 1.4;
    u.uMorph.value += (progress.get() - u.uMorph.value) * Math.min(1, dt * 4);
    u.uSphereScale.value = narrow ? 0.72 : 1;
    (u.uSphereOffset.value as THREE.Vector3).set(narrow ? 0 : 1.95, narrow ? 1.05 : 0.05, 0);
    u.uSize.value = narrow ? 20 : 26;

    // Project the pointer onto the z = 0 plane so the repel field matches what you see.
    const p = pointer.current;
    _ray.set(p.x, p.y, 0.5).unproject(camera);
    _dir.copy(_ray).sub(camera.position).normalize();
    const dist = -camera.position.z / _dir.z;
    _hit.copy(camera.position).addScaledVector(_dir, dist);
    (u.uMouse.value as THREE.Vector3).lerp(_hit, Math.min(1, dt * 8));
    const strength = p.inside ? 1 : 0;
    u.uMouseStrength.value += (strength - u.uMouseStrength.value) * Math.min(1, dt * 3);
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0.35, 7);
    camera.lookAt(0, -0.25, 0);
  }, [camera]);
  return null;
}

export default function HeroCore({
  progress,
  active,
  count,
}: {
  progress: MotionValue<number>;
  active: boolean;
  count: number;
}) {
  const pointer = useRef<Pointer>({ x: 2, y: 2, inside: false });
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside = e.clientY >= r.top && e.clientY <= r.bottom;
      pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      pointer.current.inside = inside && e.pointerType === "mouse";
    };
    const onLeave = () => (pointer.current.inside = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ fov: 40, near: 0.1, far: 50, position: [0, 0.35, 7] }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <CameraRig />
        <Particles count={count} progress={progress} pointer={pointer} />
      </Canvas>
    </div>
  );
}
