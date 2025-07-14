import { PrismaClient, Prisma } from "../lib/generated/prisma";

const prisma = new PrismaClient();

const projectData: Prisma.ProjectCreateInput[] = [
    {
        title: "Shift Schedule Helper",
        slug: "shift-schedule-helper",
        short_desc: "An Android application for managing my work shifts' schedule",
        content: "This is an Android application developed using Android Studio. It is still a work in progress. So far the front end is completed, and I have started working on the backend part. The goal is to scan my work schedule from my part time job, and have the app automatically populate all the data using machine learning, and keep track of all the work hours, shifts, total hours worked in a week etc.",
        images: [
            "/images/projects/shift-schedule-helper/dashboard.png",
            "/images/projects/shift-schedule-helper/shifts_1.png",
            "/images/projects/shift-schedule-helper/shifts_2.png",
            "/images/projects/shift-schedule-helper/stats.png",
            "/images/projects/shift-schedule-helper/settings.png",
        ],
        github_link: "https://github.com/NaeemKhan14/Shift-Schedules"
    },
    {
        title: "Athena",
        slug: "athena",
        short_desc: "An ERP solution",
        content: "Athena is an ERP system I developed for Archirodon Overseas while working for them as a Full-Stack Developer. It is designed using Django Rest Framework as the back-end API server, Angular 14 as the front-end, and PostgreSQL as the main database. ",
        images: [
            "/images/projects/athena/1.1.png",
            "/images/projects/athena/1.2.png",
            "/images/projects/athena/2.1.png",
            "/images/projects/athena/2.2.png",
            "/images/projects/athena/3.1.png",
            "/images/projects/athena/3.2.png",
        ]
    },
    {
        title: "MyAnimeList Helper",
        slug: "myanimelist-helper",
        short_desc: "Webapp for optimizing controls for MyAnimeList.net",
        content: "This is a Django project which is WIP. So far I have implemented the OAuth2.0 from MyAnimeList.net's API, and through that a user token is generated for persistent login. The goal of this web app is to automatically sort the scores in my list since manually doing them is not feasible (as I have hundreds of entries in my list). Also it is to provide me with updates and recommendations based on my preferences. I am creating this app with reusability in mind, so any user can use it; not just me. ",
        images: [

        ],
        github_link: "https://github.com/NaeemKhan14/MAL_Tools"
    },
];

export async function main() {
  for (const project of projectData) {
    await prisma.project.create({ data: project });
  }
}

main();