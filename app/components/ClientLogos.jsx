export const logos = [
  "/assets/Clients/ALRA-LAVAL.webp",
  "/assets/Clients/AMU1-OSRAM.webp",
  "/assets/Clients/Areva.webp",
  "/assets/Clients/Atmel.webp",
  "/assets/Clients/Conformis.webp",
  "/assets/Clients/Critical-Manufacturing.webp",
  "/assets/Clients/Daikin.webp",
  "/assets/Clients/Dexcom.webp",
  "/assets/Clients/Edtech.webp",
  "/assets/Clients/ELO.webp",
  "/assets/Clients/Emcore.webp",
  "/assets/Clients/Enovix.webp",
  "/assets/Clients/Entrgris.webp",
  "/assets/Clients/Finisar.webp",
  "/assets/Clients/GLO-USA.webp",
  "/assets/Clients/Honeywell.webp",
  "/assets/Clients/HSC.webp",
  "/assets/Clients/InnovaFlex_Foundry.webp",
  "/assets/Clients/Intel.webp",
  "/assets/Clients/Lumentum.webp",
  "/assets/Clients/Marki.webp",
  "/assets/Clients/Miasole.webp",
  "/assets/Clients/Micron.webp",
  "/assets/Clients/mission-solar.webp",
  "/assets/Clients/Neophotonics.webp",
  "/assets/Clients/Nevro.webp",
  "/assets/Clients/Penumbra.webp",
  "/assets/Clients/Philips.webp",
  "/assets/Clients/PSi-Quantum.webp",
  "/assets/images/03.webp",
  "/assets/Clients/SK-Siltron.webp",
  "/assets/Clients/Skywater.webp",
  "/assets/Clients/Swissbit.webp",
  "/assets/Clients/TDK.webp",
  "/assets/Clients/Teledyne.webp",
  "/assets/Clients/View-Dynamic-Glass.webp",
  "/assets/Clients/VLAVI.webp",
  "/assets/Clients/Wolfspeed.webp",
];

export default function ClientLogos() {
  return (
    <div className="client-logos">
      {logos.map((logo, index) => (
        <div key={index} className="logo-item">
          <Image
            src={logo}
            alt="Client logo"
            width={140}
            height={56}
            sizes="140px"
            className="h-auto w-auto object-contain"
            quality={80}
          />
        </div>
      ))}
    </div>
  );
}
