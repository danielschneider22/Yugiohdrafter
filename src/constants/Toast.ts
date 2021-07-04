export const toastBGColorDict = {
    'Success': "#5cb85c",
    'Danger': "#d9534f",
    'Info': "#5bc0de",
    'Warning': "#f0ad4e",
}

export interface Toast{
    id: string,
    type: 'Success' | 'Danger' | 'Info' | 'Warning',
    description: string,
    backgroundColor: string,
    title: string
    icon?: string
}