"use client";

import { useEffect, useRef } from "react";

/**
 * WebGL gown stage: a displacement/ripple shader over the hero image that
 * reacts to the cursor and to a scroll-driven `progress` (0..1). Gives the
 * "heavy, alive" motion-graphic feel without a multi-megabyte 3D scene.
 * Falls back to a plain <img> if WebGL is unavailable.
 */
export default function FluidGown({
  src,
  progress,
}: {
  src: string;
  progress: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const prog = useRef(0);
  const failed = useRef(false);

  // keep latest progress without re-running the GL setup
  useEffect(() => {
    prog.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { premultipliedAlpha: false, alpha: true }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      failed.current = true;
      if (imgRef.current) imgRef.current.style.display = "block";
      return;
    }

    const vert = `
      attribute vec2 aPos;
      varying vec2 vUv;
      void main(){
        vUv = (aPos + 1.0) * 0.5;
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }
    `;

    // Cursor + scroll driven ripple/displacement with a soft light sweep.
    const frag = `
      precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTex;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform float uProg;
      uniform vec2 uRes;
      uniform float uHasTex;

      void main(){
        vec2 uv = vUv;
        vec2 m = uMouse;
        float d = distance(uv, m);

        // ripple radiating from the cursor
        float ripple = sin(d * 22.0 - uTime * 2.2) * 0.0035 * smoothstep(0.6, 0.0, d);
        // gentle ambient wave so the fabric never sits fully still
        float wave = sin(uv.y * 9.0 + uTime * 0.8) * 0.0018;
        // scroll dissolve: push pixels apart as you descend
        float dissolve = uProg * 0.04;

        vec2 dir = normalize(uv - m + 0.0001);
        vec2 off = dir * (ripple) + vec2(wave, 0.0) + dir * dissolve;
        vec2 suv = uv + off;

        vec4 col = uHasTex > 0.5 ? texture2D(uTex, suv) : vec4(0.10,0.09,0.08,1.0);

        // light sweep tied to cursor x + scroll
        float sweepPos = m.x * 0.6 + uProg * 0.5;
        float sweep = smoothstep(0.06, 0.0, abs(uv.x - sweepPos));
        col.rgb += sweep * 0.12;

        // soft vignette toward edges
        float vig = smoothstep(1.15, 0.35, distance(uv, vec2(0.5)));
        col.rgb *= mix(0.78, 1.0, vig);

        // fade out as the gown dissolves into the store
        col.a *= clamp(1.0 - max(0.0, uProg - 0.62) * 3.0, 0.0, 1.0);

        gl_FragColor = col;
      }
    `;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const prg = gl.createProgram()!;
    gl.attachShader(prg, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prg, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prg);
    gl.useProgram(prg);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prg, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uMouse = gl.getUniformLocation(prg, "uMouse");
    const uTime = gl.getUniformLocation(prg, "uTime");
    const uProg = gl.getUniformLocation(prg, "uProg");
    const uRes = gl.getUniformLocation(prg, "uRes");
    const uHasTex = gl.getUniformLocation(prg, "uHasTex");

    // texture
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([26, 24, 22, 255])
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1f(uHasTex, 0);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.uniform1f(uHasTex, 1);
      } catch {
        gl.uniform1f(uHasTex, 0);
      }
    };
    img.onerror = () => {
      // CDN/CORS blocked: show the DOM <img> fallback instead.
      if (imgRef.current) imgRef.current.style.display = "block";
      canvas.style.opacity = "0";
    };
    img.src = src;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas!.clientWidth * dpr;
      const h = canvas!.clientHeight * dpr;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas!.getBoundingClientRect();
      mouse.current.tx = (e.clientX - r.left) / r.width;
      mouse.current.ty = (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const start = performance.now();
    let raf = 0;
    const loop = () => {
      resize();
      // ease cursor for that weighted, heavy feel
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;
      const t = (performance.now() - start) / 1000;
      gl!.uniform2f(uMouse, mouse.current.x, mouse.current.y);
      gl!.uniform1f(uTime, t);
      gl!.uniform1f(uProg, prog.current);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [src]);

  return (
    <>
      <canvas ref={canvasRef} className="fluidCanvas" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt="CIELIE gown"
        className="fluidFallback"
        style={{ display: "none" }}
      />
    </>
  );
}
