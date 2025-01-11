import ChatInterface from './ChatInterface'

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="container mx-auto max-w-4xl">
        <ChatInterface />
      </div>
    </div>
  )
}