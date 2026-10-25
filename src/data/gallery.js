// Галерея портфолио.
// ВАЖНО: изображения — демонстрационные (Unsplash, бесплатная лицензия).
// Перед публикацией замените файлы в public/images на реальные работы фотографа
// и обновите alt-тексты, категории и размеры (width/height — фактические).

export const categories = [
  { id: 'portraits', label: 'Индивидуальные портреты' },
  { id: 'women', label: 'Женские съёмки' },
  { id: 'family', label: 'Семейные истории' },
];

export const gallery = [
  {
    id: 'portrait-man-henley',
    base: '/images/portrait-man-henley',
    category: 'portraits',
    alt: 'Индивидуальный портрет: мужчина в спокойной серой футболке смотрит в камеру',
    width: 900,
    height: 1350,
  },
  {
    id: 'woman-flower',
    base: '/images/woman-flower',
    category: 'women',
    alt: 'Женский портрет: девушка с сухим цветком в руках, мягкий свет',
    width: 900,
    height: 1350,
  },
  {
    id: 'family-hands',
    base: '/images/family-hands',
    category: 'family',
    alt: 'Семейная история: мама ведёт малыша за руку на прогулке',
    width: 900,
    height: 693,
  },
  {
    id: 'portrait-woman-pink',
    base: '/images/portrait-woman-pink',
    category: 'portraits',
    alt: 'Индивидуальный портрет: женщина у стены смотрит прямо в камеру',
    width: 900,
    height: 1125,
  },
  {
    id: 'woman-wall',
    base: '/images/woman-wall',
    category: 'women',
    alt: 'Женский портрет: задумчивый кадр у светлой стены',
    width: 900,
    height: 600,
  },
  {
    id: 'family-air',
    base: '/images/family-air',
    category: 'family',
    alt: 'Семейная история: родители подбрасывают ребёнка в воздух на поляне',
    width: 900,
    height: 1349,
  },
  {
    id: 'portrait-man-beard',
    base: '/images/portrait-man-beard',
    category: 'portraits',
    alt: 'Индивидуальный портрет: мужчина с бородой в естественном свете',
    width: 900,
    height: 1350,
  },
  {
    id: 'woman-grayscale',
    base: '/images/woman-grayscale',
    category: 'women',
    alt: 'Чёрно-белый женский портрет в водолазке',
    width: 900,
    height: 1402,
  },
  {
    id: 'family-boardwalk',
    base: '/images/family-boardwalk',
    category: 'family',
    alt: 'Семья гуляет по деревянной дорожке в золотой час',
    width: 900,
    height: 600,
  },
  {
    id: 'portrait-woman-smile',
    base: '/images/portrait-woman-smile',
    category: 'portraits',
    alt: 'Индивидуальный портрет: улыбающаяся женщина в белой рубашке',
    width: 900,
    height: 1132,
  },
  {
    id: 'woman-jumpsuit',
    base: '/images/woman-jumpsuit',
    category: 'women',
    alt: 'Женский портрет: образ в комбинезоне, спокойная композиция',
    width: 900,
    height: 1414,
  },
  {
    id: 'family-bed',
    base: '/images/family-bed',
    category: 'family',
    alt: 'Домашняя семейная история: родители с детьми дома',
    width: 900,
    height: 600,
  },
];

// Утилита для адаптивной загрузки (srcset из двух ширин).
export function responsive(base) {
  return {
    src: `${base}-900.webp`,
    srcSet: `${base}-900.webp 900w, ${base}-1800.webp 1800w`,
  };
}
