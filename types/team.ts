import { SocialLink } from "@/stores";

export type TeamMember = {
  id: string;
  fullName: string;
  role: string;
  about: string;
  tags: string[];
  avatarUrl?: string;
  coverUrl?: string;
  socials: SocialLink[];
};
