import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { AtomicGeneratedAnswer, AtomicSearchInterface } from '@coveo/atomic-react'
import { AGENT_ID, getKnowledgeEngine } from '../engine'
import {
  askKnowledgeQuestion,
  markKnowledgeInterfaceReady,
  useKnowledgeQuery,
  useKnowledgeStatus,
} from '../lib/knowledge'

const STARTER = 'How do I spec a MIG welding cell?'

/**
 * Conversational search over the blog index, behind a top-right chatbot CTA.
 * Lives in a sidecar AtomicSearchInterface because Atomic Commerce cannot host
 * generated answers against the product catalog. Follow-ups stay here and do
 * not refresh the parts grid.
 */
export function KnowledgePanel() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [draft, setDraft] = useState('')
  const query = useKnowledgeQuery()
  const status = useKnowledgeStatus()
  const idle = query.length === 0
  const rootRef = useRef<HTMLDivElement>(null)
  const composerRef = useRef<HTMLTextAreaElement>(null)
  const dialogId = useId()

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  useEffect(() => {
    if (open) composerRef.current?.focus()
  }, [open])

  const ask = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed || status.loading) return
    askKnowledgeQuestion(trimmed)
    setDraft('')
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    ask(draft)
  }

  return (
    <div className="chatbot" ref={rootRef}>
      <div
        className={open ? 'chatbot__popover is-open' : 'chatbot__popover'}
        id={dialogId}
        role="dialog"
        aria-label="Conversational search"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="chatbot__window">
          <header className="chatbot__head">
            <div>
              <p className="chatbot__title">Ask RoboMotion</p>
              <p className="chatbot__lede">
                Cell-spec and service answers from knowledge articles — not the
                product index.
              </p>
            </div>
            <button
              type="button"
              className="chatbot__close"
              aria-label="Close conversational search"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
          </header>

          <div className="chatbot__body">
            {idle && (
              <p className="chatbot__starter">
                <span>Try</span>
                <button type="button" className="hint" onClick={() => ask(STARTER)}>
                  {STARTER}
                </button>
              </p>
            )}
            {query && !status.hasAnswer && (
              <p className="chatbot__user">{query}</p>
            )}
            {status.loading && !status.hasAnswer && (
              <p className="chatbot__status" aria-live="polite">
                Generating answer…
              </p>
            )}
            {status.cannotAnswer && (
              <p className="chatbot__status">
                No answer for that. Try a cell-spec or service question.
              </p>
            )}
            {mounted && (
              <AtomicSearchInterface
                className="chatbot__interface"
                engine={getKnowledgeEngine()}
                reflectStateInUrl={false}
                enableRelevanceInspector={false}
                scrollContainer=".chatbot__body"
                onReady={async () => {
                  markKnowledgeInterfaceReady()
                }}
              >
                <AtomicGeneratedAnswer agentId={AGENT_ID} />
              </AtomicSearchInterface>
            )}
          </div>

          <form className="chatbot__composer" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="chatbot-input">
              Ask a question
            </label>
            <textarea
              id="chatbot-input"
              ref={composerRef}
              className="chatbot__input"
              rows={2}
              value={draft}
              placeholder="Ask how to spec a cell, or service a series…"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  ask(draft)
                }
              }}
            />
            <button
              type="submit"
              className="btn btn--primary chatbot__send"
              disabled={!draft.trim() || status.loading}
            >
              Ask
            </button>
          </form>
        </div>
      </div>

      <button
        type="button"
        className={open ? 'chatbot__fab is-open' : 'chatbot__fab'}
        aria-expanded={open}
        aria-controls={dialogId}
        aria-label={open ? 'Close conversational search' : 'Open conversational search'}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.5 4.75A2.75 2.75 0 0 1 7.25 2h9.5A2.75 2.75 0 0 1 19.5 4.75v8.5A2.75 2.75 0 0 1 16.75 16H9.06l-3.22 2.68A.75.75 0 0 1 4.5 18.1V4.75Zm2.75-1.25c-.69 0-1.25.56-1.25 1.25v11.4l2.28-1.9a.75.75 0 0 1 .48-.17h8c.69 0 1.25-.56 1.25-1.25v-8.5c0-.69-.56-1.25-1.25-1.25h-9.5Z"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.4 5.34 12 10.94l5.6-5.6 1.06 1.06-5.6 5.6 5.6 5.6-1.06 1.06-5.6-5.6-5.6 5.6-1.06-1.06 5.6-5.6-5.6-5.6 1.06-1.06Z"
      />
    </svg>
  )
}
