import { Podcast } from "@/types";

export const PODCASTS: Podcast[] = [
  {
    id: 1,
    title: "Кто эти люди?",
    description:
      "Интервью-знакомство с коллегами: истории о работе, хобби и офисных приключениях.",
    coverUrl:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a3f5?q=80&w=1974&auto=format&fit=crop",
    episodes: [
      {
        id: 1,
        title: "Андрей, тестировщик: Как баги научили меня терпению",
        subtitle:
          "Андрей рассказывает о себе, загадках в багах и хобби секрет терпения...",
        description:
          "В выпуске говорим о пути из инженера-механика в охотника за багами, самых странных фейлах, и почему сборка моделей поездов помогает в работе.",
        coverUrl:
          "https://images.unsplash.com/photo-1601933470928-c7b1b54b06f9?q=80&w=1887&auto=format&fit=crop",
        durationSec: 60 * 12,
        sections: [
          { time: "0:00", title: "приветствие" },
          { time: "3:01", title: "история, как инженер стал тестировщиком" },
          { time: "6:24", title: "странные баги и случайный запуск аудио" },
          { time: "9:50", title: "хобби vs работа" },
          { time: "13:30", title: "советы новичкам" },
        ],
        hosts: [
          {
            id: "andrey",
            fullName: "Софонов Андрей",
            role: "Тестировщик",
            avatarUrl: "https://i.pravatar.cc/100?img=32",
            email: "testsof_a@gmail.com",
            vkUrl: "https://vk.com",
          },
          {
            id: "anna",
            fullName: "Анна Захарова",
            role: "UX/UI дизайнер",
            avatarUrl: "https://i.pravatar.cc/100?img=23",
            email: "anadesign_z@gmail.com",
            vkUrl: "https://vk.com",
          },
        ],
      },
      {
        id: 2,
        title:
          "Аня, дизайнер: От акварели к Figma и как котик стал арт-директором",
        subtitle:
          "Аня расскажет про свой путь и как не бояться клиентских правок...",
        description: "",
        coverUrl:
          "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop",
        durationSec: 60 * 12,
      },
      {
        id: 3,
        title: "Максим, тимлид: От стажёра до руководителя — путь через ошибки",
        subtitle: "Максим расскажет как он управляет командой...",
        description: "",
        coverUrl:
          "https://images.unsplash.com/photo-1541123603104-512919d6a96c?q=80&w=1974&auto=format&fit=crop",
        durationSec: 60 * 15,
      },
      {
        id: 4,
        title: "Сергей, разработчик: Код, музыка и философия",
        subtitle:
          "Backend-разработчик и музыкант. Как код похож на импровизацию...",
        description: "",
        coverUrl:
          "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?q=80&w=1974&auto=format&fit=crop",
        durationSec: 60 * 10,
      },
    ],
  },
];
