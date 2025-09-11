import { Podcast } from "@/types";

export const PODCASTS: Podcast[] = [
  {
    id: 1,
    title: "QA подкаст",
    description: "Подкаст о мире тестирования: от ручного до автоматизации.",
    coverUrl: "https://example.com/qa-podcast-cover.jpg",
    episodes: [
      {
        id: 1,
        title: "Web или Mobile в QA, что сложнее?",
        description:
          "Обсуждаем различия и сложности тестирования веба и мобильных приложений.",
        durationSec: 58,
        hosts: [
          {
            id: "anton-kuzmischev",
            fullName: "Антон Кузьмищев",
            role: "Lead AQA",
            about: "Опытный инженер в области автоматизации тестирования.",
            tags: ["qa", "automation", "testing"],
            socials: [],
          },
          {
            id: "olga-mikheeva",
            fullName: "Ольга Михеева",
            role: "Lead Manual QA",
            about: "Специалист по ручному тестированию с большим опытом.",
            tags: ["qa", "manual", "testing"],
            socials: [],
          },
        ],
        audioAsset: require("../assets/audio/podcasts/qa/web_vs_mobile_qa.mp3"),
      },
      {
        id: 2,
        title: "Автоматизация тестирования",
        description: "Разбираемся в трендах и подходах к автоматизации.",
        durationSec: 57,
        hosts: [
          {
            id: "anton-kuzmischev",
            fullName: "Антон Кузьмищев",
            role: "Lead AQA",
            about: "Опытный инженер в области автоматизации тестирования.",
            tags: ["qa", "automation", "testing"],
            socials: [],
          },
          {
            id: "olga-mikheeva",
            fullName: "Ольга Михеева",
            role: "Lead Manual QA",
            about: "Специалист по ручному тестированию с большим опытом.",
            tags: ["qa", "manual", "testing"],
            socials: [],
          },
        ],
        audioAsset: require("../assets/audio/podcasts/qa/automation_qa.mp3"),
      },
      {
        id: 3,
        title: "Ферма устройств для тестирования",
        description: "Как использовать фермы устройств для эффективного QA.",
        durationSec: 49,
        hosts: [
          {
            id: "anton-kuzmischev",
            fullName: "Антон Кузьмищев",
            role: "Lead AQA",
            about: "Опытный инженер в области автоматизации тестирования.",
            tags: ["qa", "automation", "testing"],
            socials: [],
          },
          {
            id: "olga-mikheeva",
            fullName: "Ольга Михеева",
            role: "Lead Manual QA",
            about: "Специалист по ручному тестированию с большим опытом.",
            tags: ["qa", "manual", "testing"],
            socials: [],
          },
        ],
        audioAsset: require("../assets/audio/podcasts/qa/test_farm_qa.mp3"),
      },
    ],
  },
  {
    id: 2,
    title: "AI подкаст",
    description:
      "Разговоры об искусственном интеллекте, его развитии и применении.",
    coverUrl: "https://example.com/ai-podcast-cover.jpg",
    episodes: [
      {
        id: 1,
        title: "Тест тьюринга сложный?",
        description: "Пробуем разобраться, насколько сложен тест Тьюринга.",
        durationSec: 15,
        hosts: [
          {
            id: "alexandr-kraschenco",
            fullName: "Александр Кращенко",
            role: "Head of AI Department",
            about:
              "Эксперт в области искусственного интеллекта и машинного обучения.",
            tags: ["ai", "ml", "research"],
            socials: [],
          },
        ],
        audioAsset: require("../assets/audio/podcasts/ai/turing_test_ai.mp3"),
      },
      {
        id: 2,
        title: "Чтобы обучить нейросеть, ее надо отправить в школу",
        description: "Шутим и серьезно обсуждаем, как обучаются нейросети.",
        durationSec: 37,
        hosts: [
          {
            id: "alexandr-kraschenco",
            fullName: "Александр Кращенко",
            role: "Head of AI Department",
            about:
              "Эксперт в области искусственного интеллекта и машинного обучения.",
            tags: ["ai", "ml", "research"],
            socials: [],
          },
        ],
        audioAsset: require("../assets/audio/podcasts/ai/school_ai.mp3"),
      },
      {
        id: 3,
        title: "Кто подсказывает Алисе, какая музыка мне нравится?",
        description:
          "Обсуждаем рекомендательные системы и их роль в повседневной жизни.",
        durationSec: 23,
        hosts: [
          {
            id: "alexandr-kraschenco",
            fullName: "Александр Кращенко",
            role: "Head of AI Department",
            about:
              "Эксперт в области искусственного интеллекта и машинного обучения.",
            tags: ["ai", "ml", "recommendation"],
            socials: [],
          },
        ],
        audioAsset: require("../assets/audio/podcasts/ai/alice_ai.mp3"),
      },
      {
        id: 4,
        title: "Не бойтесь, что получится Скайнет!",
        description: "Развенчиваем мифы об ИИ и возможном восстании машин.",
        durationSec: 54,
        hosts: [
          {
            id: "alexandr-kraschenco",
            fullName: "Александр Кращенко",
            role: "Head of AI Department",
            about:
              "Эксперт в области искусственного интеллекта и машинного обучения.",
            tags: ["ai", "ml", "ethics"],
            socials: [],
          },
        ],
        audioAsset: require("../assets/audio/podcasts/ai/skynet_ai.mp3"),
      },
    ],
  },
];
