interface PageInfo {
    title: string;
}

type PageKey = 'about' | 'contact' | 'home';

const x: Record<PageKey, PageInfo> = {
    about: {
        title: 'sd',
    },
    contact: {
        title: '123123v xfz c',
    },
    home: {
        title: 'sda',
    },
};
