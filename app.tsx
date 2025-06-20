import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Calculator,
  MessageSquare,
  Home,
  Wrench,
  Shield,
  Award,
  Truck,
  Settings,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient, inferRPCOutputType } from "~/client/api";
import { useAuth } from "~/client/utils";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui";

// Types
type Service = inferRPCOutputType<"getServices">[0];
type Project = inferRPCOutputType<"getProjects">[0];
type Testimonial = inferRPCOutputType<"getTestimonials">[0];
type PricingItem = inferRPCOutputType<"getPricing">[0];

interface ContactSubmission {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  serviceType?: string;
}

// Header Component
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: adminStatus } = useQuery(
    ["adminStatus"],
    apiClient.getAdminStatus,
  );

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>+7 (383) 299-16-16</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>novosibirsk@kamprok.ru</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Ежедневно 08-18</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              Обратный звонок
            </Button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://novosibirsk.kamprok.ru/img/1015/logo.png"
              alt="СтройДом"
              className="h-8 w-auto"
            />
            <span className="font-bold text-xl text-primary">СтройДом</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Главная
            </Link>
            <Link
              to="/services"
              className="text-foreground hover:text-primary transition-colors"
            >
              Услуги
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Контакты
            </Link>
            {adminStatus?.isAdmin && (
              <Link
                to="/admin"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Settings className="h-4 w-4 inline mr-1" />
                Админ
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border py-4"
            >
              <div className="flex flex-col gap-4">
                <Link
                  to="/"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Главная
                </Link>
                <Link
                  to="/services"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Услуги
                </Link>
                <Link
                  to="/contact"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Контакты
                </Link>
                {adminStatus?.isAdmin && (
                  <Link
                    to="/admin"
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 inline mr-1" />
                    Админ
                  </Link>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// Hero Section Component
function HeroSection() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <section
      className="relative min-h-[600px] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://novosibirsk.kamprok.ru/img/1015/main-top.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 hero-overlay"></div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Строительство домов в Новосибирске под ключ
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Актуальная цена июня - заказать строительство домов из клееного
            бруса в Новосибирске. А также купить смежные услуги, фундамент +
            получить бесплатный проект под ваш участок
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="btn-construction">
                  <Calculator className="h-5 w-5 mr-2" />
                  ПОЛУЧИТЬ ЦЕНУ
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Калькулятор стоимости</DialogTitle>
                  <DialogDescription>
                    Расчёт является предварительным
                  </DialogDescription>
                </DialogHeader>
                <PriceCalculator />
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Phone className="h-5 w-5 mr-2" />
              Заказать звонок
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Price Calculator Component
function PriceCalculator() {
  const [formData, setFormData] = useState({
    houseType: "",
    area: "",
    floors: "1",
    foundation: "",
    materials: "",
  });

  const calculatePrice = () => {
    const basePrice = 15000; // Base price per sq meter
    const area = parseInt(formData.area) || 0;
    const multiplier = formData.floors === "2" ? 1.3 : 1;
    return Math.round(area * basePrice * multiplier);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="houseType">Тип дома</Label>
        <select
          id="houseType"
          className="w-full p-2 border rounded"
          value={formData.houseType}
          onChange={(e) =>
            setFormData({ ...formData, houseType: e.target.value })
          }
        >
          <option value="">Выберите тип</option>
          <option value="frame">Каркасный дом</option>
          <option value="brick">Дом из кирпича</option>
          <option value="timber">Дом из бруса</option>
          <option value="log">Дом из бревна</option>
        </select>
      </div>
      <div>
        <Label htmlFor="area">Площадь (кв.м)</Label>
        <Input
          id="area"
          type="number"
          placeholder="Введите площадь"
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="floors">Этажность</Label>
        <select
          id="floors"
          className="w-full p-2 border rounded"
          value={formData.floors}
          onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
        >
          <option value="1">1 этаж</option>
          <option value="2">2 этажа</option>
        </select>
      </div>
      {formData.area && (
        <div className="bg-primary/10 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">Предварительная стоимость:</h3>
          <p className="text-2xl font-bold text-primary">
            {calculatePrice().toLocaleString()} руб.
          </p>
          <p className="text-sm text-muted-foreground">
            * Точная стоимость рассчитывается индивидуально
          </p>
        </div>
      )}
    </div>
  );
}

// Services Grid Component
function ServicesGrid() {
  const { data: services = [] } = useQuery(["services"], apiClient.getServices);

  const houseTypes = services.filter(
    (s: Service) => s.category === "house_types",
  );
  const constructionServices = services.filter(
    (s: Service) => s.category === "construction_services",
  );

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
            Из чего мы строим
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Предлагаем строительство домов из различных материалов с
            гарантированным качеством
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {houseTypes.map((service: Service, index: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="service-card h-full">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    от {service.priceFrom.toLocaleString()} руб.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    ЗАКАЗАТЬ
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
            Строительные работы в Новосибирске под ключ
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {constructionServices.map((service: Service, index: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="service-card h-full">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Project Gallery Component
function ProjectGallery() {
  const { data: projects = [] } = useQuery(["projects"], apiClient.getProjects);

  return (
    <section className="section-padding construction-gray-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
            Фотографии Стройки
          </h2>
          <p className="text-muted-foreground">
            Примеры наших завершенных проектов
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
            >
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover gallery-image"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Смотреть больше
          </Button>
        </div>
      </div>
    </section>
  );
}

// Company Advantages Component
function CompanyAdvantages() {
  const advantages = [
    {
      icon: CheckCircle,
      title: "Точная смета",
      description:
        "Вы будете знать полную стоимость дома еще до начала строительства",
    },
    {
      icon: Shield,
      title: "Удобная оплата",
      description:
        "Вы оплачиваете возведение жилья поэтапно. Каждый этап авансируется после сдачи предыдущего",
    },
    {
      icon: Award,
      title: "Гарантия",
      description:
        "Мы предоставляем гарантию 5 лет на все виды выполненных нами работ",
    },
    {
      icon: Truck,
      title: "Качество",
      description:
        "Мы используем только сертифицированные материалы от известных производителей",
    },
    {
      icon: Wrench,
      title: "Тех. надзор",
      description:
        "Осуществляем контроль качества и проводим регулярные проверки технологии строительства",
    },
    {
      icon: Clock,
      title: "Точность",
      description:
        "Все выполняемые нами работы сдаются без задержек, точно в срок",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
            Преимущества СТ
          </h2>
          <p className="text-muted-foreground">
            Почему стоит выбрать именно нас
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <advantage.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
              <p className="text-muted-foreground">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Component
function TestimonialsSection() {
  const { data: testimonials = [] } = useQuery(
    ["testimonials"],
    apiClient.getTestimonials,
  );

  return (
    <section className="section-padding construction-gray-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
            Отзывы клиентов
          </h2>
          <p className="text-muted-foreground">
            Что говорят о нас наши клиенты
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="testimonial-card">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.customerPhoto}
                      alt={testimonial.customerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">
                        {testimonial.customerName}
                      </h3>
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {testimonial.content}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.location} [ {testimonial.date} ]
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Читать больше
          </Button>
        </div>
      </div>
    </section>
  );
}

// Pricing Table Component
function PricingTable() {
  const { data: pricing = [] } = useQuery(["pricing"], apiClient.getPricing);

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
            Цены на строительство домов Новосибирск в июне
          </h2>
        </motion.div>

        <div className="overflow-x-auto">
          <Table className="pricing-table">
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Наименование</TableHead>
                <TableHead className="text-white">Цена руб. от</TableHead>
                <TableHead className="text-white">Ед. Изм.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricing.map((item: PricingItem) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.price.toLocaleString()} руб.</TableCell>
                  <TableCell>{item.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: "",
    phone: "",
    email: "",
    message: "",
    serviceType: "",
  });

  const submitContactMutation = useMutation(apiClient.submitContact);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          serviceType: "",
        });
        alert("Спасибо за заявку! Мы свяжемся с вами в ближайшее время.");
      },
    });
  };

  return (
    <section className="section-padding contact-form">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
              Получить консультацию
            </h2>
            <p className="text-muted-foreground">
              Оставьте заявку и наш специалист свяжется с вами
            </p>
          </motion.div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="serviceType">Тип услуги</Label>
                  <select
                    id="serviceType"
                    className="w-full p-2 border rounded"
                    value={formData.serviceType}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceType: e.target.value })
                    }
                  >
                    <option value="">Выберите услугу</option>
                    <option value="house">Строительство дома</option>
                    <option value="foundation">Фундамент</option>
                    <option value="design">Проектирование</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full btn-construction"
                  disabled={submitContactMutation.isLoading}
                >
                  {submitContactMutation.isLoading
                    ? "Отправка..."
                    : "ОТПРАВИТЬ"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer-bg text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://novosibirsk.kamprok.ru/img/1015/logo.png"
                alt="СтройДом"
                className="h-8 w-auto"
              />
              <span className="font-bold text-xl">СтройДом</span>
            </div>
            <p className="text-blue-100 mb-4">
              Возведение жилья под ключ в Новосибирске
            </p>
            <div className="flex items-center gap-2 text-blue-100">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                630075, Россия, г. Новосибирск, Станционная улица, 2А оф. 424
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <div className="space-y-2 text-blue-100">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+7 (383) 299-16-16</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+7 9132076745</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>novosibirsk@kamprok.ru</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Ежедневно 08-18</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Услуги</h3>
            <div className="space-y-2 text-blue-100">
              <div>Строительство домов</div>
              <div>Проектирование</div>
              <div>Фундаменты</div>
              <div>Кровельные работы</div>
              <div>Внутренняя отделка</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Способы оплаты</h3>
            <div className="grid grid-cols-3 gap-2 text-blue-100 text-sm">
              <div>💰 НАЛИЧНЫЕ</div>
              <div>📄 ПО СЧЁТУ</div>
              <div>💳 КАРТОЙ</div>
              <div>💸 ПЕРЕВОД</div>
              <div>📈 КРЕДИТ</div>
              <div>💹 РАССРОЧКА</div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400/30 mt-8 pt-8 text-center text-blue-100">
          <p>
            © 2025 Компания "СТ". ВНИМАНИЕ: Цены на сайте не являются публичной
            офёртой и могут отличаться, уточняйте у наших менеджеров!
          </p>
        </div>
      </div>

      {/* Fixed action buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        <Button
          size="sm"
          className="construction-success rounded-full w-12 h-12 p-0"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button
          size="sm"
          className="bg-green-500 hover:bg-green-600 rounded-full w-12 h-12 p-0"
        >
          <Phone className="h-5 w-5" />
        </Button>
      </div>
    </footer>
  );
}

// Homepage Component
function HomePage() {
  return (
    <div>
      <HeroSection />
      <ServicesGrid />
      <CompanyAdvantages />
      <ProjectGallery />
      <TestimonialsSection />
      <PricingTable />
      <ContactForm />
    </div>
  );
}

// Services Page Component
function ServicesPage() {
  const { data: services = [] } = useQuery(["services"], apiClient.getServices);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = [
    { id: "house_types", name: "Строительство домов", icon: Home },
    { id: "construction_services", name: "Строительные работы", icon: Wrench },
    { id: "foundation", name: "Фундамент", icon: Shield },
    { id: "design", name: "Проектирование", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 heading-gradient">
            Наши услуги
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Полный спектр строительных услуг от проектирования до сдачи объекта
            под ключ
          </p>
        </motion.div>

        <div className="space-y-6">
          {categories.map((category, index) => {
            const categoryServices = services.filter(
              (s: Service) => s.category === category.id,
            );

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Collapsible
                  open={expandedCategory === category.id}
                  onOpenChange={() =>
                    setExpandedCategory(
                      expandedCategory === category.id ? null : category.id,
                    )
                  }
                >
                  <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <category.icon className="h-6 w-6 text-primary" />
                            <CardTitle className="text-xl">
                              {category.name}
                            </CardTitle>
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              expandedCategory === category.id
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </div>
                      </CardHeader>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryServices.map((service: Service) => (
                        <Card key={service.id} className="service-card">
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <img
                              src={service.imageUrl}
                              alt={service.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              {service.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                              {service.description}
                            </p>
                            {service.priceFrom > 0 && (
                              <p className="text-lg font-bold text-primary">
                                от {service.priceFrom.toLocaleString()} руб.
                              </p>
                            )}
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full" variant="outline">
                              Узнать подробнее
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Contact Page Component
function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 heading-gradient">
            Контакты
          </h1>
          <p className="text-muted-foreground">
            Свяжитесь с нами удобным способом
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Наши контакты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Адрес офиса</h3>
                    <p className="text-muted-foreground">
                      630075, Россия, г. Новосибирск, Станционная улица, 2А оф.
                      424
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Телефоны</h3>
                    <p className="text-muted-foreground">
                      +7 (383) 299-16-16
                      <br />
                      +7 9132076745
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">
                      novosibirsk@kamprok.ru
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Режим работы</h3>
                    <p className="text-muted-foreground">Ежедневно 08-18</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Мессенджеры</h3>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-500 text-white border-green-500 hover:bg-green-600"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Telegram
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard() {
  const auth = useAuth({ required: true });

  const { data: services = [] } = useQuery(["services"], apiClient.getServices);
  const { data: projects = [] } = useQuery(["projects"], apiClient.getProjects);
  const { data: testimonials = [] } = useQuery(
    ["testimonials"],
    apiClient.getTestimonials,
  );

  if (auth.status === "loading") {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 heading-gradient">
            Панель администратора
          </h1>
          <p className="text-muted-foreground">Управление контентом сайта</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Услуги</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {services.length}
              </p>
              <p className="text-muted-foreground">Всего услуг</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Проекты</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {projects.length}
              </p>
              <p className="text-muted-foreground">Завершенных проектов</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Отзывы</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {testimonials.length}
              </p>
              <p className="text-muted-foreground">Отзывов клиентов</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Последние услуги</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.slice(0, 5).map((service: Service) => (
                  <div
                    key={service.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Последние проекты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.slice(0, 5).map((project: Project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.completedAt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}