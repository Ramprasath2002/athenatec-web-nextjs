export const logos = [
  "/assets/Clients/ALRA-LAVAL.png",
  "/assets/Clients/AMU1-OSRAM.png",
  "/assets/Clients/Areva.png",
  "/assets/Clients/Atmel.png",
  "/assets/Clients/Conformis.png",
  "/assets/Clients/Critical-Manufacturing.png",
  "/assets/Clients/Daikin.png",
  "/assets/Clients/Dexcom.png",
  "/assets/Clients/Edtech.jpg",
  "/assets/Clients/ELO.png",
  "/assets/Clients/Emcore.png",
  "/assets/Clients/Enovix.png",
  "/assets/Clients/Entrgris.jpg",
  "/assets/Clients/Finisar.png",
  "/assets/Clients/GLO-USA.png",
  "/assets/Clients/Honeywell.png",
  "/assets/Clients/HSC.png",
  "/assets/Clients/InnovaFlex_Foundry.jpg",
  "/assets/Clients/Intel.png",
  "/assets/Clients/Lumentum.png",
  "/assets/Clients/Marki.png",
  "/assets/Clients/Miasole.png",
  "/assets/Clients/Micron.png",
  "/assets/Clients/mission-solar.png",
  "/assets/Clients/Neophotonics.png",
  "/assets/Clients/Nevro.png",
  "/assets/Clients/Penumbra.png",
  "/assets/Clients/Philips.png",
  "/assets/Clients/PSi-Quantum.png",
  "/assets/images/03.webp",
  "/assets/Clients/SK-Siltron.png",
  "/assets/Clients/Skywater.png",
  "/assets/Clients/Swissbit.png",
  "/assets/Clients/TDK.jpg",
  "/assets/Clients/Teledyne.png",
  "/assets/Clients/View-Dynamic-Glass.png",
  "/assets/Clients/VLAVI.png",
  "/assets/Clients/Wolfspeed.png",
];

export default function ClientLogos() {
  return (
    <div className="client-logos">
      {logos.map((logo, index) => (
        <div key={index} className="logo-item">
          <img src={logo} alt="client-logo" loading="lazy"/>
        </div>
      ))}
    </div>
  );
}