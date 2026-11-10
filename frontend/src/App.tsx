import { useEffect, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  Check,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Radio,
  ShieldCheck,
  Sparkles,
  Youtube,
  X,
} from "lucide-react";
import RangerPlatinumExperience from "./RangerPlatinumExperience";

type Vehicle = {
  name: string;
  segment: "SUVs" | "Bakkies" | "Cars" | "Vans";
  category: string;
  description: string;
  form: string;
  focus: string;
  image: string;
  imageAlt: string;
  accent: string;
  officialUrl: string;
  status?: string;
};

type VehicleFilter = "ALL" | "SUVs" | "Bakkies" | "Cars" | "Vans" | "UPCOMING";

const fordSaModelBase = "https://www.ford.co.za";
const fordSaImages =
  "https://www.ford.co.za/content/dam/na/ford/en_za/images/global-nav/jellybeans";

const vehicles: Vehicle[] = [
  {
    name: "Mustang GT",
    segment: "Cars",
    category: "THE ORIGINAL REBEL",
    description:
      "An unmistakable V8 fastback that brings classic Mustang character to the open road.",
    form: "Performance fastback",
    focus: "5.0L V8",
    image: `${fordSaImages}/passenger-cars/mustang-gt-360x180.webp`,
    imageAlt: "Ford Mustang GT, pictured by Ford South Africa",
    accent: "01",
    officialUrl: `${fordSaModelBase}/showroom/future-vehicle/mustang/gt/`,
  },
  {
    name: "Mustang Dark Horse",
    segment: "Cars",
    category: "BORN FOR THE TRACK",
    description:
      "A sharper, track-focused expression of Mustang performance with a presence all its own.",
    form: "Track-focused coupe",
    focus: "Ford Performance",
    image: `${fordSaImages}/passenger-cars/mustang-dark-horse-360x180.webp`,
    imageAlt: "Ford Mustang Dark Horse, pictured by Ford South Africa",
    accent: "02",
    officialUrl: `${fordSaModelBase}/showroom/future-vehicle/mustang/dark-horse/`,
  },
  {
    name: "Territory",
    segment: "SUVs",
    category: "MADE FOR MORE EVERYDAY",
    description:
      "A modern, spacious SUV designed to make weekday routines and weekend plans feel easy.",
    form: "Family SUV",
    focus: "Everyday versatility",
    image: `${fordSaImages}/suvs/territory-360x180.webp`,
    imageAlt: "Ford Territory SUV, pictured by Ford South Africa",
    accent: "03",
    officialUrl: `${fordSaModelBase}/showroom/future-vehicle/territory.html`,
  },
  {
    name: "Everest",
    segment: "SUVs",
    category: "ROOM FOR THE UNKNOWN",
    description:
      "A capable, seven-seat SUV built for family life, open roads, and farther horizons.",
    form: "7-seat SUV",
    focus: "Family adventure",
    image: `${fordSaImages}/suvs/everest-360x180.webp`,
    imageAlt: "Ford Everest SUV, pictured by Ford South Africa",
    accent: "04",
    officialUrl: `${fordSaModelBase}/content/na/ford/en_za/home/vehicle/everest.html`,
  },
  {
    name: "Everest Tremor",
    segment: "SUVs",
    category: "READY FOR THE ROUGH",
    description:
      "An officially announced, adventure-focused Everest variant. Ford South Africa currently lists it as coming soon.",
    form: "Adventure SUV",
    focus: "Coming soon",
    image: `${fordSaImages}/tremor-jb.webp`,
    imageAlt: "Ford Everest Tremor, pictured by Ford South Africa",
    accent: "05",
    officialUrl: `${fordSaModelBase}/about-ford/news/ford-news/2026/ford-everest-tremor-south-africa/`,
    status: "COMING SOON",
  },
  {
    name: "Ranger XL",
    segment: "Bakkies",
    category: "READY FOR THE WORKDAY",
    description:
      "A no-nonsense Ranger foundation for businesses, hard-working crews, and demanding jobs.",
    form: "Work-ready bakkie",
    focus: "Ranger XL range",
    image: `${fordSaImages}/bakkies/ranger-xl-360x180-new.webp`,
    imageAlt: "Ford Ranger XL bakkie, pictured by Ford South Africa",
    accent: "06",
    officialUrl: `${fordSaModelBase}/content/na/ford/en_za/home/vehicle/ranger/xl.html`,
  },
  {
    name: "Ranger XLT",
    segment: "Bakkies",
    category: "CAPABILITY, EVERY DAY",
    description:
      "An all-rounder that balances everyday comfort with the versatility to do more.",
    form: "Versatile bakkie",
    focus: "Ranger XLT range",
    image: `${fordSaImages}/bakkies/ranger-xlt-360x180.webp`,
    imageAlt: "Ford Ranger XLT bakkie, pictured by Ford South Africa",
    accent: "07",
    officialUrl: `${fordSaModelBase}/content/na/ford/en_za/home/vehicle/ranger/xlt.html`,
  },
  {
    name: "Ranger Sport",
    segment: "Bakkies",
    category: "A BOLDER KIND OF RANGER",
    description:
      "Distinctive styling and confident bakkie capability, made to stand out on every route.",
    form: "Lifestyle bakkie",
    focus: "Ranger Sport range",
    image: `${fordSaImages}/bakkies/ranger-sport-360x180.webp`,
    imageAlt: "Ford Ranger Sport bakkie, pictured by Ford South Africa",
    accent: "08",
    officialUrl: `${fordSaModelBase}/content/na/ford/en_za/home/vehicle/ranger/sport.html`,
  },
  {
    name: "Ranger Wildtrak",
    segment: "Bakkies",
    category: "WORK MEETS WEEKEND",
    description:
      "A versatile, adventure-ready Ranger with the confidence to take on work and weekends.",
    form: "Lifestyle bakkie",
    focus: "Ranger Wildtrak range",
    image: `${fordSaImages}/bakkies/ranger-wildtrak-360x180.webp`,
    imageAlt: "Ford Ranger Wildtrak bakkie, pictured by Ford South Africa",
    accent: "09",
    officialUrl: `${fordSaModelBase}/content/na/ford/en_za/home/vehicle/ranger/wildtrak.html`,
  },
  {
    name: "Ranger Tremor",
    segment: "Bakkies",
    category: "TAKE THE ROAD LESS TRAVELLED",
    description:
      "An off-road-oriented Ranger for drivers who would rather find their own way through.",
    form: "Off-road bakkie",
    focus: "Ranger Tremor range",
    image: `${fordSaImages}/bakkies/ranger-tremor-360x180.webp`,
    imageAlt: "Ford Ranger Tremor bakkie, pictured by Ford South Africa",
    accent: "10",
    officialUrl: `${fordSaModelBase}/content/na/ford/en_za/home/vehicle/ranger/tremor.html`,
  },
  {
    name: "Ranger Platinum",
    segment: "Bakkies",
    category: "CAPABILITY, REFINED",
    description:
      "Premium finishes meet the strength and everyday usefulness of a full-size bakkie.",
    form: "Premium bakkie",
    focus: "Ranger Platinum range",
    image: `${fordSaImages}/bakkies/ranger-platinum-360x180.webp`,
    imageAlt: "Ford Ranger Platinum bakkie, pictured by Ford South Africa",
    accent: "11",
    officialUrl: `${fordSaModelBase}/content/na/ford/en_za/home/vehicle/ranger/platinum.html`,
  },
  {
    name: "Ranger Raptor",
    segment: "Bakkies",
    category: "BUILT TO GO BEYOND",
    description:
      "A high-performance off-road Ranger engineered to chase the roughest roads.",
    form: "Performance bakkie",
    focus: "Ford Performance",
    image: `${fordSaImages}/bakkies/ranger-raptor-updated-in-red-360x180.webp`,
    imageAlt: "Ford Ranger Raptor bakkie, pictured by Ford South Africa",
    accent: "12",
    officialUrl: `${fordSaModelBase}/content/na/ford/en_za/home/vehicle/ranger/raptor.html`,
  },
  {
    name: "Ranger Super Duty",
    segment: "Bakkies",
    category: "MORE CAPABILITY. MORE RANGER.",
    description:
      "Confirmed for South Africa in 2027, with heavy-duty capability for work, towing, and remote adventures.",
    form: "Single or double cab planned",
    focus: "Arriving in 2027",
    image: `${fordSaImages}/super_duty_360x180.webp`,
    imageAlt: "Ford Ranger Super Duty, pictured by Ford South Africa",
    accent: "13",
    officialUrl: `${fordSaModelBase}/about-ford/news/ford-news/2026/ford-ranger-super-duty-coming/`,
    status: "COMING IN 2027",
  },
  {
    name: "Transit Custom",
    segment: "Vans",
    category: "YOUR BUSINESS, MOVING",
    description:
      "A versatile commercial van built to make deliveries, teams, and daily operations easier.",
    form: "Mid-size commercial van",
    focus: "Transit Custom range",
    image: `${fordSaImages}/vans-and-buses/transit-custom-360x180.webp`,
    imageAlt: "Ford Transit Custom commercial van, pictured by Ford South Africa",
    accent: "14",
    officialUrl: `${fordSaModelBase}/content/na/ford/en_za/home/vehicle/transit-custom.html`,
  },
  {
    name: "Transit Van",
    segment: "Vans",
    category: "MADE FOR THE BIGGER JOBS",
    description:
      "A purpose-built commercial workhorse with space for the tools, goods, and plans ahead.",
    form: "Full-size commercial van",
    focus: "Transit Van range",
    image: `${fordSaImages}/vans-and-buses/transit-van-360x180.webp`,
    imageAlt: "Ford Transit Van, pictured by Ford South Africa",
    accent: "15",
    officialUrl: `${fordSaModelBase}/content/na/ford/en_za/home/vehicle/transit-van.html`,
  },
  {
    name: "Tourneo Custom",
    segment: "Vans",
    category: "ROOM FOR EVERYONE",
    description:
      "A people-moving Tourneo with generous space for families, groups, and shared journeys.",
    form: "Passenger people mover",
    focus: "Tourneo Custom range",
    image: `${fordSaImages}/vans-and-buses/tourneo-custom-360x180.webp`,
    imageAlt: "Ford Tourneo Custom passenger van, pictured by Ford South Africa",
    accent: "16",
    officialUrl: `${fordSaModelBase}/content/na/ford/en_za/home/vehicle/tourneo.html`,
  },
];

