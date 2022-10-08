import { Post, PostProps } from "@components/Post"

import { Header } from "@components/Header"
import type { NextPage } from "next"
import { Sidebar } from "@components/Sidebar"
import styles from "../styles/App.module.css"

interface Posts extends PostProps {
    id: number
}

const Home: NextPage = () => {
    const posts: Posts[] = [
        {
            id: 1,
            author: {
                name: "KageNo",
                avatarUrl: "https://github.com/K4geNo.png",
                role: "Web Developer",
            },
            content: [
                { type: "paragraph", content: "Fala galeraa 👋" },
                {
                    type: "paragraph",
                    content:
                        "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
                },
                {
                    type: "link",
                    content: "ramiro.design/doctorcare",
                },
            ],
            publishedAt: new Date("2022-05-11 08:13:30"),
        },
    ]

    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <Sidebar />
                <main>
                    {posts.map((post) => (
                        <Post key={post.id} {...post} />
                    ))}
                </main>
            </div>
        </div>
    )
}

export default Home
