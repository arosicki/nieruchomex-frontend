import { createFileRoute } from '@tanstack/react-router'
import { ErrorPage } from '@/pages/error'
import { TrashCanPage } from '@/pages/trash-can/trash-can'

export const Route = createFileRoute('/trash-can')({
  component: TrashCanPage,
  errorComponent: ErrorPage,
})
