import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Car {
  id: number;
  name: string;
  type: string;
  price: number;
  features: string[];
  image: string;
  transmission: string;
  fuel: string;
  seats: number;
}

const cars: Car[] = [
  {
    id: 1,
    name: "BMW 3 Series",
    type: "Премиум седан",
    price: 3500,
    features: ["Кондиционер", "Навигация", "Bluetooth", "Кожаный салон"],
    image: "/img/4d58b738-a0e9-4d21-bf08-1b695eb42e76.jpg",
    transmission: "Автомат",
    fuel: "Бензин",
    seats: 5
  },
  {
    id: 2,
    name: "Toyota RAV4",
    type: "Внедорожник",
    price: 4200,
    features: ["Полный привод", "Кондиционер", "Камера заднего вида", "Подогрев сидений"],
    image: "/img/0559d5d1-51f5-48e6-81bb-b14566779356.jpg",
    transmission: "Автомат",
    fuel: "Бензин",
    seats: 5
  },
  {
    id: 3,
    name: "Kia Rio",
    type: "Эконом класс",
    price: 2200,
    features: ["Кондиционер", "ABS", "Подушки безопасности", "Центральный замок"],
    image: "/img/57f17daf-0109-44f6-93f6-a7d43112adf9.jpg",
    transmission: "Механика",
    fuel: "Бензин",
    seats: 5
  }
];

const tariffs = [
  { name: "Эконом", price: "от 2000₽/день", features: ["Базовая страховка", "Пробег 150км/день", "Техподдержка 24/7", "Детские кресла бесплатно"] },
  { name: "Комфорт", price: "от 3000₽/день", features: ["Расширенная страховка", "Пробег 150км/день", "Бесплатная отмена", "Детские кресла бесплатно", "Навигатор"] },
  { name: "Премиум", price: "от 4500₽/день", features: ["Расширенная страховка", "Пробег 150км/день", "VIP поддержка", "Доставка авто", "Детские кресла бесплатно", "Топливо включено"] }
];

