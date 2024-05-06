import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {BellRing} from "lucide-react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {useState} from "react";

export default function Notice() {
  const [activeTab, setActiveTab] = useState('all');
  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
              size='icon'
              variant='ghost'
              className='relative h-8 w-8 rounded-full'
          >
            <BellRing size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent align={'end'} className="w-[400px] h-[400px]">
          <Tabs defaultValue={activeTab} className='w-full'>
            <TabsList  className="grid w-full grid-cols-4">
              <TabsTrigger value="all" onClick={() => setActiveTab('all')}>所有</TabsTrigger>
              <TabsTrigger value="message" onClick={() => setActiveTab('message')}>消息</TabsTrigger>
              <TabsTrigger value="notice" onClick={() => setActiveTab('notice')}>通知</TabsTrigger>
              <TabsTrigger value="backlog" onClick={() => setActiveTab('backlog')}>待办</TabsTrigger>
            </TabsList>
            <TabsContent value="all">Make changes to your account here.</TabsContent>
            <TabsContent value="message">Change your password here.</TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
  )
}
