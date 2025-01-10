'use client'

import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim()) return
    
    const userMessage: Message = { 
      role: 'user', 
      content: input 
    }
    
    setMessages([...messages, userMessage])
    setInput('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })

      const data = await res.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response
      }

      setMessages([...messages, userMessage, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-bubble">{msg.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 p-4">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input input-bordered flex-1"
          placeholder="Type here..."
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  )
}