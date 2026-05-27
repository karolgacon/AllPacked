import { Card, SectionHeader } from '@/shared/components/ui'

type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <SectionHeader title={title} subtitle={description} />
      <Card className="py-14 text-center">
        <h3 className="text-lg font-semibold text-brand-navy">Coming soon</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-brand-text">
          Replace this placeholder with the final Figma implementation.
        </p>
      </Card>
    </div>
  )
}
