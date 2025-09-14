import Head from "next/head";
import index from "@/styles/index.module.css";
import { BackgroundGradientWrapper } from "@/components/atom/BackgroundGradientWrapper/BackgroundGradientWrapper";
import Image from "next/image";

const Index = () => {
  return (
    <>
      <Head>
        <title>Aokiti | X</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundGradientWrapper>
        <div className={index.qrCodeWrapper}>
          <div className={index.qrCode}>
            <Image src="/images/qrcode.svg" alt="QR Code" sizes="100%" fill />
          </div>
          <p className={index.qrCodeText}>@aokiti_tech</p>
        </div>
      </BackgroundGradientWrapper>
    </>
  );
};

export default Index;