const vehicleFilters: { label: string; value: VehicleFilter }[] = [
  { label: "All vehicles", value: "ALL" },
  { label: "SUVs", value: "SUVs" },
  { label: "Bakkies", value: "Bakkies" },
  { label: "Cars", value: "Cars" },
  { label: "Vans", value: "Vans" },
  { label: "Coming soon", value: "UPCOMING" },
];

const innovations = [
  {
    number: "01",
    title: "Confidence, built in.",
    description:
      "Driver-assist technologies help you stay aware, supported, and in command of the moments that matter.",
    icon: ShieldCheck,
    tag: "FORD CO-PILOT360™",
  },
  {
    number: "02",
    title: "Your world, connected.",
    description:
      "Intuitive in-vehicle experiences keep your people, playlists, and plans just a touch away.",
    icon: Radio,
    tag: "CONNECTED EXPERIENCES",
  },
  {
    number: "03",
    title: "Electric, your way.",
    description:
      "A new kind of drive pairs instant response with the freedom to make every mile count.",
    icon: BatteryCharging,
    tag: "ALL-ELECTRIC FUTURE",
  },
  {
    number: "04",
    title: "Smarter by design.",
    description:
      "Thoughtful engineering works behind the scenes, so every journey feels more effortless.",
    icon: Sparkles,
    tag: "INTELLIGENT ENGINEERING",
  },
];

