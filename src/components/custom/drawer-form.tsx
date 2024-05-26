import * as React from "react";
import {Drawer as DrawerPrimitive} from "vaul";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader, DrawerOverlay, DrawerPortal,
  DrawerTitle,
} from "@/components/ui/drawer.tsx";
import {Button} from "@/components/custom/button.tsx";
import {cn} from "@/lib/utils.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {X} from "lucide-react";

interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  showBar?: boolean;
}

const DrawerContent = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Content>, DrawerContentProps>(
  ({className, children, showBar = true, ...props}, ref) => (
    <DrawerPortal>
      <DrawerOverlay/>
      <DrawerPrimitive.Content
        ref={ref}
        className={cn('fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background', className)}
        {...props}
      >
        {showBar ? <div
          className='mx-auto mt-4 h-[100px] w-2 rounded-full bg-muted ml-1 absolute top-1/2 transform -translate-y-1/2'/> : null}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  ),
);
DrawerContent.displayName = "DrawerContent"


export interface DrawerFormProps extends Omit<React.ComponentProps<typeof DrawerPrimitive.Root>, 'type'> {
  title?: string;
  desc?: string;
  showBar?: boolean,
  submitTitle?: string;
  loading?: boolean;
  onSubmit?: (params: any) => void;
  onClose?: () => void;
  className?: string;
}

const DrawerForm = (props: DrawerFormProps) => {
  return (
    <Drawer open={props.open || false} direction={props.direction || 'right'} onClose={props.onClose}>
      <DrawerContent className={cn('top-0 right-0 left-auto md:w-[500px] mt-0 rounded-none overflow-hidden', props.className)}
                     showBar={props.showBar}>
        <div className='mx-auto w-full overflow-y-scroll overflow-x-hidden h-screen'>
          <DrawerHeader className='border-b flex justify-between'>
            <div className='flex flex-row space-x-1'>
              <DrawerTitle>{props.title || '新增操作'}</DrawerTitle>
              {props.desc && <DrawerDescription>{props.desc}</DrawerDescription>}
            </div>
            <div className='flex justify-end cursor-pointer' onClick={props.onClose}>
              <X size={18}/>
            </div>
          </DrawerHeader>
          <ScrollArea className="md:h-[calc(100svh-120px)] lg:h-[calc(100svh-120px)]">
            <div className="p-4 w-full">
              {props.children}
            </div>
          </ScrollArea>
          <DrawerFooter className='w-full bg-background h-[70px] absolute bottom-0 left-0 flex-row border-t'>
            <Button loading={props.loading} onClick={props.onSubmit}
                    className='w-[100px]'>{props.submitTitle || '提交'}</Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={props.onClose}>取消</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

DrawerForm.displayName = 'DrawerForm'

export {DrawerForm}