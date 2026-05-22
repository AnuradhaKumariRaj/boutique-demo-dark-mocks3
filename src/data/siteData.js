import brownGown from '../assets/bride-to-be/brown-gown.jpg'
import grayGown from '../assets/bride-to-be/gray-gwon.jpg'
import multiColorGown from '../assets/bride-to-be/multi-color-gown.jpg'
import whiteGown from '../assets/bride-to-be/white-gown.jpg'
import creamegown from '../assets/bride-to-be/creamegown.jpg'
import graygwon from '../assets/bride-to-be/gray-gwon.jpg'
import greengown from '../assets/bride-to-be/green-gown.jpg'
import lightorange from '../assets/bride-to-be/light-orange.jpg'
import mahroon from '../assets/bride-to-be/mahroon.jpeg'
import sequece from '../assets/bride-to-be/sequece.jpg'
import asymmetrical_Neck_Midi_Dress from '../assets/bride-to-be/Asymmetrical_Neck_Midi_Dress.jpg'
import mahroonmidi from '../assets/bride-to-be/mahroon.jpg'
import olivemidi from '../assets/bride-to-be/olive_green.jpg'
import momToBeBlueChiffon from '../assets/mom-to-be/mom-to-be-blue-chiffon.jpg'
import momToBeBrown from '../assets/mom-to-be/mom-to-be-brown.jpg'
import momToBeYellow from '../assets/mom-to-be/mom-tobe-yellow.jpg'
import momToBeMultiColor from '../assets/mom-to-be/multi-color-gown.jpg'
import momToBeCreame from '../assets/mom-to-be/creame.jpg'
import momToBeYellowFrock from '../assets/mom-to-be/yellow.jpg'
import momToBeOrangeGown from '../assets/mom-to-be/orange-gown.jpg'




export const promoHighlights = [
  'Free delivery on orders above Rs. 2000',
  'Express shipping available',
]

export const arrivalCollections = [
  {
    heading: 'Bride to be',
    products: [
      {
        name: 'Brown Gown',
        price: 'Rs. 2,790',
        tag: 'Bride to be',
        image: brownGown,
      },
      {
        name: 'Gray Gown',
        price: 'Rs. 3,780',
        tag: 'Bride to be',
        image: grayGown,
      },
      {
        name: 'Multi Color Gown',
        price: 'Rs. 3,560',
        tag: 'Bride to be',
        image: multiColorGown,
      },
      {
        name: 'White Gown',
        price: 'Rs. 2,990',
        tag: 'Bride to be',
        image: whiteGown,
      },
      
      
      {
        name: 'Creame Gown',
        price: 'Rs. 3,590',
        tag: 'Bride to be',
        image: creamegown,
      },
      {
        name: 'Gray Gown',
        price: 'Rs. 5,000',
        tag: 'Bride to be',
        image: graygwon,
      },
      {
        name: 'Green Gown',
        price: 'Rs. 5,990',
        tag: 'Bride to be',
        image: greengown,
      },
      {
        name: 'Lightorange Gown',
        price: 'Rs. 6,990',
        tag: 'Bride to be',
        image: lightorange,
      },
      {
        name: 'Mahroon Gown',
        price: 'Rs. 9,990',
        tag: 'Bride to be',
        image: mahroon,
      },
      {
        name: 'Sequece Gown',
        price: 'Rs. 11,990',
        tag: 'Bride to be',
        image: sequece,
      },
      {
              name: 'asymmetrical Neck Midi Dress',
              price: 'Rs. 3,790',
              tag: 'Bride to be',
              image: asymmetrical_Neck_Midi_Dress,
            },
            {
              name: 'mahroon midi',
              price: 'Rs. 1,790',
              tag: 'Bride to be',
              image: mahroonmidi,
            },
            {
              name: 'olive green midi',
              price: 'Rs. 999',
              tag: 'Bride to be',
              image: olivemidi,
            },
    ],
  },
  {
    heading: 'Mom to be',
    products: [
      {
        name: 'Blue Chiffon Look',
        price: 'Rs. 2,690',
        tag: 'Mom to be',
        image: momToBeBlueChiffon,
      },
      {
        name: 'Brown Occasion Wear',
        price: 'Rs. 3,190',
        tag: 'Mom to be',
        image: momToBeBrown,
      },
      {
        name: 'Yellow Celebration Look',
        price: 'Rs. 2,890',
        tag: 'Mom to be',
        image: momToBeYellow,
      },
      {
        name: 'multi color Look',
        price: 'Rs. 1,890',
        tag: 'Mom to be',
        image: momToBeMultiColor,
      }, 
      {
        name: 'Creame Look',
        price: 'Rs. 1,200',
        tag: 'Mom to be',
        image: momToBeCreame,
      },
      {
        name: 'simple yellow Look',
        price: 'Rs. 890',
        tag: 'Mom to be',
        image: momToBeYellowFrock,
      },
      {
        name: 'orange gown Look',
        price: 'Rs. 2,000',
        tag: 'Mom to be',
        image: momToBeOrangeGown,
      },
    ],
  },
]

export const arrivals = arrivalCollections.flatMap((collection) => collection.products)

export const trustPoints = [
  {
    title: 'Free shipping',
    detail: 'Free shipping on every order above Rs. 2000 across India.',
    accent: 'FS',
  },
  {
    title: 'Fit promise',
    detail: 'Confident silhouettes with guidance on sizing and styling.',
    accent: 'FP',
  },
  {
    title: 'Easy exchange',
    detail: 'Simple 5-day exchange support for eligible purchases.',
    accent: 'EX',
  },
  {
    title: 'WhatsApp support',
    detail: 'Fast help for orders, delivery updates, and outfit questions.',
    accent: 'WA',
  },
]

export const about = {
  image:
    'https://images.pexels.com/photos/6069561/pexels-photo-6069561.jpeg?auto=compress&cs=tinysrgb&w=1200',
  lead: "Life isn't perfect, but your outfit can be",
  paragraphs: [
    'Bootique-inspired fashion, reimagined for your own React storefront. This homepage puts the brand mood first with bold editorial visuals, fast product discovery, and confidence-building trust cues.',
    'The flow mirrors what works for modern boutique shoppers: a striking first impression, fresh arrivals, creator-inspired styling, and a warm brand story that feels personal instead of corporate.',
  ],
  stats: [
    { value: '2021', label: 'style era' },
    { value: '4k+', label: 'community love' },
    { value: '5 day', label: 'exchange window' },
  ],
}

export const testimonials = [
  {
    name: 'Mansi Ugale',
    role: 'Creator spotlight',
    rating: 'Styled for statement moments',
    quote: 'High-impact silhouettes, confident fits, and a feed-ready boutique mood.',
  },
  {
    name: 'Shruti Sinha',
    role: 'Community favorite',
    rating: 'Loved for elevated basics',
    quote: 'Pieces that photograph beautifully while still feeling easy to wear all night.',
  },
  {
    name: 'Uorfi Javed',
    role: 'Trend magnet',
    rating: 'Known for bold dressing',
    quote: 'The kind of homepage energy that makes shoppers want to keep scrolling.',
  },
]

export const contact = {
  location: 'Eros Sampoornam, Noida Extension',
  mapLink: 'https://maps.google.com/?q=Eros+Sampoornam+Noida+Extension',
  phone: '+91 92112 61727',
  hours: 'Support on WhatsApp, Monday to Saturday',
  email: 'hello@bootique-demo.com',
}
