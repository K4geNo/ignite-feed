import { ChangeEvent, FormEvent, useState } from "react"
import { format, formatDistanceToNow } from "date-fns"

import { Avatar } from "@components/Avatar"
import { Comment } from "@components/Comment"
import ptBR from "date-fns/locale/pt-BR"
import styles from "./Post.module.css"

interface Author {
    name: string
    role: string
    avatarUrl: string
}

interface Content {
    type: "paragraph" | "link"
    content: string
}

export interface PostProps {
    author: Author
    content: Content[]
    publishedAt: Date
}

export function Post({ author, content, publishedAt }: PostProps) {
    const [comments, setComments] = useState(["Post muito bacana"])

    const [newCommentText, setNewCommentText] = useState("")

    const publishedDateFormatted = format(
        publishedAt,
        "d 'de' LLLL 'às' HH:mm'h'",
        {
            locale: ptBR,
        }
    )

    const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(e: FormEvent) {
        e.preventDefault()

        setComments([...comments, newCommentText])
        setNewCommentText("")
    }

    function handleNewCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setNewCommentText(e.target.value)
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(
            (comment) => comment !== commentToDelete
        )

        setComments(commentsWithoutDeletedOne)
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time
                    title={publishedDateFormatted}
                    dateTime={publishedAt.toISOString()}
                >
                    {publishedDateRelativeNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map((item) => {
                    switch (item.type) {
                        case "paragraph":
                            return <p key={item.content}>{item.content}</p>
                        case "link":
                            return (
                                <p key={item.content}>
                                    <a href={item.content}>{item.content}</a>
                                </p>
                            )
                        default:
                            return null
                    }
                })}
            </div>

            <form
                onSubmit={handleCreateNewComment}
                className={styles.commentForm}
            >
                <strong>Deixe seu feedback</strong>

                <textarea
                    placeholder="Deixe um comentário"
                    name="comment"
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    required
                />

                <footer>
                    <button
                        type="submit"
                        disabled={newCommentText.length === 0}
                    >
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map((comment, index) => (
                    <Comment
                        key={index}
                        content={comment}
                        onDeleteComment={deleteComment}
                    />
                ))}
            </div>
        </article>
    )
}
