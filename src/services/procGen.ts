import SimplexNoise from "simplex-noise";
import { getSeed } from "./seed";

export const simplex = new SimplexNoise(getSeed());
