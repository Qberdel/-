import { db } from "~/server/db";
import { getAuth } from "~/server/actions";
import type {
  Service,
  Project,
  Testimonial,
  PricingItem,
  ContactSubmission,
} from "@prisma/client";

// Admin functions
export async function getAdminStatus() {
  const auth = await getAuth();
  if (auth.status === "unauthenticated") {
    return { isAdmin: false };
  }

  const user = await db.user.findUnique({
    where: { id: auth.userId },
    select: { isAdmin: true },
  });

  return { isAdmin: user?.isAdmin || false };
}

export async function _makeUserAdmin() {
  const { userId } = await getAuth({ required: true });

  await db.user.upsert({
    where: { id: userId },
    update: { isAdmin: true },
    create: { id: userId, isAdmin: true },
  });

  return { success: true };
}

export async function ensureAdminAccess() {
  const { userId } = await getAuth({ required: true });

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });

  if (!user?.isAdmin) {
    throw new Error("Access denied: Admin privileges required");
  }

  return { success: true };
}

// Content functions
export async function getServices(): Promise<Service[]> {
  return await db.service.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function getProjects(): Promise<Project[]> {
  return await db.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return await db.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPricing(): Promise<PricingItem[]> {
  return await db.pricingItem.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function submitContact(input: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  serviceType?: string;
}): Promise<ContactSubmission> {
  return await db.contactSubmission.create({
    data: {
      name: input.name,
      phone: input.phone,
      email: input.email || "",
      message: input.message || "",
      serviceType: input.serviceType || "",
    },
  });
}

// Seed function to populate initial data
export async function _seedContent() {
  // Check if data already exists
  const existingServices = await db.service.count();
  if (existingServices > 0) {
    console.log("Content already seeded");
    return;
  }

  // Seed services - House types
  const houseTypes = [
    {
      name: "Дома из кирпича",
      description:
        "Надежные и долговечные кирпичные дома с отличной теплоизоляцией",
      imageUrl:
        "https://novosibirsk.kamprok.ru/img/1015/s_doma-iz-kirpicha.jpg",
      priceFrom: 25000,
      category: "house_types",
    },
    {
      name: "Каркасные дома",
      description: "Быстровозводимые энергоэффективные каркасные дома",
      imageUrl: "https://novosibirsk.kamprok.ru/img/1015/s_karkasnye-doma.jpg",
      priceFrom: 15000,
      category: "house_types",
    },
    {
      name: "Дома из газобетона",
      description:
        "Современные дома из газобетонных блоков с отличными характеристиками",
      imageUrl:
        "https://novosibirsk.kamprok.ru/img/1015/s_doma-iz-gazobetona.jpg",
      priceFrom: 20000,
      category: "house_types",
    },
    {
      name: "Профилированный брус",
      description: "Экологичные дома из профилированного бруса",
      imageUrl:
        "https://novosibirsk.kamprok.ru/img/1015/s_profilirovannyj-brus.jpg",
      priceFrom: 18000,
      category: "house_types",
    },
    {
      name: "Оцилиндрованное бревно",
      description: "Традиционные деревянные дома из оцилиндрованного бревна",
      imageUrl:
        "https://novosibirsk.kamprok.ru/img/1015/s_ocilindrovanoe-brevno.jpg",
      priceFrom: 22000,
      category: "house_types",
    },
    {
      name: "Дома из SIP панелей",
      description: "Современные энергоэффективные дома из SIP панелей",
      imageUrl:
        "https://novosibirsk.kamprok.ru/img/1015/s_doma-iz-sip-panelej.jpg",
      priceFrom: 12000,
      category: "house_types",
    },
    {
      name: "Дома из пеноблока",
      description: "Доступные и теплые дома из пеноблоков",
      imageUrl:
        "https://novosibirsk.kamprok.ru/img/1015/s_doma-iz-penobloka.jpg",
      priceFrom: 16000,
      category: "house_types",
    },
    {
      name: "Дома из двойного бруса",
      description: "Инновационная технология двойного бруса",
      imageUrl:
        "https://novosibirsk.kamprok.ru/img/1015/s_doma-iz-dvojnogo-brusa.jpg",
      priceFrom: 19000,
      category: "house_types",
    },
  ];

  // Seed services - Construction services
  const constructionServices = [
    {
      name: "Проектирование домов",
      description: "Индивидуальное проектирование и архитектурные решения",
      imageUrl:
        "https://novosibirsk.kamprok.ru/img/1015/t_proektirovanie-domov.jpg",
      priceFrom: 0,
      category: "construction_services",
    },
    {
      name: "Благоустройство",
      description: "Ландшафтный дизайн и благоустройство территории",
      imageUrl: "https://novosibirsk.kamprok.ru/img/1015/t_blagoustrojstvo.jpg",
      priceFrom: 0,
      category: "construction_services",
    },
    {
      name: "Установка септика",
      description: "Монтаж и обслуживание септических систем",
      imageUrl:
        "https://novosibirsk.kamprok.ru/img/1015/t_ustanovka-septika.jpg",
      priceFrom: 0,
      category: "construction_services",
    },
    {
      name: "Кадастровые работы",
      description: "Межевание участков и кадастровые услуги",
      imageUrl:
        "https://novosibirsk.kamprok.ru/img/1015/t_kadastrovye-raboty.jpg",
      priceFrom: 0,
      category: "construction_services",
    },
    {
      name: "Водоснабжение",
      description: "Проектирование и монтаж систем водоснабжения",
      imageUrl: "https://novosibirsk.kamprok.ru/img/1015/t_vodosnabzhenie.jpg",
      priceFrom: 0,
      category: "construction_services",
    },
    {
      name: "Строительство домов",
      description: "Полный цикл строительства под ключ",
      imageUrl:
        "https://novosibirsk.kamprok.ru/img/1015/t_stroitelstvo-domov.jpg",
      priceFrom: 0,
      category: "construction_services",
    },
  ];

  // Create services
  await db.service.createMany({
    data: [...houseTypes, ...constructionServices],
  });

  // Seed projects
  const projects = [
    {
      title: "Каркасный дом 120 кв.м",
      description: "Двухэтажный каркасный дом с мансардой",
      imageUrl: "https://novosibirsk.kamprok.ru/img/1015/gs_1.jpg",
      completedAt: "Май 2024",
    },
    {
      title: "Дом из газобетона 150 кв.м",
      description: "Современный дом из газобетонных блоков",
      imageUrl: "https://novosibirsk.kamprok.ru/img/1015/gs_2.jpg",
      completedAt: "Апрель 2024",
    },
    {
      title: "Дом из бруса 100 кв.м",
      description: "Уютный деревянный дом из профилированного бруса",
      imageUrl: "https://novosibirsk.kamprok.ru/img/1015/gs_3.jpg",
      completedAt: "Март 2024",
    },
    {
      title: "Кирпичный дом 200 кв.м",
      description: "Просторный двухэтажный кирпичный дом",
      imageUrl: "https://novosibirsk.kamprok.ru/img/1015/gs_4.jpg",
      completedAt: "Февраль 2024",
    },
  ];

  await db.project.createMany({
    data: projects,
  });

  // Seed testimonials
  const testimonials = [
    {
      customerName: "Александр Петров",
      customerPhoto: "https://novosibirsk.kamprok.ru/img//1015/f1745916071.jpg",
      content:
        "Отличная работа! Дом построили точно в срок, качество на высоте. Рекомендую всем!",
      rating: 5,
      location: "г. Новосибирск",
      date: "15.05.2024",
    },
    {
      customerName: "Мария Иванова",
      customerPhoto: "https://novosibirsk.kamprok.ru/img//1015/f1745663711.jpg",
      content:
        "Очень довольны результатом. Профессиональная команда, все этапы контролировались.",
      rating: 5,
      location: "г. Новосибирск",
      date: "28.04.2024",
    },
  ];

  await db.testimonial.createMany({
    data: testimonials,
  });

  // Seed pricing
  const pricing = [
    {
      name: "Фундамент ленточный",
      price: 3500,
      unit: "п.м.",
    },
    {
      name: "Стены из газобетона",
      price: 2800,
      unit: "кв.м.",
    },
    {
      name: "Кровля металлочерепица",
      price: 1200,
      unit: "кв.м.",
    },
    {
      name: "Окна ПВХ",
      price: 8500,
      unit: "шт.",
    },
    {
      name: "Внутренняя отделка",
      price: 4500,
      unit: "кв.м.",
    },
    {
      name: "Электромонтаж",
      price: 650,
      unit: "кв.м.",
    },
    {
      name: "Сантехника",
      price: 850,
      unit: "кв.м.",
    },
    {
      name: "Отопление",
      price: 1200,
      unit: "кв.м.",
    },
  ];

  await db.pricingItem.createMany({
    data: pricing,
  });

  console.log("Content seeded successfully");
  return { success: true };
}