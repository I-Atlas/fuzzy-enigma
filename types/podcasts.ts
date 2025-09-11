import { ImageSourcePropType } from "react-native";
import { TeamMember } from "./team";

export type PodcastEpisodeSection = {
  time: string;
  title: string;
};

export type PodcastEpisode = {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  coverUrl?: string;
  cover?: ImageSourcePropType;
  durationSec: number;
  sections?: PodcastEpisodeSection[];
  hosts?: TeamMember[];
  audioUrl?: string;
  audioAsset?: number;
};

export type Podcast = {
  id: number;
  title: string;
  description?: string;
  coverUrl?: string;
  cover?: ImageSourcePropType;
  episodes: PodcastEpisode[];
};
