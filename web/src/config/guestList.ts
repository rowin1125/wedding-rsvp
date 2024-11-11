export const GUEST_GROUP_MAP = {
    FAMILY: 'FAMILY',
    PARTNERS: 'PARTNERS',
    INDIVIDUAL: 'INDIVIDUAL',
};

export const GUEST_GROUP_LABEL_MAP = {
    [GUEST_GROUP_MAP.FAMILY]: 'Gezin/huishouden',
    [GUEST_GROUP_MAP.PARTNERS]: 'Partners/stel',
    [GUEST_GROUP_MAP.INDIVIDUAL]: 'Individu',
};

export const guestGroupTypeOptions = [
    {
        value: GUEST_GROUP_MAP.FAMILY,
        label: 'Gezin/huishouden',
    },
    {
        value: GUEST_GROUP_MAP.PARTNERS,
        label: 'Partners/stel',
    },
    {
        value: GUEST_GROUP_MAP.INDIVIDUAL,
        label: 'Individu',
    },
];

export const dietaryOptions = [
    {
        value: 'vegetarian',
        label: 'Vegetarisch',
    },
    {
        value: 'vegan',
        label: 'Veganistisch',
    },
    {
        value: 'gluten_free',
        label: 'Glutenvrij',
    },
    {
        value: 'lactose_free',
        label: 'Lactosevrij',
    },
    {
        value: 'no_nuts',
        label: 'Geen noten',
    },
    {
        value: 'no_seafood',
        label: 'Geen vis',
    },
    {
        value: 'no_pork',
        label: 'Geen varken',
    },
    {
        value: 'no_beef',
        label: 'Geen rund',
    },
    {
        value: 'no_chicken',
        label: 'Geen kip',
    },
    {
        value: 'no_sugar',
        label: 'Geen suiker',
    },
    {
        value: 'no_alcohol',
        label: 'Geen alcohol',
    },
    {
        value: 'halal',
        label: 'Halal',
    },
    {
        value: 'kosher',
        label: 'Kosher',
    },
    {
        value: 'low_fat',
        label: 'Vetarm',
    },
    {
        value: 'low_carb',
        label: 'Koolhydraatarm',
    },
    {
        value: 'low_sodium',
        label: 'Zoutarm',
    },
    {
        value: 'pescatarian',
        label: 'Pescotarisch',
    },
    {
        value: 'organic',
        label: 'Biologisch',
    },
    {
        value: 'no_egg',
        label: 'Geen ei',
    },
    {
        value: 'no_soy',
        label: 'Geen soja',
    },
    {
        value: 'no_shellfish',
        label: 'Geen schelpdieren',
    },
    {
        value: 'no_garlic',
        label: 'Geen knoflook',
    },
    {
        value: 'no_onion',
        label: 'Geen ui',
    },
    {
        value: 'no_caffeine',
        label: 'Geen cafeïne',
    },
    {
        value: 'paleo',
        label: 'Paleo',
    },
    {
        value: 'keto',
        label: 'Keto',
    },
    {
        value: 'diabetic',
        label: 'Diabetisch',
    },
];

export const guestGroupRelationTypeOptions = [
    {
        value: 'direct_family_bride',
        label: 'Directe familie bruid',
    },
    {
        value: 'direct_family_groom',
        label: 'Directe familie bruidegom',
    },
    {
        value: 'other_family_bride',
        label: 'Overige familie bruid',
    },
    {
        value: 'other_family_groom',
        label: 'Overige familie bruidegom',
    },
    {
        value: 'friends_bride',
        label: 'Vrienden bruid',
    },
    {
        value: 'friends_groom',
        label: 'Vrienden bruidegom',
    },
    {
        value: 'friends_mutual',
        label: 'Vrienden gedeeld',
    },
    {
        value: 'acquaintances_groom',
        label: 'Kennissen bruidegom',
    },
    {
        value: 'acquaintances_bride',
        label: 'Kennissen bruid',
    },
    {
        value: 'acquaintances_mutual',
        label: 'Kennissen gedeeld',
    },
    {
        value: 'colleagues_bride',
        label: "Collega's bruid",
    },
    {
        value: 'colleagues_groom',
        label: "Collega's bruidegom",
    },
    {
        value: 'colleagues_mutual',
        label: "Collega's gedeeld",
    },
    {
        value: 'other',
        label: 'Overig',
    },
];

