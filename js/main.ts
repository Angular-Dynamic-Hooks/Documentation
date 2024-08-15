import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { init } from './components';

// Setup
gsap.registerPlugin(ScrollTrigger);

// Load Angular components
init();