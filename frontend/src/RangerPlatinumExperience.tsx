import { useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Gauge,
  Mountain,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

const fordMedia =
  "https://www.ford.co.za/content/dam/na/ford/en_za/nameplate/ranger/2026";
const platinumMedia = `${fordMedia}/overview/models/platinum`;
const rangerPlatinumUrl = "https://www.ford.co.za/vehicle/ranger/platinum/";

const galleryImages = [
  {
    label: "Ranger Platinum · Acacia Green",
    detail: "The Platinum face, finished in Acacia Green.",
    src: `${platinumMedia}/ford-model-platinum-za-billboard-1920x840-front-view-of-ford-platinum-in-acacia-green-desktop.webp`,
    alt: "Ford South Africa’s 2026 Ranger Platinum in Acacia Green, front view",
  },
  {
    label: "Ranger Platinum · Front three-quarter",
    detail: "The Platinum silhouette, shown in white.",
    src: `${fordMedia}/overview/model-walk/ford-nameplate-za-modelwalk-1431x805-ford-ranger-platinum-front-angle.png`,
    alt: "Ford South Africa’s Ranger Platinum in a front three-quarter view",
  },
  {
    label: "Ranger Platinum · Exterior trim",
    detail: "A closer look at the Platinum trim.",
    src: `${platinumMedia}/vehicle-trim/ford-model-platinum-za-trim-overview-1000x563-front-view-of-white-ranger-platinum-desktop.webp`,
    alt: "Ford South Africa’s white Ranger Platinum exterior trim",
  },
];

const specifications = [
  { value: "3.0 L", label: "V6 turbo diesel", icon: Gauge },
  { value: "184 kW", label: "at 3,250 rpm", icon: Sparkles },
  { value: "600 Nm", label: "at 1,750–2,250 rpm", icon: Mountain },
  { value: "10-speed", label: "automatic transmission", icon: Gauge },
  { value: "3,500 kg", label: "maximum braked towing", icon: Truck },
  { value: "20 in", label: "alloy wheels", icon: Mountain },
];

const cabinFeatures = [
  {
    title: "A cabin made for the long way round.",
    description:
      "Partial-leather seating, 10-way power front seats, a heated leather-wrapped steering wheel, and dual-zone climate control make the distance feel considered.",
    icon: Sparkles,
    tag: "COMFORT, THOUGHT THROUGH",
  },
  {
    title: "Every essential, in view.",
    description:
      "A 12.4-inch configurable digital instrument cluster meets a 12-inch SYNC 4 touchscreen with wireless Apple CarPlay and Android Auto.",
    icon: Gauge,
    tag: "12.4″ CLUSTER · 12″ DISPLAY",
  },
  {
    title: "Soundtrack for the open road.",
    description:
      "An eight-speaker B&O Premium Audio system, Bluetooth audio streaming, and satellite navigation are listed in Ford South Africa’s specification.",
    icon: AudioLines,
    tag: "B&O PREMIUM AUDIO",
  },
  {
    title: "Support for the moments that matter.",
    description:
      "Ford lists adaptive cruise control with Stop & Go and lane centering, a 360-degree camera, hill-descent control, and pre-collision assist.",
    icon: ShieldCheck,
    tag: "DRIVER-ASSIST TECHNOLOGY",
  },
];

function CampaignReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function RangerPlatinumExperience() {
  const [activeImage, setActiveImage] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(
    scrollYProgress,
    [0.22, 0.72],
    [0, reduceMotion ? 0 : -55],
  );
  const galleryImage = galleryImages[activeImage];

  return (
    <div className="ranger-campaign" id="ranger-platinum">
      <section className="ranger-campaign-hero" aria-labelledby="ranger-title">
        <motion.img
          className="ranger-campaign-hero-image"
          src={galleryImages[0].src}
          alt=""
          aria-hidden="true"
          style={{ y: imageY }}
          fetchPriority="high"
        />
        <div className="ranger-campaign-hero-shade" />
        <div className="ranger-campaign-index">
          <span>2026 FORD RANGER PLATINUM</span>
          <span>SOUTH AFRICA · DOUBLE CAB</span>
        </div>
        <CampaignReveal className="ranger-campaign-copy">
          <p className="ranger-eyebrow">COMFORT, WITH A WILDER SIDE</p>
          <h2 id="ranger-title">
            BUILT TO CONQUER.
            <br />
            <span>DESIGNED TO STAND APART.</span>
          </h2>
          <p className="ranger-campaign-lede">
            Where considered comfort meets the confidence to take the long way.
            Discover the Ford Ranger Platinum.
          </p>
          <div className="ranger-campaign-actions">
            <a className="ranger-button ranger-button--light" href="#platinum-details">
              Explore the Ranger <ArrowRight size={16} />
            </a>
            <a className="ranger-text-link" href="#platinum-performance">
              Experience the power <ArrowDown size={15} />
            </a>
          </div>
        </CampaignReveal>
        <div className="ranger-video-placeholder" role="note">
          <span className="ranger-video-indicator" />
          <span>
            <strong>CAMPAIGN VIDEO PLACEHOLDER</strong>
            <small>
              Genuine Ranger Platinum mountain-driving footage has not been
              sourced. No other vehicle or still is presented as video.
            </small>
          </span>
          <span className="ranger-video-path">
            /videos/ranger-platinum-mountain.mp4
          </span>
        </div>
        <a
          className="ranger-scroll-cue"
          href="#platinum-details"
          aria-label="Scroll to Ranger Platinum details"
        >
          DISCOVER RANGER PLATINUM <ArrowDown size={14} />
        </a>
      </section>

      <section className="ranger-intro section-pad" id="platinum-details">
        <CampaignReveal>
          <p className="eyebrow">THE RANGER PLATINUM</p>
          <h2>
            Confidence in the wild.
            <br />
            <span>Comfort in every detail.</span>
          </h2>
        </CampaignReveal>
        <CampaignReveal className="ranger-intro-aside" delay={0.1}>
          <p>
            There’s more to an adventure than the destination. Platinum brings
            a powerful V6, thoughtful technology, and a quietly assured finish
            to the journeys in between.
          </p>
          <a
            className="text-link"
            href={rangerPlatinumUrl}
            target="_blank"
            rel="noreferrer"
          >
            View the official Ford model page <ArrowUpRight size={15} />
          </a>
        </CampaignReveal>
      </section>

      <section className="ranger-gallery section-pad" aria-labelledby="ranger-gallery-title">
        <div className="ranger-gallery-heading">
          <CampaignReveal>
            <p className="eyebrow">THE PLATINUM, IN DETAIL</p>
            <h2 id="ranger-gallery-title">A closer look.</h2>
          </CampaignReveal>
          <span className="ranger-gallery-counter">
            {String(activeImage + 1).padStart(2, "0")}{" "}
            <i /> {String(galleryImages.length).padStart(2, "0")}
          </span>
        </div>
        <CampaignReveal className="ranger-gallery-stage">
          <motion.img
            key={galleryImage.src}
            src={galleryImage.src}
            alt={galleryImage.alt}
            initial={reduceMotion ? false : { opacity: 0.35, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
          <div className="ranger-gallery-caption">
            <span>{galleryImage.label}</span>
            <p>{galleryImage.detail}</p>
          </div>
        </CampaignReveal>
        <div className="ranger-gallery-controls" aria-label="Ranger Platinum gallery">
          {galleryImages.map((image, index) => (
            <button
              className={`ranger-gallery-thumb${activeImage === index ? " is-active" : ""}`}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-pressed={activeImage === index}
              key={image.src}
            >
              <img src={image.src} alt="" loading="lazy" />
              <span>
                <small>0{index + 1}</small>
                {image.label}
              </span>
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
        <p className="ranger-source-note">
          Official Ford South Africa 2026 Ranger Platinum imagery. Images are
          for illustration and may differ from the final vehicle.
        </p>
      </section>

      <section className="ranger-wilderness" aria-labelledby="ranger-wilderness-title">
        <div className="ranger-wilderness-text">
          <CampaignReveal>
            <p className="ranger-eyebrow">FOR THE ROAD THAT BECOMES A TRAIL</p>
            <h2 id="ranger-wilderness-title">
              THE WILDERNESS
              <br />
              IS CALLING.
            </h2>
            <p>
              Steel underbody protection, front recovery hooks, selectable
              drive modes with Tow/Haul, and hill-descent control help make
              changing ground feel more considered.
            </p>
            <a
              className="ranger-text-link"
              href={rangerPlatinumUrl}
              target="_blank"
              rel="noreferrer"
            >
              Explore official specifications <ArrowUpRight size={15} />
            </a>
          </CampaignReveal>
        </div>
        <div className="ranger-wilderness-image">
          <img
            src={galleryImages[1].src}
            alt="Official Ford South Africa image of the Ranger Platinum, shown in a front three-quarter view"
            loading="lazy"
          />
          <span>OFFICIAL RANGER PLATINUM PRODUCT IMAGE · NOT ACTION FOOTAGE</span>
        </div>
      </section>

      <section
        className="ranger-performance section-pad"
        id="platinum-performance"
        aria-labelledby="platinum-performance-title"
      >
        <div className="ranger-performance-heading">
          <CampaignReveal>
            <p className="eyebrow">ENGINEERED FOR THE DISTANCE</p>
            <h2 id="platinum-performance-title">
              Power with
              <br />
              <span>purpose.</span>
            </h2>
          </CampaignReveal>
          <CampaignReveal className="ranger-performance-aside" delay={0.1}>
            <p>
              Model specifications below are for the Ranger Platinum listed by
              Ford South Africa for the 2026 model range.
            </p>
            <a
              className="text-link"
              href={rangerPlatinumUrl}
              target="_blank"
              rel="noreferrer"
            >
              Check current model details <ArrowUpRight size={15} />
            </a>
          </CampaignReveal>
        </div>
        <div className="ranger-spec-grid">
          {specifications.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <CampaignReveal delay={index * 0.04} key={spec.label}>
                <article className="ranger-spec-card">
                  <Icon size={20} strokeWidth={1.5} />
                  <span>{spec.value}</span>
                  <p>{spec.label}</p>
                </article>
              </CampaignReveal>
            );
          })}
        </div>
        <div className="ranger-spec-footnote">
          Source: Ford South Africa Ranger Platinum specifications. Power and
          torque are shown at the published engine speeds. Specifications,
          equipment, and availability may change by model year.
        </div>
      </section>

      <section className="ranger-cabin" id="platinum-technology">
        <div className="ranger-cabin-heading section-pad">
          <CampaignReveal>
            <p className="eyebrow eyebrow--light">MADE FOR THE MILES BETWEEN</p>
            <h2>
              REFINED FOR EVERY JOURNEY.
              <br />
              <span>READY FOR EVERY CHALLENGE.</span>
            </h2>
            <p>
              A thoughtful cabin and driver-assist technologies turn a capable
              bakkie into a more considered place to spend the day.
            </p>
          </CampaignReveal>
        </div>
        <div className="ranger-cabin-grid">
          {cabinFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <CampaignReveal delay={index * 0.05} key={feature.title}>
                <article className="ranger-cabin-card">
                  <span className="ranger-cabin-number">0{index + 1}</span>
                  <Icon size={22} strokeWidth={1.5} />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <span className="ranger-cabin-tag">{feature.tag}</span>
                </article>
              </CampaignReveal>
            );
          })}
        </div>
        <p className="ranger-source-note ranger-cabin-note">
          Ford South Africa lists partial-leather seat material. Driver-assist
          features are supplemental and have operating limitations; consult
          the owner’s manual.
        </p>
      </section>

      <section className="ranger-close" id="platinum-contact">
        <CampaignReveal className="ranger-close-inner">
          <p className="ranger-eyebrow">FORD RANGER PLATINUM</p>
          <h2>GO BEYOND THE ORDINARY.</h2>
          <a
            className="ranger-button ranger-button--light"
            href={rangerPlatinumUrl}
            target="_blank"
            rel="noreferrer"
          >
            Explore with Ford South Africa <ArrowUpRight size={16} />
          </a>
          <span className="ranger-close-disclaimer">
            Independent automotive frontend portfolio concept. Not affiliated
            with or endorsed by Ford Motor Company.
          </span>
        </CampaignReveal>
      </section>
    </div>
  );
}
