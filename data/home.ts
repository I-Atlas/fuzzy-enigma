import { DailyQuestCardProps, QuickStartCardProps } from "@/components/home";

type QuickStartItemData =
  | (Omit<QuickStartCardProps, "iconName"> & {
      type: "podcast";
      iconName: "headset-outline";
    })
  | (Omit<QuickStartCardProps, "iconName"> & {
      type: "article";
      iconName: "book-outline";
    });

export interface HomeTabData {
  quickStart: QuickStartItemData[];
  dailyQuest: DailyQuestCardProps;
}

const avatars = [
  { id: "a1", source: { uri: "https://i.pravatar.cc/100?img=32" } },
  { id: "a2", source: { uri: "https://i.pravatar.cc/100?img=23" } },
  { id: "a3", source: { uri: "https://i.pravatar.cc/100?img=17" } },
  { id: "a4", source: { uri: "https://i.pravatar.cc/100?img=11" } },
];

export const HOME_TABS_DATA: Record<
  "office" | "team" | "hacks" | "remote",
  HomeTabData
> = {
  office: {
    quickStart: [
      {
        id: "1",
        type: "podcast",
        title: "Кто эти люди?",
        description:
          "Сотрудники без галстуков: честные ответы на странные вопросы.",
        cta: "Познакомиться",
        gradientColors: ["#FFEDBC", "#EDC0A3"],
        iconName: "headset-outline",
        avatars,
      },
      {
        id: "1",
        type: "article",
        title: "Про процессы",
        description: "Как мы проводим дейлики и ретро.",
        cta: "Смотреть",
        gradientColors: ["#C7D2FE", "#BDE0FE"],
        iconName: "book-outline",
        avatars,
      },
    ],
    dailyQuest: {
      title: "Стань офисным ниндзя",
      reward: 3,
      gradientColors: ["#B7E1FF", "#E7F5FF"],
      items: [
        {
          id: "1",
          text: "Найди комнату с растениями и посчитай их.",
          isDone: false,
        },
        { id: "2", text: "Сфотографируй арт у переговорки.", isDone: false },
        {
          id: "3",
          text: "Поздоровайся с человеком из соседней команды.",
          isDone: false,
        },
      ],
    },
  },
  team: {
    quickStart: [
      {
        id: "2",
        type: "article",
        title: "Знакомство с командой",
        description: "Кто за что отвечает и как к нам попасть.",
        cta: "Смотреть",
        gradientColors: ["#FDE1E1", "#F9C8D4"],
        iconName: "book-outline",
        avatars,
      },
      {
        id: "3",
        type: "article",
        title: "Календарь митапов",
        description: "Ближайшие события и внутренние лекции.",
        cta: "Открыть",
        gradientColors: ["#D1FAE5", "#A7F3D0"],
        iconName: "book-outline",
        avatars,
      },
    ],
    dailyQuest: {
      title: "Стань тим-плеером",
      reward: 5,
      gradientColors: ["#E0E7FF", "#C7D2FE"],
      items: [
        { id: "1", text: "Отправь спасибо коллеге в чате.", isDone: false },
        { id: "2", text: "Узнай у новичка, как у него дела.", isDone: false },
      ],
    },
  },
  hacks: {
    quickStart: [
      {
        id: "4",
        type: "article",
        title: "Горячие клавиши в офисе",
        description: "Сократи путь: принтеры, переговорки, кофе.",
        cta: "Выучить",
        gradientColors: ["#FEF3C7", "#FDE68A"],
        iconName: "book-outline",
        avatars,
      },
      {
        id: "5",
        type: "article",
        title: "Автоматизации",
        description: "Как мы экономим 2 часа в день.",
        cta: "Читать",
        gradientColors: ["#CCE4F6", "#B3E5FC"],
        iconName: "book-outline",
        avatars,
      },
    ],
    dailyQuest: {
      title: "Прокачай эффективность",
      reward: 4,
      gradientColors: ["#DBEAFE", "#BFDBFE"],
      items: [
        {
          id: "1",
          text: "Настрой быстрый доступ к wifi-гостю.",
          isDone: false,
        },
        { id: "2", text: "Добавь ярлык на портал команды.", isDone: false },
        { id: "3", text: "Сократи путь к принтеру.", isDone: false },
      ],
    },
  },
  remote: {
    quickStart: [
      {
        id: "6",
        type: "article",
        title: "Как не выпадать из контекста",
        description: "Инструменты и ритуалы удалёнки.",
        cta: "Читать",
        gradientColors: ["#E0F2FE", "#BAE6FD"],
        iconName: "book-outline",
        avatars,
      },
      {
        id: "7",
        type: "article",
        title: "Асинхронные апдейты",
        description: "Правила коротких апдейтов и еженедельных демо.",
        cta: "Открыть",
        gradientColors: ["#F3E8FF", "#E9D5FF"],
        iconName: "book-outline",
        avatars,
      },
    ],
    dailyQuest: {
      title: "Укрепи ремоут-ритуалы",
      reward: 3,
      gradientColors: ["#FDE68A", "#FCD34D"],
      items: [
        { id: "1", text: "Запланируй 1:1 на неделе.", isDone: false },
        { id: "2", text: "Оставь апдейт в канале команды.", isDone: false },
      ],
    },
  },
};
