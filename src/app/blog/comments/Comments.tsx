import { useState } from 'react'
import styles from './Comments.module.css'
import { trackEvent } from '@/utils/analytics'

interface Comment {
  id: string
  author: string
  content: string
  date: string
  replies?: Comment[]
}

interface CommentsProps {
  articleId: string
}

export default function Comments({ articleId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !authorName.trim()) return

    setIsSubmitting(true)

    try {
      // TODO: Implementa l'integrazione con il tuo backend per i commenti
      const comment: Comment = {
        id: Date.now().toString(),
        author: authorName,
        content: newComment,
        date: new Date().toLocaleDateString('it-IT', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }

      setComments(prev => [comment, ...prev])
      setNewComment('')
      setAuthorName('')
      
      trackEvent('comment_submitted', { 
        article_id: articleId,
        comment_length: newComment.length
      })
    } catch (error) {
      console.error('Errore durante l\'invio del commento:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.comments}>
      <h3>Commenti ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <input
          type="text"
          id="comment-author"
          name="author"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Il tuo nome"
          required
          aria-label="Nome autore"
        />
        <textarea
          id="comment-text"
          name="comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Scrivi un commento..."
          required
          aria-label="Testo del commento"
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Invio in corso...' : 'Pubblica commento'}
        </button>
      </form>

      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <p className={styles.noComments}>
            Non ci sono ancora commenti. Sii il primo a commentare!
          </p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <strong>{comment.author}</strong>
                <time dateTime={new Date(comment.date).toISOString()}>
                  {comment.date}
                </time>
              </div>
              <p>{comment.content}</p>
              {comment.replies && comment.replies.length > 0 && (
                <div className={styles.replies}>
                  {comment.replies.map(reply => (
                    <div key={reply.id} className={styles.reply}>
                      <div className={styles.commentHeader}>
                        <strong>{reply.author}</strong>
                        <time dateTime={new Date(reply.date).toISOString()}>
                          {reply.date}
                        </time>
                      </div>
                      <p>{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
} 