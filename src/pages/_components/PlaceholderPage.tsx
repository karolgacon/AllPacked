import { Card } from '@/shared/components/ui'

type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <Card className="space-y-3">
      <h1 className="text-2xl font-bold text-blue-900">{title}</h1>
      <p className="text-slate-600">{description}</p>
      <p className="text-xs text-slate-400">
        Team note: replace this placeholder with final Figma implementation.
      </p>
    </Card>
  )
}
