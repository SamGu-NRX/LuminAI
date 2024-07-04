import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Dashboard')({
  component: () => <div>Hello /Dashboard!</div>
})