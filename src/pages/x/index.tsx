import Head from "next/head";
import index from "./index.module.css";
import { BackgroundGradientWrapper } from "@/components/atom/BackgroundGradientWrapper/BackgroundGradientWrapper";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Index = () => {
  const qrRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.classList.add("no-scroll");

    const qr = qrRef.current;
    if (!qr) return;

    let baseBeta: number | null = null;
    let baseGamma: number | null = null;

    const handleOrientationForMobile = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event;
      if (!beta || !gamma) return;

      if (baseBeta === null) baseBeta = beta;
      if (baseGamma === null) baseGamma = gamma;

      const x = Math.max(-30, Math.min(30, (gamma - baseGamma)));
      const y = -Math.max(-30, Math.min(30, (beta - baseBeta)));

      qr.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseMoveForPC = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((event.clientX - innerWidth / 2) / innerWidth) * 30; // 左右
      const y = ((event.clientY - innerHeight / 2) / innerHeight) * -30; // 上下
      qr.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      window.addEventListener("deviceorientation", handleOrientationForMobile);
    } else {
      window.addEventListener("mousemove", handleMouseMoveForPC);
    }

    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("deviceorientation", handleOrientationForMobile);
      window.removeEventListener("mousemove", handleMouseMoveForPC);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Aokiti | X</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundGradientWrapper>
        <div className={index.qrCodeWrapper}>
          <div className={index.qrCode} ref={qrRef}>
            <Image src="/images/qrcode.svg" alt="QR Code" sizes="100%" fill />
          </div>
          <p className={index.qrCodeText}>@ aokiti_tech</p>
          <p className={index.qrCodeSubText}>Follow on X</p>
        </div>
      </BackgroundGradientWrapper>
    </>
  );
};

export default Index;