export default function Index() {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [bookingStep, setBookingStep] = useState<'search' | 'details' | 'confirmation'>('search');

  const handleBooking = (car: Car) => {
    setSelectedCar(car);
    setBookingStep('details');
  };

  const handleBookingConfirm = () => {
    setBookingStep('confirmation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Car" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">RentCar</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">Главная</a>
              <a href="#cars" className="text-gray-700 hover:text-primary transition-colors">Автопарк</a>
              <a href="#tariffs" className="text-gray-700 hover:text-primary transition-colors">Тарифы</a>
              <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button className="hidden md:block">
              <Icon name="Phone" size={16} className="mr-2" />
              +7 (999) 123-45-67
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-white to-blue-500/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Аренда авто
                <span className="block text-primary">в один клик</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Более 100 автомобилей в наличии. Онлайн-бронирование за 2 минуты. 
                Детские кресла бесплатно. Круглосуточная поддержка.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={20} className="text-green-500" />
                  <span className="text-gray-700">Полная страховка</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={20} className="text-green-500" />
                  <span className="text-gray-700">24/7 поддержка</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={20} className="text-green-500" />
                  <span className="text-gray-700">По всему городу</span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center space-x-2">
                  <Icon name="CalendarDays" size={24} className="text-primary" />
                  <span>Забронировать авто</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookingStep === 'search' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Дата получения</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left">
                              <Icon name="CalendarDays" className="mr-2 h-4 w-4" />
                              {pickupDate ? format(pickupDate, 'dd.MM.yyyy', { locale: ru }) : 'Выберите дату'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={pickupDate} onSelect={setPickupDate} />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Дата возврата</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left">
                              <Icon name="CalendarDays" className="mr-2 h-4 w-4" />
                              {returnDate ? format(returnDate, 'dd.MM.yyyy', { locale: ru }) : 'Выберите дату'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Время получения</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="10:00" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">09:00</SelectItem>
                            <SelectItem value="10:00">10:00</SelectItem>
                            <SelectItem value="11:00">11:00</SelectItem>
                            <SelectItem value="12:00">12:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Время возврата</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="18:00" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="16:00">16:00</SelectItem>
                            <SelectItem value="17:00">17:00</SelectItem>
                            <SelectItem value="18:00">18:00</SelectItem>
                            <SelectItem value="19:00">19:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Место получения</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите офис" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="center">Центральный офис</SelectItem>
                          <SelectItem value="airport">Аэропорт</SelectItem>
                          <SelectItem value="station">Вокзал</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" size="lg">
                      <Icon name="Search" size={16} className="mr-2" />
                      Найти автомобили
                    </Button>
                  </>
                )}

                {bookingStep === 'details' && selectedCar && (
                  <>
                    <div className="text-center space-y-2">
                      <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-32 object-cover rounded-lg" />
                      <h3 className="font-bold text-lg">{selectedCar.name}</h3>
                      <Badge variant="secondary">{selectedCar.type}</Badge>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Ваше имя</Label>
                        <Input placeholder="Введите имя" />
                      </div>
                      <div className="space-y-2">
                        <Label>Телефон</Label>
                        <Input placeholder="+7 (999) 123-45-67" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input placeholder="email@example.com" />
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Итого:</span>
                        <span className="text-primary">{selectedCar.price}₽/день</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" onClick={() => setBookingStep('search')}>Назад</Button>
                      <Button onClick={handleBookingConfirm}>Забронировать</Button>
                    </div>
                  </>
                )}

                {bookingStep === 'confirmation' && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="Check" size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-green-600">Бронирование подтверждено!</h3>
                    <p className="text-gray-600">Мы свяжемся с вами в ближайшее время для подтверждения деталей.</p>
                    <Button onClick={() => setBookingStep('search')} className="w-full">
                      Новое бронирование
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cars Section */}
      <section id="cars" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наш автопарк</h2>
            <p className="text-xl text-gray-600">Выберите идеальный автомобиль для ваших потребностей</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Card key={car.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4">{car.type}</Badge>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                      <p className="text-2xl font-bold text-primary">{car.price}₽<span className="text-sm font-normal text-gray-600">/день</span></p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Icon name="Settings" size={14} />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Fuel" size={14} />
                        <span>{car.fuel}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>{car.seats} мест</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {car.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{feature}</Badge>
                        ))}
                        {car.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">+{car.features.length - 2}</Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={() => handleBooking(car)}
                      disabled={bookingStep !== 'search'}
                    >
                      <Icon name="Calendar" size={16} className="mr-2" />
                      Забронировать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tariffs Section */}
      <section id="tariffs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Тарифные планы</h2>
            <p className="text-xl text-gray-600">Выберите подходящий пакет услуг</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {tariffs.map((tariff, index) => (
              <Card key={index} className={`relative ${index === 1 ? 'ring-2 ring-primary shadow-xl scale-105' : 'shadow-lg'} hover:shadow-xl transition-shadow duration-300`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary">Популярный</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{tariff.name}</CardTitle>
                  <p className="text-3xl font-bold text-primary">{tariff.price}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tariff.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                    Выбрать план
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">О нас</h2>
              <p className="text-lg text-gray-600 mb-6">
                RentCar — это современный сервис аренды автомобилей с более чем 5-летним опытом работы. 
                Мы предоставляем качественные автомобили и отличный сервис для наших клиентов.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-gray-600">Довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-gray-600">Автомобилей</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-gray-600">Поддержка</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-gray-600">Лет опыта</div>
                </div>
              </div>
            </div>
            
            <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Условия аренды</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={20} className="text-primary mt-0.5" />
                    <span>Возраст от 21 года, стаж вождения от 2 лет</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={20} className="text-primary mt-0.5" />
                    <span>Действующие водительские права</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={20} className="text-primary mt-0.5" />
                    <span>Залог от 10 000₽ (возвращается)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={20} className="text-primary mt-0.5" />
                    <span>Документ, удостоверяющий личность</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h2>
            <p className="text-xl text-gray-600">Свяжитесь с нами удобным способом</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Телефон</h3>
                <p className="text-gray-600 mb-2">+7 (999) 123-45-67</p>
                <p className="text-sm text-gray-500">Круглосуточно</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-600 mb-2">info@autorent.ru</p>
                <p className="text-sm text-gray-500">Ответим в течение часа</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Адрес</h3>
                <p className="text-gray-600 mb-2">ул. Центральная, 123</p>
                <p className="text-sm text-gray-500">Ежедневно 9:00-21:00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Car" size={24} className="text-primary" />
                <h3 className="text-xl font-bold">RentCar</h3>
              </div>
              <p className="text-gray-400">
                Современный сервис аренды автомобилей с лучшими условиями и сервисом в городе.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Аренда автомобилей</li>
                <li>Долгосрочная аренда</li>
                <li>Трансферы</li>
                <li>Аренда с водителем</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li>О компании</li>
                <li>Условия аренды</li>
                <li>Правила и положения</li>
                <li>Часто задаваемые вопросы</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>info@autorent.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>ул. Центральная, 123</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 RentCar. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}