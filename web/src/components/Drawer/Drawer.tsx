import { Drawer as VaulDrawer } from 'vaul'

interface Props {
  trigger: React.ReactNode
  content: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

function Drawer({ trigger, content, open, onOpenChange }: Props) {
  return (
    <VaulDrawer.Root
      shouldScaleBackground
      dismissible={false}
      onOpenChange={onOpenChange}
      open={open}
    >
      <VaulDrawer.Trigger asChild>{trigger}</VaulDrawer.Trigger>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <VaulDrawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col rounded-t-[10px] bg-gray-100">
          <div className="flex flex-1 flex-col rounded-t-[10px] bg-white p-4 pt-6">
            <div className="mx-auto w-full max-w-2xl flex-1">{content}</div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  )
}

Drawer.Title = VaulDrawer.Title

export default Drawer