const navItems = [
  ["Home", "#home"],
  ["Vehicles", "#vehicles"],
  ["Ranger Platinum", "#ranger-platinum"],
  ["Performance", "#performance"],
  ["Technology", "#technology"],
  ["About Ford", "#about"],
  ["Locations", "#locations"],
  ["Contact", "#contact"],
];

function FordMark() {
  return (
    <a className="ford-mark" href="#home" aria-label="Ford home">
      <img src="/ford-mark.svg" alt="" />
    </a>
  );
}

function Reveal({
  children,
  className = "",
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
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicleFilter, setVehicleFilter] = useState<VehicleFilter>("ALL");
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 150]);
  const filteredVehicles =
    vehicleFilter === "ALL"
      ? vehicles
      : vehicleFilter === "UPCOMING"
        ? vehicles.filter((vehicle) => vehicle.status)
        : vehicles.filter((vehicle) => vehicle.segment === vehicleFilter);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", selectedVehicle !== null);
    return () => document.body.classList.remove("modal-open");
  }, [selectedVehicle]);

  useEffect(() => {
    if (!selectedVehicle) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedVehicle(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVehicle]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="header-inner">
          <FordMark />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <a className="nav-link" href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#vehicles">
            Find your Ford <ArrowUpRight size={15} strokeWidth={1.7} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              {navItems.map(([label, href], index) => (
                <a
                  href={href}
                  key={label}
                  onClick={closeMenu}
                  style={{ transitionDelay: `${index * 35}ms` }}
                >
                  <span>{label}</span>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <motion.video
            className="hero-video"
            style={{ y: videoY }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://images.pexels.com/videos/31238582/35mm-photography-car-cars-moving-cinematic-camera-31238582.jpeg?auto=compress&cs=tinysrgb&w=1920"
            aria-label="Ford Mustang drifting around a desert racetrack"
          >
            <source
              src="https://videos.pexels.com/video-files/31238582/13341858_1920_1080_60fps.mp4"
              type="video/mp4"
            />
          </motion.video>
          <div className="hero-shade" />
          <div className="hero-topline">
            <span>AMERICA’S ORIGINAL AUTOMOTIVE BRAND</span>
            <span className="hero-location">
              <span className="status-dot" /> MADE FOR WHAT’S NEXT
            </span>
          </div>
          <div className="hero-content">
            <motion.p
              className="eyebrow hero-eyebrow"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              BUILT FOR EVERY TURN
            </motion.p>
            <motion.h1
              id="hero-title"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              BUILT FOR THE
              <br />
              <span>ROAD AHEAD.</span>
            </motion.h1>
            <motion.div
              className="hero-bottom"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.58 }}
            >
              <p>
                Experience the power of innovation, performance
                <br className="desktop-break" /> and engineering excellence.
              </p>
              <div className="hero-actions">
                <a className="button button--light" href="#vehicles">
                  Explore vehicles <ArrowUpRight size={16} />
                </a>
                <a className="text-link text-link--light" href="#about">
                  Discover Ford <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
          <div className="hero-footer">
            <span>01 — 05 <i /> THE SPIRIT OF THE DRIVE</span>
            <a href="#vehicles" aria-label="Scroll to explore vehicles">
              SCROLL TO EXPLORE <ArrowDown size={14} />
            </a>
            <span className="hero-footnote">PRESS PLAY? NO. JUST DRIVE.</span>
          </div>
        </section>

        <section className="intro-strip" aria-label="Ford brand statement">
          <span className="intro-index">SINCE 1903</span>
          <p>
            We don’t just build vehicles.
            <br className="intro-mobile-break" /> We build what moves you.
          </p>
          <a href="#about" className="intro-link">
            A legacy in motion <ArrowUpRight size={17} />
          </a>
        </section>

        <section className="vehicles-section section-pad" id="vehicles">
          <div className="section-heading vehicles-heading">
            <Reveal>
              <p className="eyebrow">FORD SOUTH AFRICA · THE FULL LINEUP</p>
              <h2>
                Find your
                <br /> <span>kind of Ford.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="section-intro">
                Explore Ford South Africa’s cars, SUVs, bakkies, and vans.
                Officially announced arrivals are marked so you know what’s
                coming next.
              </p>
              <a
                className="text-link"
                href="https://www.ford.co.za/vehicles.html"
                target="_blank"
                rel="noreferrer"
              >
                Visit Ford South Africa <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>

          <div className="vehicle-filter-bar">
            <div className="vehicle-filters" aria-label="Filter vehicles by type">
              {vehicleFilters.map((filter) => (
                <button
                  type="button"
                  className={`vehicle-filter${vehicleFilter === filter.value ? " is-active" : ""}`}
                  aria-pressed={vehicleFilter === filter.value}
                  onClick={() => setVehicleFilter(filter.value)}
                  key={filter.value}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <span className="vehicle-count" aria-live="polite">
              {filteredVehicles.length.toString().padStart(2, "0")} MODELS
            </span>
          </div>

          <div className="vehicle-grid">
            {filteredVehicles.map((vehicle, index) => (
              <Reveal
                className="vehicle-card"
                delay={index % 2 ? 0.09 : 0}
                key={vehicle.name}
              >
                <button
                  type="button"
                  className="vehicle-card-button"
                  onClick={() => setSelectedVehicle(vehicle)}
                  aria-label={`Explore ${vehicle.name}`}
                >
                  <div className="vehicle-image-wrap">
                    <img
                      src={vehicle.image}
                      alt={vehicle.imageAlt}
                      loading="lazy"
                    />
                    <span className="vehicle-number">{vehicle.accent}</span>
                    {vehicle.status && (
                      <span className="vehicle-status">{vehicle.status}</span>
                    )}
                    <span className="vehicle-image-arrow">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>
                  <div className="vehicle-card-info">
                    <div className="vehicle-meta">
                      <span>{vehicle.category}</span>
                      <span className="vehicle-mark">FORD</span>
                    </div>
                    <h3>{vehicle.name}</h3>
                    <p className="vehicle-description">{vehicle.description}</p>
                    <div className="vehicle-specs">
                      <span>{vehicle.form}</span>
                      <span>{vehicle.focus}</span>
                    </div>
                    <span className="vehicle-explore">
                      Explore vehicle <ArrowRight size={14} />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
          <p className="specs-note">
            Model range and arrival timing are based on Ford South Africa’s
            published lineup as of November 2026. Features and availability may
            change; confirm details with Ford South Africa.
          </p>
          <a className="platinum-feature-link" href="#ranger-platinum">
            <span className="platinum-feature-label">FEATURED VEHICLE EXPERIENCE</span>
            <span className="platinum-feature-title">Ranger Platinum</span>
            <span className="platinum-feature-copy">
              Meet the premium Ranger, explore verified South African
              specifications, and view official Ford imagery.
            </span>
            <span className="platinum-feature-action">
              Explore the experience <ArrowUpRight size={16} />
            </span>
          </a>
        </section>

        <RangerPlatinumExperience />

        <section className="performance-section" id="performance">
          <div className="performance-image" role="img" aria-label="Mustang racing on track" />
          <div className="performance-overlay" />
          <div className="performance-content">
            <Reveal>
              <p className="eyebrow eyebrow--light">BORN ON THE TRACK. BUILT FOR THE ROAD.</p>
              <h2>
                POWER THAT
                <br />
                <span>MOVES YOU.</span>
              </h2>
              <p className="performance-copy">
                Some sounds are more than sound. They’re a feeling you recognize
                before you even see it coming.
              </p>
              <a className="button button--outline-light" href="#technology">
                Feel the difference <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
          <div className="performance-stats">
            <Reveal>
              <div className="performance-stat">
                <span className="stat-value">5.0<span> L V8</span></span>
                <span className="stat-label">MUSTANG GT ENGINE</span>
              </div>
              <div className="performance-stat">
                <span className="stat-value">GT<span> / DARK HORSE</span></span>
                <span className="stat-label">MUSTANG LINEUP</span>
              </div>
              <div className="performance-stat">
                <span className="stat-value">1964</span>
                <span className="stat-label">THE MUSTANG STORY BEGINS</span>
              </div>
            </Reveal>
          </div>
          <span className="performance-caption">MUSTANG GT · THE ROAD IS YOURS</span>
        </section>

        <section className="technology-section section-pad" id="technology">
          <div className="technology-top">
            <Reveal>
              <p className="eyebrow">A LITTLE MORE IN EVERY DRIVE</p>
              <h2>
                Intuition meets
                <br />
                <span>intelligence.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12} className="technology-aside">
              <p>
                The best technology doesn’t ask for attention. It gives you
                more confidence, more connection, and more room to focus on
                where you’re going.
              </p>
              <span className="aside-rule" />
              <span className="eyebrow">ENGINEERED AROUND YOU</span>
            </Reveal>
          </div>
          <div className="innovation-grid">
            {innovations.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal delay={index * 0.07} key={item.number}>
                  <article className="innovation-card">
                    <div className="innovation-card-head">
                      <span>{item.number} / 04</span>
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="innovation-tag">{item.tag}</span>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <div className="tech-footnote">
            <span className="tech-footnote-icon"><Check size={15} /></span>
            <p>
              Driver-assist features are supplemental and do not replace safe
              driving. See your owner’s manual for important details.
            </p>
          </div>
        </section>

        <section className="legacy-section" id="about">
          <div className="legacy-photo">
            <img
              src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1800"
              alt="A classic car driving down an open road"
              loading="lazy"
            />
            <span className="legacy-photo-caption">A CENTURY OF GOING FURTHER</span>
          </div>
          <div className="legacy-content">
            <Reveal>
              <p className="eyebrow eyebrow--light">A PROMISE THAT KEEPS MOVING</p>
              <h2>
                DRIVEN BY
                <br />
                INNOVATION.
                <br />
                <span>BUILT ON LEGACY.</span>
              </h2>
              <p className="legacy-copy">
                Since 1903, Ford has believed the road ahead should belong to
                everyone. That belief still drives us—to make life better
                through the freedom of movement, and to build a future worth
                moving toward.
              </p>
              <a className="text-link text-link--light" href="#contact">
                Get to know Ford <ArrowRight size={16} />
              </a>
            </Reveal>
            <div className="legacy-seal">
              <FordMark />
              <span>1903<br />EST.</span>
            </div>
          </div>
        </section>

        <section className="closing-section">
          <Reveal className="closing-inner">
            <div>
              <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
              <h2>
                The road is
                <br /> <span>calling.</span>
              </h2>
            </div>
            <a className="button button--blue" href="#vehicles">
              Meet your next Ford <ArrowUpRight size={17} />
            </a>
            <div className="closing-watermark">FORD</div>
          </Reveal>
        </section>

        <section className="contact-locations section-pad" id="contact">
          <div className="contact-locations-heading">
            <Reveal>
              <p className="eyebrow">HERE WHEN YOU NEED US</p>
              <h2>
                Let’s get you
                <br />
                <span>where you’re going.</span>
              </h2>
            </Reveal>
            <Reveal className="contact-locations-intro" delay={0.1}>
              <p>
                Speak with Ford South Africa or find an authorised dealer near
                you. Dealer search and current contact information are available
                directly from Ford.
              </p>
            </Reveal>
          </div>
          <div className="contact-locations-grid">
            <Reveal className="contact-card">
              <span className="contact-card-index">01 / CONTACT</span>
              <span className="contact-card-icon">
                <MessageCircle size={21} strokeWidth={1.5} />
              </span>
              <h3>Talk to a Ford expert.</h3>
              <p>
                Ford South Africa offers live chat on WhatsApp for product
                questions and support.
              </p>
              <a
                className="contact-card-link"
                href="https://api.whatsapp.com/send/?phone=27128423390&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp · +27 12 842 3390 <ArrowUpRight size={16} />
              </a>
              <a
                className="contact-card-secondary"
                href="https://www.ford.co.za/contact-us/"
                target="_blank"
                rel="noreferrer"
              >
                Visit Ford’s contact page
              </a>
            </Reveal>
            <Reveal className="contact-card contact-card--location" delay={0.1}>
              <span className="contact-card-index" id="locations">
                02 / LOCATIONS
              </span>
              <span className="contact-card-icon">
                <MapPin size={21} strokeWidth={1.5} />
              </span>
              <h3>Find your nearest Ford dealer.</h3>
              <p>
                Explore Ford’s nationwide dealer network and get location
                details through the official dealer locator.
              </p>
              <a
                className="contact-card-link"
                href="https://www.ford.co.za/dealerLocator"
                target="_blank"
                rel="noreferrer"
              >
                Open dealer locator <ArrowUpRight size={16} />
              </a>
              <span className="contact-card-secondary">
                120+ dealers nationwide
              </span>
            </Reveal>
          </div>
          <p className="contact-source-note">
            Contact details and dealer locator link sourced from{" "}
            <a href="https://www.ford.co.za/" target="_blank" rel="noreferrer">
              Ford South Africa
            </a>
            . Dealer availability and opening hours may vary.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <FordMark />
            <p>
              Go further.
              <br />
              Make it matter.
            </p>
            <div className="footer-socials" aria-label="Ford social media">
              <a
                href="https://www.instagram.com/ford/"
                target="_blank"
                rel="noreferrer"
                aria-label="Ford on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.youtube.com/user/Ford"
                target="_blank"
                rel="noreferrer"
                aria-label="Ford on YouTube"
              >
                <Youtube size={17} />
              </a>
              <a
                href="https://www.facebook.com/ford/"
                target="_blank"
                rel="noreferrer"
                aria-label="Ford on Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>
          <div className="footer-column">
            <span className="footer-heading">EXPLORE</span>
            <a href="#vehicles">Our vehicles</a>
            <a href="#performance">Performance</a>
            <a href="#technology">Technology</a>
            <a href="#about">Our story</a>
          </div>
          <div className="footer-column">
            <span className="footer-heading">CONTACT & LOCATIONS</span>
            <p>Connect with Ford South Africa or find a dealer near you.</p>
            <a
              className="footer-mail"
              href="https://www.ford.co.za/contact-us/"
              target="_blank"
              rel="noreferrer"
            >
              Contact Ford <ArrowUpRight size={15} />
            </a>
            <a className="footer-mail" href="#locations">
              Find a dealer <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="footer-back">
            <a href="#home" aria-label="Back to top">
              <ArrowDown size={16} />
            </a>
            <span>BACK TO TOP</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ford Motor Company. All rights reserved.</span>
          <span className="portfolio-note">
            Independent portfolio concept. Not affiliated with Ford Motor Company.
          </span>
          <div className="footer-legal">
            <a href="https://www.ford.com/help/privacy/" target="_blank" rel="noreferrer">
              Privacy
            </a>
            <a href="https://www.ford.com/help/terms/" target="_blank" rel="noreferrer">
              Legal
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            className="vehicle-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedVehicle(null);
            }}
          >
            <motion.section
              className="vehicle-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="vehicle-modal-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="vehicle-modal-image">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.imageAlt}
                />
                <span className="eyebrow eyebrow--light">{selectedVehicle.category}</span>
                {selectedVehicle.status && (
                  <span className="vehicle-status vehicle-status--modal">
                    {selectedVehicle.status}
                  </span>
                )}
                <button
                  className="modal-close"
                  type="button"
                  aria-label="Close vehicle details"
                  onClick={() => setSelectedVehicle(null)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="vehicle-modal-content">
                <div>
                  <p className="eyebrow">A CLOSER LOOK</p>
                  <h2 id="vehicle-modal-title">{selectedVehicle.name}</h2>
                  <p>{selectedVehicle.description}</p>
                </div>
                <div className="modal-spec">
                  <span>VEHICLE TYPE</span>
                  <strong>{selectedVehicle.form}</strong>
                </div>
                <div className="modal-spec">
                  <span>LINEUP</span>
                  <strong>{selectedVehicle.focus}</strong>
                </div>
                <a
                  className="button button--blue modal-done"
                  href={selectedVehicle.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Ford South Africa <ArrowUpRight size={16} />
                </a>
                <button
                  className="modal-back"
                  type="button"
                  onClick={() => setSelectedVehicle(null)}
                >
                  Back to the lineup
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
