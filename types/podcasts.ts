import { ImageSourcePropType } from "react-native";

export type PodcastEpisodeSection = {
  time: string;
  title: string;
};

export type PodcastHost = {
  id: string | number;
  fullName: string;
  role: string;
  avatarUrl: string;
  email?: string;
  vkUrl?: string;
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
  hosts?: PodcastHost[];
  audioUrl?: string;
};

export type Podcast = {
  id: number;
  title: string;
  description?: string;
  coverUrl?: string;
  cover?: ImageSourcePropType;
  episodes: PodcastEpisode[];
};
