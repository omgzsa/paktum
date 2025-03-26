export default defineAppConfig({
    headers: [
        {
            id: 1,
            title: 'Háttérjogszabályok',
            subTitle: 'Bérleti szerződés',
            link: '/berleti/lepes/1',
        },
        {
            id: 2,
            title: 'Testreszabás 1/4.',
            subTitle: 'Bérleti szerződés',
            link: '/berleti/lepes/2',
        },
        {
            id: 3,
            title: 'Testreszabás 2/4.',
            subTitle: 'Bérleti szerződés',
            link: '/berleti/lepes/3',
        },
        {
            id: 4,
            title: 'Testreszabás 3/4.',
            subTitle: 'Bérleti szerződés',
            link: '/berleti/lepes/4',
        },
        {
            id: 5,
            title: 'Testreszabás 4/4.',
            subTitle: 'Bérleti szerződés',
            link: '/berleti/lepes/5',
        },
        {
            id: 6,
            title: 'Az ingatlan',
            subTitle: 'Bérlemény adatai',
            link: '/berleti/lepes/6',
        },
        {
            id: 7,
            title: 'Az ellenérték',
            subTitle: 'Bérleti díj',
            link: '/berleti/lepes/7',
        },
        {
            id: 8,
            title: 'Biztosítékok és költségek',
            subTitle: 'Kaució és rezsi',
            link: '/berleti/lepes/8',
        },
        {
            id: 9,
            title: 'Időtartam',
            subTitle: 'Birtokbaadás és bérlet ideje',
            link: '/berleti/lepes/9',
        },
        {
            id: 10,
            title: 'Egyedi kérdések, közokiratba foglalás, aláírás',
            subTitle: 'Egyebek',
            link: '/berleti/lepes/10',
        },
        {
            id: 11,
            title: 'A felek',
            subTitle: 'Személyes adatok',
            link: '/berleti/lepes/11',
        },
    ],
    currencies: [
        { value: 'HUF', label: 'Magyar forint' },
        { value: 'EUR', label: 'Euró' },
        { value: 'USD', label: 'Amerikai dollár' },
        { value: 'GBP', label: 'Angol font' },
        { value: 'RON', label: 'Román lej' },
        { value: 'HRK', label: 'Horvát kuna' },
        { value: 'RSD', label: 'Szerb dínár' },
        { value: 'UAH', label: 'Ukrán hrivnya' },
        { value: 'CZK', label: 'Cseh korona' },
        { value: 'PLN', label: 'Lengyel zloty' },
    ],
    ui: {
        primary: 'paktum',
        gray: 'neutral',
    },
    theme: {
        //
    },
})