export const countriesOptions = [
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AL', label: 'Albanië' },
    { value: 'DZ', label: 'Algerije' },
    { value: 'AD', label: 'Andorra' },
    { value: 'AO', label: 'Angola' },
    { value: 'AG', label: 'Antigua en Barbuda' },
    { value: 'AR', label: 'Argentinië' },
    { value: 'AM', label: 'Armenië' },
    { value: 'AU', label: 'Australië' },
    { value: 'AZ', label: 'Azerbeidzjan' },
    { value: 'BS', label: "Bahama's" },
    { value: 'BH', label: 'Bahrein' },
    { value: 'BD', label: 'Bangladesh' },
    { value: 'BB', label: 'Barbados' },
    { value: 'BE', label: 'België' },
    { value: 'BZ', label: 'Belize' },
    { value: 'BJ', label: 'Benin' },
    { value: 'BT', label: 'Bhutan' },
    { value: 'BO', label: 'Bolivia' },
    { value: 'BA', label: 'Bosnië en Herzegovina' },
    { value: 'BW', label: 'Botswana' },
    { value: 'BR', label: 'Brazilië' },
    { value: 'BN', label: 'Brunei' },
    { value: 'BG', label: 'Bulgarije' },
    { value: 'BF', label: 'Burkina Faso' },
    { value: 'BI', label: 'Burundi' },
    { value: 'KH', label: 'Cambodja' },
    { value: 'CA', label: 'Canada' },
    { value: 'CF', label: 'Centraal-Afrikaanse Republiek' },
    { value: 'CL', label: 'Chili' },
    { value: 'CN', label: 'China' },
    { value: 'CO', label: 'Colombia' },
    { value: 'KM', label: 'Comoren' },
    { value: 'CG', label: 'Congo-Brazzaville' },
    { value: 'CD', label: 'Congo-Kinshasa' },
    { value: 'CR', label: 'Costa Rica' },
    { value: 'CU', label: 'Cuba' },
    { value: 'CY', label: 'Cyprus' },
    { value: 'DK', label: 'Denemarken' },
    { value: 'DJ', label: 'Djibouti' },
    { value: 'DM', label: 'Dominica' },
    { value: 'DO', label: 'Dominicaanse Republiek' },
    { value: 'DE', label: 'Duitsland' },
    { value: 'EC', label: 'Ecuador' },
    { value: 'EG', label: 'Egypte' },
    { value: 'SV', label: 'El Salvador' },
    { value: 'GQ', label: 'Equatoriaal-Guinea' },
    { value: 'ER', label: 'Eritrea' },
    { value: 'EE', label: 'Estland' },
    { value: 'SZ', label: 'Eswatini' },
    { value: 'FJ', label: 'Fiji' },
    { value: 'PH', label: 'Filipijnen' },
    { value: 'FI', label: 'Finland' },
    { value: 'FR', label: 'Frankrijk' },
    { value: 'GA', label: 'Gabon' },
    { value: 'GM', label: 'Gambia' },
    { value: 'GE', label: 'Georgië' },
    { value: 'GH', label: 'Ghana' },
    { value: 'GD', label: 'Grenada' },
    { value: 'GR', label: 'Griekenland' },
    { value: 'GT', label: 'Guatemala' },
    { value: 'GN', label: 'Guinee' },
    { value: 'GW', label: 'Guinee-Bissau' },
    { value: 'GY', label: 'Guyana' },
    { value: 'HT', label: 'Haïti' },
    { value: 'HN', label: 'Honduras' },
    { value: 'HU', label: 'Hongarije' },
    { value: 'IE', label: 'Ierland' },
    { value: 'IS', label: 'IJsland' },
    { value: 'IN', label: 'India' },
    { value: 'ID', label: 'Indonesië' },
    { value: 'IQ', label: 'Irak' },
    { value: 'IR', label: 'Iran' },
    { value: 'IL', label: 'Israël' },
    { value: 'IT', label: 'Italië' },
    { value: 'CI', label: 'Ivoorkust' },
    { value: 'JM', label: 'Jamaica' },
    { value: 'JP', label: 'Japan' },
    { value: 'YE', label: 'Jemen' },
    { value: 'JO', label: 'Jordanië' },
    { value: 'CV', label: 'Kaapverdië' },
    { value: 'KZ', label: 'Kazachstan' },
    { value: 'KE', label: 'Kenia' },
    { value: 'KG', label: 'Kirgizië' },
    { value: 'KI', label: 'Kiribati' },
    { value: 'KW', label: 'Koeweit' },
    { value: 'HR', label: 'Kroatië' },
    { value: 'LA', label: 'Laos' },
    { value: 'LS', label: 'Lesotho' },
    { value: 'LV', label: 'Letland' },
    { value: 'LB', label: 'Libanon' },
    { value: 'LR', label: 'Liberia' },
    { value: 'LY', label: 'Libië' },
    { value: 'LI', label: 'Liechtenstein' },
    { value: 'LT', label: 'Litouwen' },
    { value: 'LU', label: 'Luxemburg' },
    { value: 'MG', label: 'Madagaskar' },
    { value: 'MW', label: 'Malawi' },
    { value: 'MV', label: 'Maldiven' },
    { value: 'MY', label: 'Maleisië' },
    { value: 'ML', label: 'Mali' },
    { value: 'MT', label: 'Malta' },
    { value: 'MA', label: 'Marokko' },
    { value: 'MH', label: 'Marshalleilanden' },
    { value: 'MR', label: 'Mauritanië' },
    { value: 'MU', label: 'Mauritius' },
    { value: 'MX', label: 'Mexico' },
    { value: 'FM', label: 'Micronesië' },
    { value: 'MD', label: 'Moldavië' },
    { value: 'MC', label: 'Monaco' },
    { value: 'MN', label: 'Mongolië' },
    { value: 'ME', label: 'Montenegro' },
    { value: 'MZ', label: 'Mozambique' },
    { value: 'MM', label: 'Myanmar' },
    { value: 'NA', label: 'Namibië' },
    { value: 'NR', label: 'Nauru' },
    { value: 'NL', label: 'Nederland' },
    { value: 'NP', label: 'Nepal' },
    { value: 'NI', label: 'Nicaragua' },
    { value: 'NZ', label: 'Nieuw-Zeeland' },
    { value: 'NE', label: 'Niger' },
    { value: 'NG', label: 'Nigeria' },
    { value: 'KP', label: 'Noord-Korea' },
    { value: 'MK', label: 'Noord-Macedonië' },
    { value: 'NO', label: 'Noorwegen' },
    { value: 'UA', label: 'Oekraïne' },
    { value: 'UG', label: 'Oeganda' },
    { value: 'UZ', label: 'Oezbekistan' },
    { value: 'OM', label: 'Oman' },
    { value: 'TL', label: 'Oost-Timor' },
    { value: 'AT', label: 'Oostenrijk' },
    { value: 'PK', label: 'Pakistan' },
    { value: 'PW', label: 'Palau' },
    { value: 'PA', label: 'Panama' },
    { value: 'PG', label: 'Papoea-Nieuw-Guinea' },
    { value: 'PY', label: 'Paraguay' },
    { value: 'PE', label: 'Peru' },
    { value: 'PL', label: 'Polen' },
    { value: 'PT', label: 'Portugal' },
    { value: 'QA', label: 'Qatar' },
    { value: 'RO', label: 'Roemenië' },
    { value: 'RU', label: 'Rusland' },
    { value: 'RW', label: 'Rwanda' },
    { value: 'KN', label: 'Saint Kitts en Nevis' },
    { value: 'LC', label: 'Saint Lucia' },
    { value: 'VC', label: 'Saint Vincent en de Grenadines' },
    { value: 'SB', label: 'Salomonseilanden' },
    { value: 'WS', label: 'Samoa' },
    { value: 'SM', label: 'San Marino' },
    { value: 'ST', label: 'Sao Tomé en Principe' },
    { value: 'SA', label: 'Saoedi-Arabië' },
    { value: 'SN', label: 'Senegal' },
    { value: 'RS', label: 'Servië' },
    { value: 'SC', label: 'Seychellen' },
    { value: 'SL', label: 'Sierra Leone' },
    { value: 'SG', label: 'Singapore' },
    { value: 'SK', label: 'Slowakije' },
    { value: 'SI', label: 'Slovenië' },
    { value: 'SO', label: 'Somalië' },
    { value: 'ES', label: 'Spanje' },
    { value: 'LK', label: 'Sri Lanka' },
    { value: 'SR', label: 'Suriname' },
    { value: 'SY', label: 'Syrië' },
    { value: 'TJ', label: 'Tadzjikistan' },
    { value: 'TZ', label: 'Tanzania' },
    { value: 'TH', label: 'Thailand' },
    { value: 'TG', label: 'Togo' },
    { value: 'TO', label: 'Tonga' },
    { value: 'TT', label: 'Trinidad en Tobago' },
    { value: 'TD', label: 'Tsjaad' },
    { value: 'CZ', label: 'Tsjechië' },
    { value: 'TN', label: 'Tunesië' },
    { value: 'TR', label: 'Turkije' },
    { value: 'TM', label: 'Turkmenistan' },
    { value: 'TV', label: 'Tuvalu' },
    { value: 'UY', label: 'Uruguay' },
    { value: 'VU', label: 'Vanuatu' },
    { value: 'VA', label: 'Vaticaanstad' },
    { value: 'VE', label: 'Venezuela' },
    { value: 'AE', label: 'Verenigde Arabische Emiraten' },
    { value: 'UK', label: 'Verenigd Koninkrijk' },
    { value: 'US', label: 'Verenigde Staten' },
    { value: 'VN', label: 'Vietnam' },
    { value: 'BY', label: 'Wit-Rusland' },
    { value: 'ZA', label: 'Zuid-Afrika' },
    { value: 'KR', label: 'Zuid-Korea' },
    { value: 'SS', label: 'Zuid-Soedan' },
    { value: 'SE', label: 'Zweden' },
    { value: 'CH', label: 'Zwitserland' },
];